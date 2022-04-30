export interface League {
    name: string;
    slug: string;
}

export interface Result {
    outcome: string;
    gameWins: number;
}

export interface Record {
    wins: number;
    losses: number;
}

export interface Team {
    name: string;
    code: string;
    image: string;
    result: Result;
    record: Record;
}

export interface Strategy {
    type: string;
    count: number;
}

export interface Match {
    id: string;
    flags: string[];
    teams: Team[];
    strategy: Strategy;
}

export interface Game {
    startTime: Date;
    state: string;
    type: string;
    blockName: string;
    league: League;
    match: Match;
}