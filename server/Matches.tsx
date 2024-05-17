import { createClient } from "@/utils/supabase/client";
import { MatchData, Team } from "@/models/MatchData";
import { match } from "assert";

export async function fetchMatches(page: number, userId?: string) {
    const supabase = createClient();
    const PAGE_SIZE = 10;
    if (!userId) {
        const { data, error } = await supabase
            .from("matches")
            .select()
            .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
        if (error) {
            console.log(error);
        }
        return data;
    } else {
        const { data, error } = await supabase
            .from("matches")
            .select("*")
            .or(
                `home_forward.eq.${userId}, home_defense.eq.${userId}, away_forward.eq.${userId}, away_defense.eq.${userId}`
            )
            .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
        if (error) {
            console.log(error);
        }
        return data;
    }
}

export async function fetchMatch(matchId: string) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("matches")
        .select()
        .eq("id", matchId)
        .single();
    if (error) {
        console.log(error);
    }
    return data;
}

export async function fetchTotalMatches() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("matches")
        .select("id")
        .range(0, 0);
    if (error) {
        console.log(error);
    }
    return data?.length;
}

export async function handleAddMatch(e: any, matchData: MatchData) {
    const supabase = createClient();
    if (
        matchData.home_forward &&
        matchData.home_defense &&
        matchData.away_forward &&
        matchData.away_defense
    ) {
        const { data, error } = await supabase.from("matches").insert([
            {
                created_at: matchData.created_at,
                played_at: matchData.played_at,
                home_forward: matchData.home_forward,
                home_forward_goals: matchData.home_forward_goals,
                away_forward: matchData.away_forward,
                away_forward_goals: matchData.away_forward_goals,
                home_defense: matchData.home_defense,
                home_defense_goals: matchData.home_defense_goals,
                away_defense: matchData.away_defense,
                away_defense_goals: matchData.away_defense_goals,
                score_home: matchData.score_home,
                score_away: matchData.score_away,
                winner: matchData.winner,
            },
        ]);

        if (error) {
            console.error("Error adding match:", error.message);
        } else {
            console.log("Match added successfully:", data);
            // Add any further logic here, such as resetting form fields
        }
    } else if (matchData.home_forward && matchData.away_forward) {
        const { data, error } = await supabase
            .from("matches")
            .insert([
                {
                    created_at: matchData.created_at,
                    played_at: matchData.played_at,
                    home_forward: matchData.home_forward,
                    home_forward_goals: matchData.home_forward_goals,
                    away_forward: matchData.away_forward,
                    away_forward_goals: matchData.away_forward_goals,
                    score_home: matchData.score_home,
                    score_away: matchData.score_away,
                    winner: matchData.winner,
                },
            ])
            .select();
        if (error) {
            console.error("Error adding match:", error.message);
        } else {
            console.log("Match added successfully");
            // Add any further logic here, such as resetting form fields
        }
        console.log(`Data: ${JSON.stringify(data)}`);
        return data;
    } else {
        console.error("Please fill in all fields");
    }
}
