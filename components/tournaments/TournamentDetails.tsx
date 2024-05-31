'use client';

type TournamentDetailsProps = {
    id: string;
};

export default function TournamentDetails(props: TournamentDetailsProps) {
    return (
        <div>
            <h1>Tournament Details</h1>
            <p>{props.id}</p>
        </div>
    );
}
