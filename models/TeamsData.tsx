export type TeamData = {
    id: string;
    created_at: string;
    forward_id: string;
    defense_id: string;
    team_name: string;
};

export type TeamStats = {
    goals: number;
    wins: number;
    losses: number;
    games: number;
};

export const DefaultTeamStats = {
    wins: 0,
    losses: 0,
    goals: 0,
    games: 0,
};
