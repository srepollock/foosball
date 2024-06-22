import { GenerateTeamName, GenerateTournamentName } from "@/utils/Helpers";
import { createClient } from "@/utils/supabase/client";
import { TeamData } from "@/models/TeamsData";
import { GenerateTournamentBracket } from "@/utils/TournamentBracket";
import { BracketData } from "@/models/BracketData";
import { GetTeam } from "./TeamFunctions";
import { GetUserIdFullNameData } from "./UserDataFunctions";
import { fetchMatch } from "./MatchFunctions";
import { TournamentBracketMatchupObject } from "@/models/TournamentBracket";

export async function GetAllTournaments() {
    const supabase = createClient();
    const { data, error } = await supabase.from("tournament").select();
    if (error) {
        console.error(error);
        return [];
    }
    return data;
}

export async function GetTournamentById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("tournament")
        .select()
        .eq("id", id)
        .single();
    if (error) {
        console.error(error);
        return {};
    }
    return data;
}

export async function CreateTournament(
    name: string,
    description: string,
    teams: TeamData[],
    tournamentType: string,
    randomizeBracket: boolean,
    initialBracket?: string
) {
    const supabase = createClient();
    if (!name) {
        name = GenerateTournamentName();
    }
    if (!initialBracket) {
        initialBracket = GenerateTournamentBracket(teams, randomizeBracket);
    }
    const { error } = await supabase.from("tournament").insert({
        name: name,
        description: description,
        teams: teams.map((team) => team.id).join(","),
        bracket: initialBracket,
        tournament_type: tournamentType,
    });
    if (error) {
        console.error(error);
    }
}

export async function GetTournamentBracket(tournamentId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("tournament")
        .select("bracket")
        .eq("id", tournamentId)
        .single();
    if (error) {
        console.error(error);
        return {};
    }
    return data;
}

export async function UpdateTournamentBracket(
    tournamentId: string,
    bracket: string
) {
    const supabase = createClient();
    const { error } = await supabase
        .from("tournament")
        .update({ bracket: `${bracket}` })
        .eq("id", `${tournamentId}`);
    if (error) {
        console.error(error);
    }
}

export async function UpdateTournamentGame(
    tournamentId: string,
    matchId: string,
    roundId: number,
    matchData: {
        home_team_id: string;
        away_team_id: string;
    }
) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("tournament")
        .select("bracket")
        .eq("id", tournamentId)
        .single();
    if (error) {
        console.error(error);
        return {};
    }
    let bracketData: TournamentBracketMatchupObject[] = JSON.parse(
        data.bracket
    );
    for (let i = 0; i < bracketData.length; i++) {
        if (
            bracketData[i].round == roundId &&
            matchData.home_team_id == bracketData[i].home_team_id &&
            matchData.away_team_id == bracketData[i].away_team_id
        ) {
            bracketData[i].match_id = matchId;
        }
    }
    await UpdateTournamentBracket(tournamentId, JSON.stringify(bracketData));
}

export async function GetTournamentForBracketry(tournamentId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("tournament")
        .select("name, bracket, teams")
        .eq("id", tournamentId)
        .single();
    if (error) {
        console.error(error);
        return {};
    }

    let bracketryData: BracketData = {
        rounds: [],
        matches: [],
        contestants: {},
    };

    let tournamentData = data;
    let bracketData = JSON.parse(tournamentData.bracket);
    let teams: any = {};
    let teamIds = tournamentData.teams.split(",");
    for (let i = 0; i < teamIds.length; i++) {
        teams[teamIds[i]] = await GetTeam(teamIds[i]);
    }
    let rounds = tournamentData.teams.split(",").length - 1;

    for (let i = 0; i < rounds; i++) {
        bracketryData.rounds!.push({
            name: "Round " + i,
        });
    }

    for (let i = 0; i < bracketData.length; i++) {
        let matchup = bracketData[i];
        let matchData = await fetchMatch(matchup.match_id);
        let homeTeam = await GetTeam(matchData.home_team_id);
        let awayTeam = await GetTeam(matchData.away_team_id);
        bracketryData.matches!.push({
            roundIndex: matchup.round,
            order: matchup.order,
            sides: [
                {
                    title: homeTeam.team_name,
                    contestantId: homeTeam.id,
                    scores: [
                        {
                            mainScore: matchData.score_home,
                            isWinner: matchData.winner == "HOME",
                        },
                    ],
                },
                {
                    title: awayTeam.team_name,
                    contestantId: awayTeam.id,
                    scores: [
                        {
                            mainScore: matchData.score_away,
                            isWinner: matchData.winner == "AWAY",
                        },
                    ],
                },
            ],
        });
    }

    for (let i = 0; i < teamIds.length; i++) {
        let players = [];
        let forward = await GetUserIdFullNameData(teams[teamIds[i]].forward_id);
        let defense = await GetUserIdFullNameData(teams[teamIds[i]].defense_id);
        players.push({
            title: forward.full_name,
        });
        players.push({
            title: defense.full_name,
        });
        bracketryData.contestants![teamIds[i]] = {
            players: players,
        };
    }

    return bracketryData;
}
