'use client';

import { UserData } from '@/models/UserData';
import { UserStats } from '@/models/UserStats';
import { GetUserData, GetUserStats } from '@/server/UserDataFunctions';
import { useEffect, useState } from 'react';

type UserDetailsProps = {
    id: string;
};

export default function UserDetails(props: UserDetailsProps) {
    const [player, setPlayer] = useState<UserData>();
    const [playerStats, setPlayerStats] = useState<UserStats>();

    useEffect(() => {
        GetUserData(props.id).then((data) => {
            setPlayer(data as UserData);
        });
        GetUserStats(props.id)
            .then((data) => {
                setPlayerStats(data as UserStats);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);
    return (
        <div className="flex flex-col w-full h-full text-gray-700 bg-gray-200 shadow-md rounded-xl bg-clip-border min-w-xs max-w-md sm:max-w-lg md:max-w-1xl lg:max-w-2xl xl:max-w-4xl overflow-scroll">
            <div className="p-6 px-0">
                <table className="w-full text-left table-auto min-w-max">
                    <thead>
                        <tr>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Key
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Value
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-slate-200 hover:bg-slate-500 focus:bg-gray-300 active:bg-red-200 text-black hover:text-black focus:text-black active:text-black">
                            <td className="border px-8 py-4">User ID</td>
                            <td className="border px-8 py-4">{player?.id}</td>
                        </tr>
                        <tr className="bg-slate-200 hover:bg-slate-500 focus:bg-gray-300 active:bg-red-200 text-black hover:text-black focus:text-black active:text-black">
                            <td className="border px-8 py-4">Full Name</td>
                            <td className="border px-8 py-4">
                                {player?.full_name}
                            </td>
                        </tr>
                        <tr className="bg-slate-200 hover:bg-slate-500 focus:bg-gray-300 active:bg-red-200 text-black hover:text-black focus:text-black active:text-black">
                            <td className="border px-8 py-4">Player Goals</td>
                            <td className="border px-8 py-4">
                                {playerStats?.goals}
                            </td>
                        </tr>
                        <tr className="bg-slate-200 hover:bg-slate-500 focus:bg-gray-300 active:bg-red-200 text-black hover:text-black focus:text-black active:text-black">
                            <td className="border px-8 py-4">
                                Player Games played
                            </td>
                            <td className="border px-8 py-4">
                                {playerStats?.games_played}
                            </td>
                        </tr>
                        <tr className="bg-slate-200 hover:bg-slate-500 focus:bg-gray-300 active:bg-red-200 text-black hover:text-black focus:text-black active:text-black">
                            <td className="border px-8 py-4">Total Wins</td>
                            <td className="border px-8 py-4">
                                {playerStats?.wins}
                            </td>
                        </tr>
                        <tr className="bg-slate-200 hover:bg-slate-500 focus:bg-gray-300 active:bg-red-200 text-black hover:text-black focus:text-black active:text-black">
                            <td className="border px-8 py-4">Total Loses</td>
                            <td className="border px-8 py-4">
                                {playerStats?.losses}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
