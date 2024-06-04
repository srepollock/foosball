import { Team } from "@/models/TeamsData";
import { fetchAllTeams } from "@/server/TeamFunctions";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

type TeamSelectFormInputProps = {
    teams: Team[];
};

export default function TeamSelectFormInput(props: TeamSelectFormInputProps) {
    return (
        <select className="border border-gray-300 p-2">
            <option value="">Select a team</option>
            {props.teams.map((team: Team) => (
                <option key={team.id} value={team.id}>
                    {team.team_name}
                </option>
            ))}
        </select>
    );
}
