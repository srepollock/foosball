"use client";

import { UserData } from "@/models/UserData";
import { UserStats } from "@/models/UserStats";
import { fetchPlayer, fetchPlayerStats } from "@/server/Users";
import { useEffect, useState } from "react";

type UserDetailsProps = {
    id: string;
};

export default function UserDetails(props: UserDetailsProps) {
    const [player, setPlayer] = useState<UserData>();
    const [playerStats, setPlayerStats] = useState<UserStats>();

    useEffect(() => {
        fetchPlayer(props.id).then((data) => {
            setPlayer(data as UserData);
        });
        fetchPlayerStats(props.id).then((data) => {
            setPlayerStats(data as UserStats);
        });
    }, []);
    return (
        <div>
            <h1>User ID {props.id}</h1>
            <h2>Full Name {player?.full_name}</h2>
            <h2>Player Goals {playerStats?.goals}</h2>
            <h2>Player Games played {playerStats?.games_played}</h2>
            <h2>Total Wins {playerStats?.wins}</h2>
            <h2>Total Loses {playerStats?.loses}</h2>
        </div>
    );
}
