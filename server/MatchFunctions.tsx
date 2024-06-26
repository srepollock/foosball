import { createClient } from "@/utils/supabase/client";
import { MatchData, Team } from "@/models/MatchData";
import { match } from "assert";
import { GetTeamByPlayers } from "./TeamFunctions";
import { UpdateTournamentGame } from "./TournamentFunctions";

export async function fetchMatches(page: number, userId?: string) {
    const supabase = createClient();
    const PAGE_SIZE = 9;
    if (!userId) {
        const { data, error } = await supabase
            .from("matches")
            .select()
            .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
        if (error) {
            console.error(error);
        }
        return data;
    } else {
        const { data, error } = await supabase
            .from("matches")
            .select("*")
            .or(
                `home_forward.eq.${userId}, home_defense.eq.${userId}, away_forward.eq.${userId}, away_defense.eq.${userId}`
            )
            .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
        if (error) {
            console.error(error);
        }
        return data;
    }
}

export async function fetchMatch(matchId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("matches")
        .select()
        .eq("id", matchId)
        .single();
    if (error) {
        console.error(error);
    }
    return data;
}

export async function calculateTotalMatches(userId?: string) {
    const supabase = createClient();
    if (!userId) {
        const { data, error } = await supabase.from("matches").select("id");
        if (error) {
            console.error(error);
        }
        return data?.length;
    } else {
        const { data, error } = await supabase
            .from("matches")
            .select("")
            .or(
                `home_forward.eq.${userId}, home_defense.eq.${userId}, away_forward.eq.${userId}, away_defense.eq.${userId}`
            );
        if (error) {
            console.error(error);
        }
        return data?.length;
    }
}

export async function handleAddMatch(e: any, matchData: MatchData) {
    const supabase = createClient();
    if (matchData.tournament_id) {
        await handleAddTournamentMatch(e, matchData);
        return;
    }
    if (
        matchData.home_forward &&
        matchData.home_defense &&
        matchData.away_forward &&
        matchData.away_defense
    ) {
        let home_team = await GetTeamByPlayers(
            matchData.home_forward,
            matchData.home_defense
        );
        let away_team = await GetTeamByPlayers(
            matchData.away_forward,
            matchData.away_defense
        );
        const { data, error } = await supabase.from("matches").insert([
            {
                created_at: matchData.created_at,
                played_at: matchData.played_at,
                home_forward: matchData.home_forward,
                home_forward_goals: matchData.home_forward_goals ?? 0,
                away_forward: matchData.away_forward,
                away_forward_goals: matchData.away_forward_goals ?? 0,
                home_defense: matchData.home_defense,
                home_defense_goals: matchData.home_defense_goals ?? 0,
                away_defense: matchData.away_defense,
                away_defense_goals: matchData.away_defense_goals ?? 0,
                score_home: matchData.score_home,
                score_away: matchData.score_away,
                winner: matchData.winner,
                home_team_id: home_team.id ?? null,
                away_team_id: away_team.id ?? null,
            },
        ]);

        if (error) {
            console.error("Error adding match:", error.message);
        } else {
            console.log("Match added successfully:", data);
            // Add any further logic here, such as resetting form fields
        }
    } else if (matchData.home_forward && matchData.away_forward) {
        const { data, error } = await supabase
            .from("matches")
            .insert([
                {
                    created_at: matchData.created_at,
                    played_at: matchData.played_at,
                    home_forward: matchData.home_forward,
                    home_forward_goals: matchData.home_forward_goals ?? 0,
                    away_forward: matchData.away_forward,
                    away_forward_goals: matchData.away_forward_goals ?? 0,
                    score_home: matchData.score_home,
                    score_away: matchData.score_away,
                    winner: matchData.winner,
                },
            ])
            .select();
        if (error) {
            console.error("Error adding match:", error.message);
        } else {
            console.log("Match added successfully");
            // Add any further logic here, such as resetting form fields
        }
        console.log(`Data: ${JSON.stringify(data)}`);
        return data;
    } else {
        console.error("Please fill in all fields");
    }
}

export async function handleAddTournamentMatch(e: any, matchData: MatchData) {
    const supabase = createClient();
    if (
        matchData.home_forward != undefined &&
        matchData.home_defense != undefined &&
        matchData.away_forward != undefined &&
        matchData.away_defense != undefined &&
        matchData.tournament_id != undefined &&
        matchData.tournament_round_id != undefined
    ) {
        let home_team = await GetTeamByPlayers(
            matchData.home_forward,
            matchData.home_defense
        );
        let away_team = await GetTeamByPlayers(
            matchData.away_forward,
            matchData.away_defense
        );
        const { data, error } = await supabase
            .from("matches")
            .insert([
                {
                    created_at: matchData.created_at,
                    played_at: matchData.played_at,
                    home_forward: matchData.home_forward,
                    home_forward_goals: matchData.home_forward_goals ?? 0,
                    away_forward: matchData.away_forward,
                    away_forward_goals: matchData.away_forward_goals ?? 0,
                    home_defense: matchData.home_defense,
                    home_defense_goals: matchData.home_defense_goals ?? 0,
                    away_defense: matchData.away_defense,
                    away_defense_goals: matchData.away_defense_goals ?? 0,
                    score_home: matchData.score_home,
                    score_away: matchData.score_away,
                    winner: matchData.winner,
                    home_team_id: home_team.id ?? null,
                    away_team_id: away_team.id ?? null,
                    tournament_id: matchData.tournament_id,
                    tournament_round_id: matchData.tournament_round_id,
                },
            ])
            .select("id");
        if (error) {
            console.error("Error adding match:", error.message);
            return;
        } else {
            console.log("Match added successfully:", data);
            // Add any further logic here, such as resetting form fields
        }
        // TODO: this navigates away from the page and does not execute if the insert is successful
        UpdateTournamentGame(
            matchData!.tournament_id,
            data[0].id,
            matchData.tournament_round_id,
            {
                home_team_id: home_team.id,
                away_team_id: away_team.id,
            }
        );
    } else {
        console.error("Please fill in all fields");
    }
}
