import { UserMatchStats, UserStats } from '@/models/UserStats';
import { createClient } from '@/utils/supabase/client';

export async function CreateUserData(
    userId: string,
    given_name: string,
    sur_name: string
) {
    const supabase = createClient();
    const { error } = await supabase.from('user-data').insert({
        id: userId,
        given_name: given_name,
        sur_name: sur_name,
        full_name: given_name + ' ' + sur_name,
    });

    if (error) {
        console.log(error);
    }
}

export async function CreateUserStats(userId: string) {
    const supabase = createClient();
    const { error } = await supabase.from('user-stats').insert({
        id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        games_played: 0,
        goals: 0,
        wins: 0,
        losses: 0,
    });

    if (error) {
        console.log(error);
    }
}

export async function GetUserStats(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('user-stats')
        .select()
        .eq('id', userId)
        .single();

    if (error) {
        console.log(error);
    }

    return data;
}

export async function UpdateUserStats(userStats: UserMatchStats) {
    const supabase = createClient();

    let currentStats = await GetUserStats(userStats.id);

    if (!currentStats) {
        currentStats = {} as UserStats;
        currentStats.id = userStats.id;
        currentStats.created_at = new Date().toISOString();
        currentStats.updated_at = new Date().toISOString();
        currentStats.games_played = 0;
        currentStats.goals = 0;
        currentStats.wins = 0;
        currentStats.losses = 0;
    }

    currentStats.games_played += 1;
    currentStats.goals += userStats.goals;
    currentStats.wins += userStats.won ? 1 : 0;
    currentStats.losses += userStats.won ? 0 : 1;

    const { error } = await supabase
        .from('user-stats')
        .update(currentStats)
        .eq('id', userStats.id);

    if (error) {
        console.log(error);
    }
}
