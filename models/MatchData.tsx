export enum Team {
    HOME = 'HOME',
    AWAY = 'AWAY',
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

export const DefaultMatchData: MatchData = {
    created_at: new Date().toISOString(),
    played_at: new Date().toISOString(),
    home_forward: '',
    home_forward_goals: 0,
    away_forward: '',
    away_forward_goals: 0,
    score_home: 0,
    score_away: 0,
    winner: Team.HOME,
};
