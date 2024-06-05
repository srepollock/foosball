import { GenerateTeamName } from '@/utils/Helpers';
import { createClient } from '@/utils/supabase/client';
import { TeamData } from '@/models/TeamsData';
import { GenerateTournamentBracket } from '@/utils/TournamentBracket';

export async function GetAllTournaments() {
    const supabase = createClient();
    const { data, error } = await supabase.from('tournament').select();
    if (error) {
        console.error(error);
        return [];
    }
    return data;
}

export async function GetTournamentById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('tournament')
        .select()
        .eq('id', id)
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
    initialBracket?: string,
    randomizeBracket: boolean = true
) {
    const supabase = createClient();
    if (!initialBracket) {
        initialBracket = GenerateTournamentBracket(teams, randomizeBracket);
    }
    const { error } = await supabase.from('tournament').insert({
        name: name,
        description: description,
        teams: teams.map((team) => team.id).join(','),
        bracket: initialBracket,
    });
    if (error) {
        console.error(error);
    }
}

export async function GetTournamentBracket(tournamentId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('tournament')
        .select('bracket')
        .eq('id', tournamentId)
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
        .from('tournament')
        .update({ bracket: bracket })
        .eq('id', tournamentId);
    if (error) {
        console.error(error);
    }
}
