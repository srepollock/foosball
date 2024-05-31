export type UserStats = {
    id: string;
    created_at: string;
    updated_at: string;
    games_played: number;
    goals: number;
    wins?: number;
    losses?: number;
};

export const DefaultUserStats: UserStats = {
    id: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    games_played: 0,
    goals: 0,
    wins: 0,
    losses: 0,
};

export type UserMatchStats = {
    id: string;
    goals: number;
    won: boolean;
};

export const DefaultMatchStats: UserMatchStats = {
    id: '',
    goals: 0,
    won: false,
};
