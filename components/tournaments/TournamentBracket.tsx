'use client';
import { createBracket } from 'bracketry';
import { BracketData } from "@/models/BracketData";
import { useEffect } from 'react';
import { GetTournamentForBracketry } from '@/server/TournamentFunctions';
import BracketryComponent from './BracketryComponent';

type TournamentBracketProps = {
    id: string;
}

export function TournamentBracket(props: TournamentBracketProps) {
    
    return (
        <div>
            {/* <div id="tournament-bracket" /> */}
            <BracketryComponent id={props.id} />
        </div>
    );
}