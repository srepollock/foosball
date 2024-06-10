'use client';
import { TeamData } from '@/models/TeamsData';
import { Dispatch, SetStateAction } from 'react';

type TeamSelectFormInputProps = {
    teams: TeamData[];
    index: number;
    value: Dispatch<SetStateAction<string[]>>;
};

export default function TeamSelectFormInput(props: TeamSelectFormInputProps) {
    const handleSelection = (e: any, index: number) => {
        e.preventDefault();
        props.value((prevState: string[]) => {
            const newState = [...prevState];
            newState[index] = e.target.value;
            return newState;
        });
    };
    return (
        <select
            className="border border-gray-300 p-2 text-black"
            name={`tournamentTeam${props.index}`}
            onChange={(e) => handleSelection(e, props.index)}
        >
            <option value="">Select a team</option>
            {props.teams.map((team: TeamData) => (
                <option key={team.id} value={team.id}>
                    {team.team_name}
                </option>
            ))}
        </select>
    );
}
