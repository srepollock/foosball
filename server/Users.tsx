"use server";
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
}

export async function fetchPlayer(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("user-data")
        .select()
        .eq("id", userId)
        .single();
    if (error) {
        console.error("Error fetching player:", error.message);
    } else {
        return data;
    }
}

export async function fetchTotalPlayers() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("user-data")
        .select("id")
        .range(0, 0);
    if (error) {
        console.error("Error fetching total players:", error.message);
    } else {
        return data?.length;
    }
}

export async function fetchPlayerStats(userId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("user-stats")
        .select()
        .eq("id", userId)
        .single();
    if (error) {
        console.error("Error fetching player stats:", error.message);
        throw error;
    } else {
        return data;
    }
}
