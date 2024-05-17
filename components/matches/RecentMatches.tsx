"use client";
import { MatchData } from "@/models/MatchData";
import { fetchMatches, fetchTotalMatches } from "@/server/Matches";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { fetchPlayers } from "@/server/Users";

type PlayerData = {
    id: string;
    full_name: string;
};

type RecentMatchesProps = {
    page: number;
    userId?: string | undefined;
};

export default function RecentMatches(props: RecentMatchesProps) {
    const [matches, setMatches] = useState<MatchData[]>();
    const [update, setUpdate] = useState(true);
    const [page, setPage] = useState<number>(0);
    const [pages, setPages] = useState<Array<number>>([]);
    const [players, setPlayers] = useState<PlayerData[]>([]);

    useEffect(() => {
        setUpdate(true);
    }, [page]);

    useEffect(() => {
        fetchTotalMatches(props.userId).then((data) => {
            if (data) {
                const totalPage = Math.ceil(data / 10);
                const pages = [];
                for (let i = 0; i < totalPage; i++) {
                    pages.push(i);
                }
                setPages(pages);
            }
        });
    }, []);

    useEffect(() => {
        fetchPlayers().then((data) => {
            setPlayers(data as PlayerData[]);
        });
        fetchMatches(page, props.userId).then((data) => {
            if (data) {
                setMatches(data as MatchData[]);
            }
            setUpdate(false);
        });
        if (page == undefined) {
            setPage(props.page);
        }
    }, [update]);

    return (
        <div className="flex flex-col w-full h-full text-gray-700 bg-gray-200 shadow-md rounded-xl bg-clip-border min-w-xs max-w-md sm:max-w-lg md:max-w-1xl lg:max-w-2xl xl:max-w-4xl">
            <div className="p-6 px-0 overflow-scroll">
                <table className="w-full text-left table-auto min-w-max">
                    <tbody>
                        <tr>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Match ID
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Played Date
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Home Foward
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Home Defense
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Away Forward
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Away Defense
                            </th>
                            <th className="bg-gray-400 border text-left px-8 py-4 text-black">
                                Score
                            </th>
                        </tr>
                        {matches?.map((match: MatchData, index: number) => (
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
                                    <a href={`/user/${match.home_defense}`}>
                                        {
                                            players.find((player) => {
                                                if (
                                                    match.home_defense !=
                                                        undefined &&
                                                    match.home_defense != ""
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
                                    <a href={`/user/${match.away_defense}`}>
                                        {
                                            players.find((player) => {
                                                if (
                                                    match.away_defense !=
                                                        undefined &&
                                                    match.away_defense != ""
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
                                    {match.score_home} - {match.score_away}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center justify-between p-4 border-t border-blue-gray-50">
                <button
                    className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => {
                        if (page > 0) {
                            setPage(page - 1);
                        }
                    }}
                >
                    Previous
                </button>
                <div className="flex items-center gap-2">
                    {pages.map((page, index) => (
                        <button
                            className="relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                                {index}
                            </span>
                        </button>
                    ))}
                </div>
                <button
                    className="select-none rounded-lg border border-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                    onClick={() => {
                        if (page < pages.length - 1) {
                            setPage(page + 1);
                        }
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
