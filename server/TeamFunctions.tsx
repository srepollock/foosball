import { GenerateTeamName } from '@/utils/Helpers';
import { createClient } from '@/utils/supabase/client';

export async function fetchAllTeams() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('teams')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        console.error(error);
        return [];
    }
    return data;
}

export async function CreateTeam(
    forwardId: string,
    defenseId: string,
    teamName?: string
) {
    if (!teamName) {
        teamName = GenerateTeamName();
    }
    const supabase = createClient();
    const { error } = await supabase.from('tournaments').insert({
        forward: forwardId,
        defense: defenseId,
        team_name: teamName,
    });
    if (error) {
        console.error(error);
    }
}
