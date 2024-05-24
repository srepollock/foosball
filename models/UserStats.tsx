export type UserStats = {
    id: string;
    created_at: string;
    updated_at: string;
    games_played: number;
    goals: number;
    wins?: number;
    losses?: number;
};

export type UserMatchStats = {
    id: string;
    goals: number;
    won: boolean;
};
