export type TournamentBracketObject = {
    name: string;
    description: string;
    brackets: TournamentBracketMatchupObject[];
};

export type TournamentBracketMatchupObject = {
    match_id: string;
    round: number;
    order: number;
    home_team_id: string;
    away_team_id: string;
    parent?: TournamentBracketMatchupObject;
    child?: TournamentBracketMatchupObject[];
};
