import { createClient } from "@/utils/supabase/client";

export async function fetchMatches(page: number, userId: string) {
    const supabase = createClient();
    const PAGE_SIZE = 10;
    const { data, error } = await supabase
        .from("matches")
        .select()
        .or(
            `home_foward.eq.${userId},home_defense.eq.${userId},away_forward.eq.${userId},away_defense.eq.${userId}`
        )
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
    if (error) {
        console.log(error);
    }
    return data;
}

export async function AddMatch() {
    const supabase = createClient();
    const { error } = await supabase
        .from("countries")
        .insert({ id: 1, name: "Denmark" });
    if (error) {
        console.log(error);
    }
}
