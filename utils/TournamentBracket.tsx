import { TeamData } from '@/models/TeamsData';

type BracketPair = {
    home: TeamData;
    away: TeamData;
};

export function GenerateTournamentBracket(
    teams: TeamData[],
    randomize: boolean = true
) {
    if (teams.length % 2 != 0) {
        console.error(
            'Cannot generate a bracket for an un-even number of teams.'
        );
    }
    let pairs: BracketPair[] = [];
    if (randomize) {
        let usedIndexes: any[] = [];
        if (teams.length < 2) {
            console.error('Cannot generate a bracket for less than 2 teams.');
            return JSON.stringify([]);
        }
        let i = 0;
        while (usedIndexes.length <= teams.length - 1 && i < 1000) {
            let homeIndex = Math.floor(Math.random() * teams.length);
            let awayIndex = Math.floor(Math.random() * teams.length);
            if (
                homeIndex != awayIndex &&
                !usedIndexes.includes(homeIndex) &&
                !usedIndexes.includes(awayIndex)
            ) {
                usedIndexes.push(homeIndex);
                usedIndexes.push(awayIndex);
                pairs.push({
                    home: teams[homeIndex],
                    away: teams[awayIndex],
                } as BracketPair);
            }
            i++;
        }
    } else {
        // Index jumps by 2
        for (let i = 0; i < teams.length; i += 2) {
            let home = teams[i];
            let away = teams[i + 1];
            pairs.push({ home: home, away: away } as BracketPair);
        }
    }

    let rounds = teams.length - 1;
    let bracket = [];

    for (let i = 0; i < rounds; i++) {
        if (i < pairs.length) {
            bracket.push({
                match_id: i.toString(),
                game_number: i,
                home_team_id: pairs[i].home.id,
                away_team_id: pairs[i].away.id,
            });
        } else {
            bracket.push({
                match_id: i.toString(),
                game_number: i,
                home_team_id: '',
                away_team_id: '',
            });
        }
    }

    return JSON.stringify(bracket);
}
