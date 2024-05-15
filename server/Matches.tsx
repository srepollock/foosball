import { createClient } from "@/utils/supabase/client";
import { MatchData, Team } from "@/models/MatchData";

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

export async function handleAddMatch(e: any, matchData: MatchData) {
    const supabase = createClient();
    const home_score = matchData.home_forward_goals + (matchData.home_defense_goals ?? 0);
    const away_score = matchData.away_forward_goals + (matchData.away_defense_goals ?? 0);
    const winner = matchData.home_score > matchData.away_score ? Team.HOME : Team.AWAY;
    if (
        matchData.home_forward &&
        matchData.home_defense &&
        matchData.away_forward &&
        matchData.away_defense_goals
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
                home_score: home_score,
                away_score: away_score,
                winner: winner,
            },
        ]);

        if (error) {
            console.error("Error adding match:", error.message);
        } else {
            console.log("Match added successfully:", data);
            // Add any further logic here, such as resetting form fields
        }
    } else if (matchData.home_forward && matchData.away_forward) {
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
                home_score: home_score,
                away_score: away_score,
                winner: winner,
            },
        ]);
        if (error) {
            console.error("Error adding match:", error.message);
        } else {
            console.log("Match added successfully:", data);
            // Add any further logic here, such as resetting form fields
        }
    } else {
        console.error("Please fill in all fields");
    }
};