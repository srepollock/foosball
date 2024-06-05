export type UserStats = {
    id: string;
    updated_at: string;
    games_played: number;
    goals: number;
    wins?: number;
    losses?: number;
};

export const DefaultUserStatsObject: UserStats = {
    id: '',
    updated_at: new Date().toISOString(),
    games_played: 0,
    goals: 0,
    wins: 0,
    losses: 0,
};

export function DefaultUserStats(id: string) {
    return {
        id: id,
        updated_at: new Date().toISOString(),
        games_played: 0,
        goals: 0,
        wins: 0,
        losses: 0,
    } as UserStats;
}
