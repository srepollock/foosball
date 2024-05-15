export enum Team {
    HOME = 'HOME',
    AWAY = 'AWAY'
}

export type MatchData = {
    id: string | undefined;
    created_at: string | undefined;
    played_at: string | undefined;
    home_forward: string;
    home_forward_goals: number;
    home_defense: string | undefined;
    home_defense_goals: number | undefined;
    away_forward: string;
    away_forward_goals: number;
    away_defense: string | undefined;
    away_defense_goals: number | undefined;
    home_score: number;
    away_score: number;
    winner: Team;
};
