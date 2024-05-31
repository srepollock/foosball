import { UserData } from '@/models/UserData';
import { DefaultUserStats } from '@/models/UserStats';
import { createClient } from '@/utils/supabase/client';

export async function CreateUserStats(userId: string) {
    const supabase = createClient();
    let userStats = DefaultUserStats;
    userStats.id = userId;
    const { error } = await supabase.from('user-stats').insert(userStats);

    if (error) {
        console.error(error);
    }
}
