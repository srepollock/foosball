import { createClient } from "@/utils/supabase/client";

export async function fetchAllTeams() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("teams")
        .select("*")
        .order("created_at", { ascending: false });
    if (error) {
        console.error(error);
        return [];
    }
    return data;
}
