export enum Team {
    HOME: 'HOME',
    AWAY: 'AWAY'
}

export type MatchData = {
    id: string | undefined;
    created_at: string | undefined;
    played_at: string | undefined;
    home_forward: string;
    home_foward_goals: number;
    home_defense: string | undefined;
    home_defense_goals: number | undefined;
    away_forward: string;
    away_foward_goals: number;
    away_defense: string | undefined;
    away_defense_goals: number | undefined;
    score_home: number;
    score_away: number;
    winner: Team;
};
