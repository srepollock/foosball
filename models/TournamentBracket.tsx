export type TournamentBracketObject = {
    name: string;
    description: string;
    brackets: TournamentBracketMatchupObject[];
};

export type TournamentBracketMatchupObject = {
    match_id: string;
    game_number: number;
    home_team_id: string;
    away_team_id: string;
};
