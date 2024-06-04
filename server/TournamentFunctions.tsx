import { createClient } from '@/utils/supabase/client';

export async function GetAllTournaments() {
    const supabase = createClient();
    const { data, error } = await supabase.from('tournaments').select();
    if (error) {
        console.error(error);
        return [];
    }
    return data;
}

export async function GetTournamentById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('tournaments')
        .select()
        .eq('id', id)
        .single();
    if (error) {
        console.error(error);
        return {};
    }
    return data;
}
