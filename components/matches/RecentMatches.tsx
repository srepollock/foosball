"use client";
import { MatchData } from "@/models/MatchData";
import { fetchMatches } from "@/server/Matches";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

type RecentMatchesProps = {
    page: number;
    userId?: string | undefined;
};

export default function RecentMatches(props: RecentMatchesProps) {
    const [matches, setMatches] = useState<MatchData[]>();
    const [update, setUpdate] = useState(true);
    const [page, setPage] = useState<number>(0);

    useEffect(() => {
        fetchMatches(page, props.userId!).then((data) => {
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
        <div>
            <div>Recent Matches</div>
            <table className="shadow-lg bg-blue-900 border-collapse">
                <tr>
                    <th className="bg-blue-900 border text-left px-8 py-4">
                        Match ID
                    </th>
                    <th className="bg-blue-900 border text-left px-8 py-4">
                        Played Date
                    </th>
                    <th className="bg-blue-900 border text-left px-8 py-4">
                        Home Foward
                    </th>
                    <th className="bg-blue-900 border text-left px-8 py-4">
                        Home Defense
                    </th>
                    <th className="bg-blue-900 border text-left px-8 py-4">
                        Away Forward
                    </th>
                    <th className="bg-blue-900 border text-left px-8 py-4">
                        Away Defense
                    </th>
                    <th className="bg-blue-900 border text-left px-8 py-4">
                        Score
                    </th>
                </tr>
                {matches?.map((match: MatchData) => (
                    <tr
                        className="hover:bg-gray-50 focus:bg-gray-300 active:bg-red-200"
                        tabIndex={0}
                    >
                        <td className="border px-8 py-4">{match.id}</td>
                        <td className="border px-8 py-4">{match.played_at}</td>
                        <td className="border px-8 py-4">
                            {match.home_forward}
                        </td>
                        <td className="border px-8 py-4">
                            {match.home_defense}
                        </td>
                        <td className="border px-8 py-4">
                            {match.away_forward}
                        </td>
                        <td className="border px-8 py-4">
                            {match.away_defense}
                        </td>
                        <td className="border px-8 py-4">
                            {match.score_home} - {match.score_away}
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
}
