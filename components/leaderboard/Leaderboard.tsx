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
    const [players, setPlayers] = useState<UserData[]>([]);
    const [stats, setStats] = useState<any>();
    const [sortedKeys, setSortedKeys] = useState<string[]>([]);

    useEffect(() => {
        GetAllUsersData()
            .then((data: any) => {
                setPlayers(data);
                return data;
            })
            .then(async (data) => {
                let newStats: any = {};
                let promises = data.map(async (player: any) => {
                    let userData = await GetUserStats(player.id);
                    newStats[player.id] = userData;
                });
                await Promise.all(promises);
                let keys = Object.keys(newStats);
                keys.sort((a, b) => newStats[b].goals - newStats[a].goals);
                var topFive = keys.slice(0, keys.length <= 5 ? 5 : keys.length);
                setStats(newStats);
                setSortedKeys(topFive);
                setLoading(true);
            });
    }, []);

    useEffect(() => {
        if (loading) {
            setLoading(false);
        }
    }, [loading]);

    return (
        <div className="flex flex-col w-full h-full text-gray-700 bg-gray-200 shadow-md rounded-xl bg-clip-border min-w-xs max-w-md sm:max-w-lg md:max-w-1xl lg:max-w-2xl xl:max-w-4xl overflow-scroll">
            <div className="p-6 px-0">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Rank
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Player
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {stats &&
                            sortedKeys &&
                            sortedKeys.map((key, index) => {
                                return (
                                    <tr
                                        key={key}
                                        className="bg-slate-200 hover:bg-slate-500 focus:bg-gray-300 active:bg-red-200 text-black hover:text-black focus:text-black active:text-black"
                                    >
                                        <td className="border px-8 py-4">
                                            {index + 1}
                                        </td>
                                        <td className="border px-8 py-4">
                                            <a href={`/player/${key}`}>
                                                {
                                                    players.find(
                                                        (player) =>
                                                            player.id === key
                                                    )?.full_name
                                                }
                                            </a>
                                        </td>
                                        <td className="border px-8 py-4">
                                            {stats[key].goals}
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
