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
        const home_score = matchData.homeForwardsScore + matchData.homeDefendersScore;
        const away_score = matchData.awayForwardsScore + matchData.awayDefendersScore;
        const winner = matchData.home_score > matchData.away_score ? Team.HOME : Team.AWAY;
        if (
            matchData.homeForwardsPlayer &&
            matchData.homeDefendersPlayer &&
            matchData.awayForwardsPlayer &&
            matchData.awayDefendersPlayer
        ) {
            const { data, error } = await supabase.from("matches").insert([
                {
                    created_at: matchData.datetime,
                    played_at: matchData.datetime,
                    home_forward: matchData.homeForwardsPlayer,
                    away_forward: matchData.awayForwardsPlayer,
                    home_defense: matchData.homeDefendersPlayer,
                    away_defense: matchData.awayDefendersPlayer,
                    home_forward_goals: matchData.homeForwardsScore,
                    home_defense_goals: matchData.homeDefendersScore,
                    away_forward_goals: matchData.awayForwardsScore,
                    away_defense_goals: matchData.awayDefendersScore,
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
        } else if (matchData.homeForwardsPlayer && matchData.awayForwardsPlayer) {
            const { data, error } = await supabase.from("matches").insert([
                {
                    created_at: matchData.datetime,
                    played_at: matchData.datetime,
                    home_forward: matchData.homeForwardsPlayer,
                    away_forward: matchData.awayForwardsPlayer,
                    home_defense: matchData.homeDefendersPlayer,
                    away_defense: matchData.awayDefendersPlayer,
                    home_forward_goals: matchData.homeForwardsScore,
                    home_defense_goals: matchData.homeDefendersScore,
                    away_forward_goals: matchData.awayForwardsScore,
                    away_defense_goals: matchData.awayDefendersScore,
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