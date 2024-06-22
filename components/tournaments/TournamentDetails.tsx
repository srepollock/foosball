'use client';

import { useEffect, useState } from "react";
import { TournamentBracket } from "./TournamentBracket";
import { GetTournamentById } from "@/server/TournamentFunctions";

type TournamentDetailsProps = {
    id: string;
};

export default function TournamentDetails(props: TournamentDetailsProps) {
    const [tournamentDetails, setTournamentDetails] = useState({} as any);
    useEffect(() => {
        GetTournamentById(props.id).then((data) => {
            setTournamentDetails(data);
        });
    }, []);

    return (
        <div>
            {tournamentDetails.name && (
                <div>
                    <h1 className='font-bold text-2xl mb-4'>Tournament Details</h1>
                    <p>{tournamentDetails.name}</p>
                    <p>{tournamentDetails.id}</p>
                    <p>{tournamentDetails.created_at}</p>
                </div>
            )}
            <div>
                <TournamentBracket id={props.id} />
            </div>
        </div>
    );
}
