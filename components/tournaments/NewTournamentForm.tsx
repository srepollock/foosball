'use client';

import { TeamData } from '@/models/TeamsData';
import { fetchAllTeams } from '@/server/TeamFunctions';
import { create } from 'domain';
import { useEffect, useState } from 'react';
import TeamSelectFormInput from './TeamFormInput';

type TournamentFormProps = {};

enum TournamentType {
    SINGLE_ELIMINATION = 'Single Elimination',
    DOUBLE_ELIMINATION = 'Double Elimination',
}

export default function NewTournamentForm() {
    const [teams, setTeams] = useState<TeamData[]>([]);
    const [teamSelectionInputs, setTeamSelectionInputs] = useState<
        HTMLInputElement[]
    >([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const handleAddTeam = () => {
        const newTeamInput = document.createElement('input');
        newTeamInput.type = 'text';
        newTeamInput.className = 'border border-gray-300 p-2';
        setTeamSelectionInputs(teamSelectionInputs.concat(newTeamInput));
    };

    const createTeamInputs = (teamSelectionInputs: HTMLInputElement[]) => {
        return teamSelectionInputs.map((item, index) => {
            return <TeamSelectFormInput key={index} teams={teams} />;
        });
    };

    useEffect(() => {
        fetchAllTeams().then((teams) => {
            setTeams(teams);
        });
    }, []);

    return (
        <div className="flex flex-col gap-6">
            <form
                className="flex-1 flex flex-col gap-6"
                onSubmit={handleSubmit}
                onReset={handleReset}
            >
                <label className="text-lg">Tournament Name</label>
                <input type="text" className="border border-gray-300 p-2" />
                <label className="text-lg">Description</label>
                <input type="date" className="border border-gray-300 p-2" />
                <label className="text-lg">Tournament Type</label>
                <select className="border border-gray-300 p-2">
                    <option value={TournamentType.SINGLE_ELIMINATION}>
                        {TournamentType.SINGLE_ELIMINATION}
                    </option>
                    <option value={TournamentType.DOUBLE_ELIMINATION}>
                        {TournamentType.DOUBLE_ELIMINATION}
                    </option>
                </select>
                <label className="text-lg">Teams</label>
                {createTeamInputs(teamSelectionInputs)}
                <button
                    className="bg-blue-500 text-white p-2"
                    onClick={handleAddTeam}
                >
                    Add Team
                </button>

                <button className="bg-green-500 text-white p-2" type="submit">
                    Create
                </button>
            </form>
        </div>
    );
}
