export enum Team {
    HOME = "HOME",
    AWAY = "AWAY",
}

export type MatchData = {
    id?: string;
    created_at: string;
    played_at: string;
    home_forward: string;
    home_forward_goals: number;
    home_defense?: string;
    home_defense_goals?: number;
    away_forward: string;
    away_forward_goals: number;
    away_defense?: string;
    away_defense_goals?: number;
    score_home: number;
    score_away: number;
    winner: Team;
};
