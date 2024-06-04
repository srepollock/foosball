"use client";
import { UserData } from "@/models/UserData";
import { GetAllUsersData } from "@/server/UserDataFunctions";
import { useEffect, useState } from "react";

export default function NewTeamForm() {
    const [players, setPlayers] = useState<UserData[]>([]);
    const handleSubmit = () => {
        // Handle form submission
    };
    const handleReset = () => {};

    useEffect(() => {
        GetAllUsersData().then((data) => {
            setPlayers(data);
        });
    }, []);
    return (
        <div className="flex flex-col gap-6">
            <form
                className="flex-1 flex flex-col gap-6"
                onSubmit={handleSubmit}
                onReset={handleReset}
            >
                <label className="text-lg">Team Name</label>
                <input type="text" className="border border-gray-300 p-2" />
                <label className="text-lg">Forward</label>"
                <select className="border border-gray-300 p-2">
                    {players.map((player) => (
                        <option key={player.id}>{player.full_name}</option>
                    ))}
                </select>
                <label className="text-lg">Defender</label>
                <select className="border border-gray-300 p-2">
                    {players.map((player) => (
                        <option key={player.id}>{player.full_name}</option>
                    ))}
                </select>
                <button className="bg-green-500 text-white p-2" type="submit">
                    Create
                </button>
            </form>
        </div>
    );
}
