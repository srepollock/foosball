'use client';
import { UserData } from '@/models/UserData';
import { CreateTeam } from '@/server/TeamFunctions';
import { GetAllUsersData } from '@/server/UserDataFunctions';
import { ProfanityCheck } from '@/utils/ProfanityCheck';
import { useEffect, useState } from 'react';

export default function NewTeamForm() {
    const [players, setPlayers] = useState<UserData[]>([]);
    const [forward, setForward] = useState<string>('');
    const [defender, setDefender] = useState<string>('');
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Handle form submission
        var teamName = e?.target?.teamName.value as string;
        if (await ProfanityCheck(teamName)) {
            var message = `Profanity detected in the Team Name: ${teamName}. Please clean it up.`;
            console.error(message);
            alert(message);
            return;
        }
        if (forward === defender) {
            var message = `Forward and Defender cannot be the same player.`;
            console.error(message);
            alert(message);
            return;
        }
        CreateTeam(forward, defender, teamName);
    };

    const handleForwardChanged = (e: any) => {
        e.preventDefault();
        setForward(e.target.value);
    };

    const handleDefenseChanged = (e: any) => {
        e.preventDefault();
        setDefender(e.target.value);
    };

    useEffect(() => {
        GetAllUsersData().then((data) => {
            setPlayers(data);
        });
        setForward(players[0]?.id);
        setDefender(players[0]?.id);
    }, []);
    return (
        <div className="flex flex-col gap-6">
            <form
                className="flex-1 flex flex-col gap-6"
                onSubmit={handleSubmit}
            >
                <label className="text-lg">Team Name</label>
                <input
                    name="teamName"
                    type="text"
                    className="border border-gray-300 p-2 text-black"
                />
                <label className="text-lg">Forward</label>
                <select
                    name="forward"
                    className="border border-gray-300 p-2 text-black"
                    onChange={handleForwardChanged}
                >
                    {players.map((player) => (
                        <option key={player.id} value={player.id}>
                            {player.full_name}
                        </option>
                    ))}
                </select>
                <label className="text-lg">Defender</label>
                <select
                    name="defender"
                    className="border border-gray-300 p-2 text-black"
                    onChange={handleDefenseChanged}
                >
                    {players.map((player) => (
                        <option key={player.id} value={player.id}>
                            {player.full_name}
                        </option>
                    ))}
                </select>
                <button className="bg-green-500 text-white p-2" type="submit">
                    Create
                </button>
            </form>
        </div>
    );
}
