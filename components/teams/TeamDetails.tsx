'use client';

import { TeamData, TeamStats } from '@/models/TeamsData';
import { TournamentData } from '@/models/TournamentData';
import { UserData } from '@/models/UserData';
import { GetAllTeams, GetTeam, GetTeamStats } from '@/server/TeamFunctions';
import { GetAllTournaments } from '@/server/TournamentFunctions';
import { GetAllUsersData, GetUserData } from '@/server/UserDataFunctions';
import { useEffect, useState } from 'react';

type TeamDetailsProps = {
    id: string;
};

export default function TeamDetails(props: TeamDetailsProps) {
    const [team, setTeam] = useState<TeamData>();
    const [teamStats, setTeamStats] = useState<TeamStats>();
    const [forward, setForward] = useState<UserData>();
    const [defense, setDefense] = useState<UserData>();
    const [update, setUpdate] = useState(true);

    useEffect(() => {
        GetTeam(props.id)
            .then((data: TeamData) => {
                setTeam(data);
                return data;
            })
            .then((data) => {
                GetUserData(data.forward_id).then((forwardData: UserData) => {
                    setForward(forwardData);
                });
                GetUserData(data.defense_id).then((defenseData: UserData) => {
                    setDefense(defenseData);
                });
                GetTeamStats(data.id).then((stats: TeamStats) => {
                    console.log(stats);
                    setTeamStats(stats);
                });
            });
    }, [update]);

    return (
        <>
            {team && teamStats && (
                <div className="flex flex-col w-full h-full text-gray-700 bg-gray-200 shadow-md rounded-xl bg-clip-border min-w-xs max-w-md sm:max-w-lg md:max-w-1xl lg:max-w-2xl xl:max-w-4xl">
                    <div className="p-6 px-0 overflow-scroll">
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
                                <tr>
                                    <td className="border px-8 py-4">
                                        Team ID
                                    </td>
                                    <td className="border px-8 py-4">
                                        <a href={`/team/${team.id}`}>
                                            {team.id}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-8 py-4">
                                        Forward
                                    </td>
                                    <td className="border px-8 py-4">
                                        <a href={`/player/${forward?.id}`}>
                                            {forward?.full_name}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-8 py-4">
                                        Defense
                                    </td>
                                    <td className="border px-8 py-4">
                                        <a href={`/player/${defense?.id}`}>
                                            {defense?.full_name}
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-8 py-4">Wins</td>
                                    <td className="border px-8 py-4">
                                        {teamStats?.wins}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-8 py-4">Losses</td>
                                    <td className="border px-8 py-4">
                                        {teamStats?.losses}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-8 py-4">
                                        Games Played
                                    </td>
                                    <td className="border px-8 py-4">
                                        {teamStats?.games}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="border px-8 py-4">
                                        Goals For
                                    </td>
                                    <td className="border px-8 py-4">
                                        {teamStats?.goals}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}
