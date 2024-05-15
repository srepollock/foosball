"use client";

import { useState, useEffect } from "react";
import AddMatchButton from "./AddMatchButton";
import { handleAddMatch } from "@/server/Matches";
import { fetchPlayers } from "@/server/Users";
import { MatchData, Team } from "@/models/MatchData";

type PlayerData = {
    id: any;
    full_name: any;
};

export default function AddMatchForm() {
    const [datetime, setDatetime] = useState("");

    const [players, setPlayers] = useState<PlayerData[]>([]);

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
            <form>
                <div className='mb-4'>
                    <input
                        className="border-2 border-gray-500 bg-gray-500 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none m-2"
                        type="datetime-local"
                        value={new Date().toISOString().substring(0, 16)}
                        onChange={(e) => setDatetime(e.target.value)}
                        required
                    />
                </div>
                <div className='mb-8'>
                    <select
                        className="border-2 border-gray-500 bg-gray-500 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none m-2"
                        name="homeForwardsPlayer"
                        id="homeForwardsPlayer"
                        onChange={(e) => setHomeForwardsPlayer(e.target.value)}
                        required
                    >
                        <option value="">Home Forward</option>
                        {players.map((player: PlayerData) => (
                            <option key={player.id} value={player.full_name}>
                                {player.full_name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="border-2 border-gray-500 bg-gray-500 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none m-2"
                        type="number"
                        value={homeForwardsScore}
                        onChange={(e) => setHomeForwardsScore(Number(e.target.value))}
                        placeholder="Home Forward Score"
                        required
                    />
                    <select
                        className="border-2 border-gray-500 bg-gray-500 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none m-2"
                        name="homeDefendersPlayer"
                        id="homeDefendersPlayer"
                        onChange={(e) => setHomeDefendersPlayer(e.target.value)}
                        required
                    >
                        <option value="">Home Defender</option>
                        {players.map((player: PlayerData) => (
                            <option key={player.id} value={player.full_name}>
                                {player.full_name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="border-2 border-gray-500 bg-gray-500 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none m-2"
                        type="number"
                        value={homeDefendersScore}
                        onChange={(e) => setHomeDefendersScore(Number(e.target.value))}
                        placeholder="Home Defender Score"
                    />
                </div>
                <div className="mb-8">
                    <select
                        className="border-2 border-gray-500 bg-gray-500 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none m-2"
                        name="awayForwardsPlayer"
                        id="awayForwardsPlayer"
                        onChange={(e) => setAwayForwardsPlayer(e.target.value)}
                        required
                    >
                        <option value="">Away Forward</option>
                        {players.map((player: PlayerData) => (
                            <option key={player.id} value={player.full_name}>
                                {player.full_name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="border-2 border-gray-500 bg-gray-500 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none m-2"
                        type="number"
                        value={awayForwardsScore}
                        onChange={(e) => setAwayForwardsScore(Number(e.target.value))}
                        placeholder="Away Forward Score"
                        required
                    />
                    <select
                        className="border-2 border-gray-500 bg-gray-500 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none m-2"
                        name="awayDefendersPlayer"
                        id="awayDefendersPlayer"
                        onChange={(e) => setAwayDefendersPlayer(e.target.value)}
                        required
                    >
                        <option value="">Away Defender</option>
                        {players.map((player: PlayerData) => (
                            <option key={player.id} value={player.full_name}>
                                {player.full_name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="border-2 border-gray-500 bg-gray-500 h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none m-2"
                        type="number"
                        value={awayDefendersScore}
                        onChange={(e) => setAwayDefendersScore(Number(e.target.value))}
                        placeholder="Away Defender Score"
                    />
                </div>
            <AddMatchButton onClick={(e: any) => {
                let homeScore = homeForwardsScore + homeDefendersScore;
                let awayScore = awayForwardsScore + awayDefendersScore;
                handleAddMatch(e, {
                    id: "",
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
                } as MatchData)
            }} />
            </form>
        </div>
    );
}
