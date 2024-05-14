"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/server";
import AddMatchButton from "./AddMatchButton";
import { handleAddMatch } from "@/server/Matchs";
import { fetchPlayers } from "@/server/Users";
import { MatchData, Team } from "@/models/MatcheData";

type Player = {
    id: any;
    full_name: any;
};

export default function AddMatchForm() {
    const supabase = createClient();
    const [datetime, setDatetime] = useState("");

    const [players, setPlayers] = useState<Player[]>([]);

    const [homeForwardsPlayer, setHomeForwardsPlayer] = useState("");
    const [homeDefendersPlayer, setHomeDefendersPlayer] = useState("");
    const [awayForwardsPlayer, setAwayForwardsPlayer] = useState("");
    const [awayDefendersPlayer, setAwayDefendersPlayer] = useState("");
    const [homeForwardsScore, setHomeForwardsScore] = useState(0);
    const [homeDefendersScore, setHomeDefendersScore] = useState(0);
    const [awayForwardsScore, setAwayForwardsScore] = useState(0);
    const [awayDefendersScore, setAwayDefendersScore] = useState(0);

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <div>
            <input
                type="datetime-local"
                value={new Date().toISOString().substring(0, 16)}
                onChange={(e) => setDatetime(e.target.value)}
                required
            />
            <select
                name="homeForwardsPlayer"
                id="homeForwardsPlayer"
                onChange={(e) => setHomeForwardsPlayer(e.target.value)}
                required
            >
                <option value="">Home Forward</option>
                {players.map((player) => (
                    <option key={player.id} value={player.full_name}>
                        {player.full_name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={homeForwardsScore}
                onChange={(e) => setHomeForwardsScore(Number(e.target.value))}
                placeholder="Home Forward Score"
                required
            />
            <select
                name="homeDefendersPlayer"
                id="homeDefendersPlayer"
                onChange={(e) => setHomeDefendersPlayer(e.target.value)}
                required
            >
                <option value="">Home Defender</option>
                {players.map((player) => (
                    <option key={player.id} value={player.full_name}>
                        {player.full_name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={homeDefendersScore}
                onChange={(e) => setHomeDefendersScore(Number(e.target.value))}
                placeholder="Home Defender Score"
            />
            <select
                name="awayForwardsPlayer"
                id="awayForwardsPlayer"
                onChange={(e) => setAwayForwardsPlayer(e.target.value)}
                required
            >
                <option value="">Away Forward</option>
                {players.map((player) => (
                    <option key={player.id} value={player.full_name}>
                        {player.full_name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={awayForwardsScore}
                onChange={(e) => setAwayForwardsScore(Number(e.target.value))}
                placeholder="Away Forward Score"
                required
            />
            <select
                name="awayDefendersPlayer"
                id="awayDefendersPlayer"
                onChange={(e) => setAwayDefendersPlayer(e.target.value)}
                required
            >
                <option value="">Away Defender</option>
                {players.map((player) => (
                    <option key={player.id} value={player.full_name}>
                        {player.full_name}
                    </option>
                ))}
            </select>
            <input
                type="number"
                value={awayDefendersScore}
                onChange={(e) => setAwayDefendersScore(Number(e.target.value))}
                placeholder="Away Defender Score"
            />
            <AddMatchButton onClick={(e) => {
                let homeScore = homeForwardsScore + homeDefendersScore;
                let awayScore = awayForwardsScore + awayDefendersScore;
                handleAddMatch(e, {
                    {
                    created_at: datetime,
                    played_at: datetime,
                    home_forward: homeForwardsPlayer,
                    away_forward: awayForwardsPlayer,
                    home_defense: homeDefendersPlayer,
                    away_defense: awayDefendersPlayer,
                    home_forward_goals: homeForwardsScore,
                    home_defense_goals: homeDefendersScore,
                    away_forward_goals: awayForwardsScore,
                    away_defense_goals: awayDefendersScore,
                    home_score: homeScore,
                    away_score: awayScore,
                    winner: homeScore > awayScore ? Team.HOME : Team.AWAY,
                },
                } as MatchData)
            }} />
        </div>
    );
}
