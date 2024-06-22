import { TournamentBracketObject } from "@/models/TournamentBracket";
import { GetTournamentForBracketry } from "@/server/TournamentFunctions";
import { createBracket } from "bracketry";
import { createElement, useEffect, useRef, useState } from "react";

type BracketryComponentProps = {
    id: string;
}
export default function BracketryComponent(props: BracketryComponentProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    let [tournamentData, setTournamentData] = useState<TournamentBracketObject>();
    useEffect(() => {
        GetTournamentForBracketry(props.id).then((data) => {
            setTournamentData(data as TournamentBracketObject);
        });
    }, []);
    useEffect(() => {
        if (tournamentData) {
            createBracket(tournamentData, wrapperRef.current!);
        }
    }, [tournamentData]);
    return (
        <div className="bg-slate-600">
            <div id="tournament-bracket" ref={wrapperRef} />
        </div>
    );
}