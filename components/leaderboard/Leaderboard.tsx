'use client';

import { UserData } from '@/models/UserData';
import { UserStats } from '@/models/UserStats';
import { GetAllUsersData, GetUserStats } from '@/server/UserDataFunctions';
import { useEffect, useState } from 'react';

type StatDictionary = {
    [key: string]: UserStats;
};

export default function Leaderboard() {
    const [loading, setLoading] = useState<boolean>(false);
    const [sortedPlayers, setSortedPlayers] = useState<StatDictionary>({});
    const [players, setPlayers] = useState<UserData[]>([]);
    const [stats, setStats] = useState<StatDictionary>();

    useEffect(() => {
        GetAllUsersData()
            .then((data: any) => {
                setPlayers(data);
                return data;
            })
            .then((data) => {
                let newStats: StatDictionary = {};
                data.forEach((player: any) => {
                    GetUserStats(player.id).then((data: any) => {
                        newStats[player.id] = data;
                    });
                });
                var e = Object.entries(newStats);
                e.sort((a, b) => b[1].goals - a[1].goals);
                var sortedDictionary = Object.fromEntries(e);
                setSortedPlayers(sortedDictionary);
                setStats(newStats);
                setLoading(true);
            });
    }, []);

    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
    }, [loading]);

    return (
        <div>
            <table className="w-full">
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>
                    {stats &&
                        sortedPlayers &&
                        Object.keys(sortedPlayers).map((key, index) => {
                            return (
                                <tr key={key}>
                                    <td>{index + 1}</td>
                                    <td>
                                        {
                                            players.find(
                                                (player) => player.id === key
                                            )?.full_name
                                        }
                                    </td>
                                    <td>{stats[key].goals}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
}
