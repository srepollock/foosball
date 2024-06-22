'use client';

import { useState, useEffect } from 'react';
import AddMatchButton from './AddMatchButton';
import { handleAddMatch } from '@/server/MatchFunctions';
import { MatchData, Team } from '@/models/MatchData';
import { GetAllUserIdFullNamesData } from '@/server/UserDataFunctions';

type PlayerData = {
    id: any;
    full_name: any;
};

export default function AddTeamMatchForm() {
    const [playedAt, setPlayedAt] = useState(new Date());

    const [players, setPlayers] = useState<PlayerData[]>([]);

    const [homeForwardsPlayer, setHomeForwardsPlayer] = useState('');
    const [homeDefendersPlayer, setHomeDefendersPlayer] = useState<
        String | undefined
    >(undefined);
    const [awayForwardsPlayer, setAwayForwardsPlayer] = useState('');
    const [awayDefendersPlayer, setAwayDefendersPlayer] = useState<
        String | undefined
    >(undefined);
    const [homeForwardsScore, setHomeForwardsScore] = useState(0);
    const [homeDefendersScore, setHomeDefendersScore] = useState<
        number | undefined
    >(undefined);
    const [awayForwardsScore, setAwayForwardsScore] = useState(0);
    const [awayDefendersScore, setAwayDefendersScore] = useState<
        number | undefined
    >(undefined);
    const [tournamentId, setTournamentId] = useState('');
    const [tournamentRoundId, setTournamentRoundId] = useState(0);

    useEffect(() => {
        GetAllUserIdFullNamesData().then((data) => {
            setPlayers(data as PlayerData[]);
        });
    }, []);

    return (
        <div className="flex flex-col">
            <form>
                <div className="mb-4">
                    <input
                        className="input w-full max-w-xs mb-4"
                        type="datetime-local"
                        id="played_at"
                        defaultValue={new Date().toISOString().substring(0, 16)}
                        onChange={(e) => setPlayedAt(new Date(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-8">
                    <label className="text-sm">Home Team</label>
                    <br />
                    <select
                        className="select w-full max-w-xs mb-4"
                        name="homeForwardsPlayer"
                        id="homeForwardsPlayer"
                        onChange={(e) => setHomeForwardsPlayer(e.target.value)}
                        required
                    >
                        <option value="">Home Forward</option>
                        {players.map((player: PlayerData) => (
                            <option key={player.id} value={player.id}>
                                {player.full_name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="input w-full max-w-xs mb-4"
                        type="number"
                        value={homeForwardsScore}
                        onChange={(e) =>
                            setHomeForwardsScore(Number(e.target.value))
                        }
                        placeholder="Home Forward Score"
                        required
                    />
                    <select
                        className="select w-full max-w-xs mb-4"
                        name="homeDefendersPlayer"
                        id="homeDefendersPlayer"
                        onChange={(e) => setHomeDefendersPlayer(e.target.value)}
                    >
                        <option value="">Home Defender</option>
                        {players.map((player: PlayerData) => (
                            <option key={player.id} value={player.id}>
                                {player.full_name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="input w-full max-w-xs mb-4"
                        type="number"
                        value={homeDefendersScore ?? 0}
                        onChange={(e) =>
                            setHomeDefendersScore(Number(e.target.value))
                        }
                        placeholder="Home Defender Score"
                    />
                </div>
                <div className="mb-8">
                    <label className="text-sm">Away Team</label>
                    <br />
                    <select
                        className="select w-full max-w-xs mb-4"
                        name="awayForwardsPlayer"
                        id="awayForwardsPlayer"
                        onChange={(e) => setAwayForwardsPlayer(e.target.value)}
                        required
                    >
                        <option value="">Away Forward</option>
                        {players.map((player: PlayerData) => (
                            <option key={player.id} value={player.id}>
                                {player.full_name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="input w-full max-w-xs mb-4"
                        type="number"
                        value={awayForwardsScore}
                        onChange={(e) =>
                            setAwayForwardsScore(Number(e.target.value))
                        }
                        placeholder="Away Forward Score"
                        required
                    />
                    <select
                        className="select w-full max-w-xs mb-4"
                        name="awayDefendersPlayer"
                        id="awayDefendersPlayer"
                        onChange={(e) => setAwayDefendersPlayer(e.target.value)}
                    >
                        <option value="">Away Defender</option>
                        {players.map((player: PlayerData) => (
                            <option key={player.id} value={player.id}>
                                {player.full_name}
                            </option>
                        ))}
                    </select>
                    <input
                        className="input w-full max-w-xs mb-4"
                        type="number"
                        value={awayDefendersScore ?? 0}
                        onChange={(e) =>
                            setAwayDefendersScore(Number(e.target.value))
                        }
                        placeholder="Away Defender Score"
                    />
                </div>
                <div className="mb-8">
                    <label className="text-sm text-gray-500">Tournament ID</label>
                    <br />
                    <input id="tournamentId"
                        className="input w-full max-w-xs mb-4"
                        type="text" placeholder="Tournament ID" onChange={(e) => {
                        setTournamentId(e.target.value)
                    }}/>
                </div>
                <div className="mb-8">
                    <label className="text-sm text-gray-500">Tournament Round ID</label>
                    <br />
                    <input id="tournamentRoundId"
                        className="input w-full max-w-xs mb-4"
                        type="number" placeholder="Tournament Round ID" onChange={(e) => {
                        setTournamentRoundId(Number(e.target.value))
                    }} />
                </div>
                <AddMatchButton
                    onClick={(e: any) => {
                        let homeScore =
                            homeForwardsScore +
                            (homeDefendersScore ? homeDefendersScore : 0);
                        let awayScore =
                            awayForwardsScore +
                            (awayDefendersScore ? awayDefendersScore : 0);

                        if (homeScore >= 8 || awayScore >= 8) {
                            if (Math.abs(homeScore - awayScore) < 2) {
                                alert(
                                    'Winning team must win by at least 2 goals. Invalid game.'
                                );
                                return;
                            }
                        } else {
                            alert(
                                'Winning score must be equal to or greater than 8. Invalid game.'
                            );
                            return;
                        }

                        handleAddMatch(e, {
                            created_at: new Date().toISOString(),
                            played_at: playedAt.toISOString(),
                            home_forward: homeForwardsPlayer,
                            away_forward: awayForwardsPlayer,
                            home_defense: homeDefendersPlayer,
                            away_defense: awayDefendersPlayer,
                            home_forward_goals: homeForwardsScore,
                            home_defense_goals: homeDefendersScore,
                            away_forward_goals: awayForwardsScore,
                            away_defense_goals: awayDefendersScore,
                            score_home: homeScore,
                            score_away: awayScore,
                            winner:
                                homeScore > awayScore ? Team.HOME : Team.AWAY,
                            tournament_id: tournamentId,
                            tournament_round_id: tournamentRoundId
                        } as MatchData);
                    }}
                />
            </form>
        </div>
    );
}
