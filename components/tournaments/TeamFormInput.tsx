'use client';
import { TeamData } from '@/models/TeamsData';
import { fetchAllTeams } from '@/server/TeamFunctions';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

type TeamSelectFormInputProps = {
    teams: TeamData[];
};

export default function TeamSelectFormInput(props: TeamSelectFormInputProps) {
    return (
        <select className="border border-gray-300 p-2 text-black">
            <option value="">Select a team</option>
            {props.teams.map((team: TeamData) => (
                <option key={team.id} value={team.id}>
                    {team.team_name}
                </option>
            ))}
        </select>
    );
}
