import { DefaultTeamStats, TeamStats } from '@/models/TeamsData';
import { GenerateTeamName } from '@/utils/Helpers';
import { createClient } from '@/utils/supabase/client';

export async function GetAllTeams() {
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
    if (!teamName || teamName === '') {
        teamName = GenerateTeamName();
    }
    const supabase = createClient();
    const { error } = await supabase.from('teams').insert({
        forward_id: forwardId,
        defense_id: defenseId,
        team_name: teamName,
    });
    if (error) {
        console.error(error);
    }
}

export async function GetTeam(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('teams')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        console.error(error);
        return {};
    }
    return data;
}

export async function GetTeamByPlayers(forward_id: string, defense_id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('teams')
        .select('*')
        .or(`forward_id.eq.${forward_id}, defense_id.eq.${defense_id}`)
        .single();
    if (error) {
        console.error(error);
        return {};
    }
    return data;
}

export async function GetTeamStats(id: string): Promise<TeamStats> {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('matches')
        .select('*')
        .or(`home_team_id.eq.${id}, away_team_id.eq.${id}`);
    if (error) {
        console.error(error);
        return DefaultTeamStats;
    }
    let stats = {
        wins: 0,
        losses: 0,
        goals: 0,
        games: 0,
    };
    if (!data || data.length === 0) {
        return stats;
    }
    data.forEach((match) => {
        if (match.home_team_id === id) {
            stats.goals += match.score_home;
            if (match.score_home > match.score_away) {
                stats.wins++;
            } else {
                stats.losses++;
            }
        } else {
            stats.goals += match.score_away;
            if (match.score_away > match.score_home) {
                stats.wins++;
            } else {
                stats.losses++;
            }
        }
        stats.games++;
    });
    return stats;
}
