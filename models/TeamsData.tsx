export type TeamData = {
    id: string;
    created_at: string;
    forward_id: string;
    defense_id: string;
    team_name: string;
};

export const DefaultTeamData = {
    id: '',
    created_at: new Date().toISOString(),
    forward_id: '',
    defense_id: '',
    team_name: '',
};

export function CreateDefaultTeamData(id: string) {
    let teamData = DefaultTeamData;
    teamData.id = id;
    return teamData;
}

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
