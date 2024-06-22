export type BracketData = {
    rounds: Round[],
    matches?: Match[],
    contestants?: {
        [contestantId: string]: Contestant
    }
}

export type Round = {
    name?: string,
}

export type Match = {
    roundIndex: number, // 0-based
    order: number, // 0-based
    sides?: Side[],
    matchStatus?: string,
    isLive?: boolean
    isBronzeMatch?: string,
}

export type Contestant = {
    entryStatus?: string,
    players: Player[]
}

export type Side = {
    title?: string,
    contestantId?: string,
    scores?: Score[],
    currentScore?: number | string,
    isServing?: boolean,
    isWinner?: boolean
}

type Score = {
    mainScore: number | string,
    subscore?: number | string,
    isWinner?: boolean
}

export type Player = {
    title: string,
    nationality?: string
}