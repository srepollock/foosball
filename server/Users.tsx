'use server';
import { createClient } from "@/utils/supabase/server";

export async function fetchPlayers() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("user-data")
        .select("id, full_name");
    if (error) {
        console.error("Error fetching players:", error.message);
    } else {
        return data;
    }
};