'use client';
import { MatchData } from '@/models/MatchData';
import { fetchMatch } from '@/server/MatchFunctions';
import { GetAllUserIdFullNamesData } from '@/server/UserDataFunctions';
import { useEffect, useState } from 'react';

type PlayerData = {
    id: string;
    full_name: string;
};

type MatchDetailsProps = {
    id: string;
};
export default function MatchDetails(props: MatchDetailsProps) {
    const [match, setMatch] = useState<MatchData | null>(null);
    const [players, setPlayers] = useState<PlayerData[]>([]);
    useEffect(() => {
        fetchMatch(props.id).then((data) => {
            setMatch(data as MatchData);
        });
        GetAllUserIdFullNamesData().then((data) => {
            setPlayers(data as PlayerData[]);
        });
    }, []);

    const index = 0;

    return (
        <div className="relative flex flex-col w-full h-full text-gray-700 shadow-md rounded-xl bg-clip-border">
            {match && (
                <div className="p-6 px-0 overflow-scroll">
                    <table className="w-full text-left table-auto min-w-max">
                        <thead>
                            <tr>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Match ID
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Played Date
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Created Date
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Winner
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Score
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Home Foward
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Home Forward Goals
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Home Defense
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Home Defense Goals
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Away Forward
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Away Forward Goals
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Away Defense
                                </th>
                                <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                    Away Defense Goals
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                className="bg-slate-200 hover:bg-slate-500 focus:bg-gray-300 active:bg-red-200 text-black hover:text-black focus:text-black active:text-black"
                                tabIndex={0}
                                key={index}
                            >
                                <td className="border px-8 py-4">
                                    <a href={`/match/${match.id}`}>
                                        {match.id}
                                    </a>
                                </td>
                                <td className="border px-8 py-4">
                                    {match.played_at}
                                </td>
                                <td className="border px-8 py-4">
                                    {match.created_at}
                                </td>
                                <td className="border px-8 py-4">
                                    {match.winner}
                                </td>
                                <td className="border px-8 py-4">
                                    {match.score_home} - {match.score_away}
                                </td>
                                <td className="border px-8 py-4">
                                    <a href={`/user/${match.home_forward}`}>
                                        {
                                            players.find((player) => {
                                                return match.home_forward.includes(
                                                    player.id
                                                );
                                            })?.full_name
                                        }
                                    </a>
                                </td>
                                <td className="border px-8 py-4">
                                    {match.home_forward_goals}
                                </td>
                                <td className="border px-8 py-4">
                                    <a href={`/user/${match.home_defense}`}>
                                        {
                                            players.find((player) => {
                                                if (
                                                    match.home_defense !=
                                                    undefined
                                                ) {
                                                    return match.home_defense.includes(
                                                        player.id
                                                    );
                                                } else {
                                                    return false;
                                                }
                                            })?.full_name
                                        }
                                    </a>
                                </td>
                                <td className="border px-8 py-4">
                                    {match.home_defense_goals}
                                </td>
                                <td className="border px-8 py-4">
                                    <a href={`/user/${match.away_forward}`}>
                                        {
                                            players.find((player) => {
                                                return match.away_forward.includes(
                                                    player.id
                                                );
                                            })?.full_name
                                        }
                                    </a>
                                </td>
                                <td className="border px-8 py-4">
                                    {match.away_forward_goals}
                                </td>
                                <td className="border px-8 py-4">
                                    <a href={`/user/${match.away_defense}`}>
                                        {
                                            players.find((player) => {
                                                if (
                                                    match.away_defense !=
                                                    undefined
                                                ) {
                                                    return match.away_defense.includes(
                                                        player.id
                                                    );
                                                } else {
                                                    return false;
                                                }
                                            })?.full_name
                                        }
                                    </a>
                                </td>
                                <td className="border px-8 py-4">
                                    {match.away_defense_goals}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
