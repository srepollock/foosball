import { UserData } from '@/models/UserData';
import { DefaultUserStats, UserStats } from '@/models/UserStats';
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
        console.error(error);
    }
}

export async function GetUserData(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('user-data')
        .select()
        .eq('id', userId)
        .single();

    if (error) {
        console.error(error);
        return {};
    }

    return data;
}

export async function GetAllUsersData() {
    const supabase = createClient();
    const { data, error } = await supabase.from('user-data').select();

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export async function GetUserIdFullNameData(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('user-data')
        .select('id, full_name')
        .eq('id', userId)
        .single();

    if (error) {
        console.error(error);
        return {};
    }

    return data;
}

export async function GetAllUserIdFullNamesData() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('user-data')
        .select('id, full_name');

    if (error) {
        console.error(error);
        return [];
    }

    return data;
}

export async function UpdateUserData(data: UserData) {
    const supabase = createClient();
    const { error } = await supabase
        .from('user-data')
        .update(data)
        .eq('id', data.id);

    if (error) {
        console.error(error);
    }
}

export async function GetUserStats(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('matches')
        .select('*')
        .or(
            `home_forward.eq.${userId}, home_defense.eq.${userId}, away_forward.eq.${userId}, away_defense.eq.${userId}`
        )
        .order('played_at', { ascending: false });

    if (error) {
        console.error(error);
        return {};
    }

    if (!data || data.length === 0) {
        return DefaultUserStats;
    }

    let lastMatch = data[0];
    let goals = 0;
    let wins = 0;
    let losses = 0;
    data.forEach((element) => {
        switch (userId) {
            case element.home_forward:
                goals += element.home_forward_goals;
                if (element.winner === 'HOME') {
                    wins++;
                } else {
                    losses++;
                }
                break;
            case element.home_defense:
                goals += element.home_defense_goals;
                if (element.winner === 'HOME') {
                    wins++;
                } else {
                    losses++;
                }
                break;
            case element.away_forward:
                goals += element.away_forward_goals;
                if (element.winner === 'AWAY') {
                    wins++;
                } else {
                    losses++;
                }
                break;
            case element.away_defense:
                goals += element.away_defense_goals;
                if (element.winner === 'AWAY') {
                    wins++;
                } else {
                    losses++;
                }
                break;
        }
    });

    return {
        id: userId,
        updated_at: lastMatch.created_at,
        games_played: data.length,
        goals: goals,
        wins: wins,
        losses: losses,
    } as UserStats;
}
