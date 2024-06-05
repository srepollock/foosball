export function GenerateTeamName() {
    const first = [
        'Red',
        'Blue',
        'Green',
        'Purple',
        'Gold',
        'Yellow',
        'Black',
        'White',
        'Orange',
        'Indigo',
        'Violet',
        'Pink',
    ];
    const last = [
        'Penguins',
        'Elephants',
        'Horses',
        'Girafees',
        'Haws',
        'Eagles',
        'Turtles',
        'Zebras',
        'Lions',
        'Bears',
        'Wolves',
        'Sparrows',
        'Salmons',
        'Coyotes',
        'Tarantulas',
        'Marlins',
        'Sperm Wales',
        'Axotles',
        'Beavers',
        'Camels',
        'Tigers',
        'Hippos',
        'Waterbuffalos',
        'Albatross',
        'Seagulls',
        'Kangaroos',
        'Wombats',
        'Flamingos',
    ];
    return (
        first[Math.floor(Math.random() * first.length)] +
        ' ' +
        last[Math.floor(Math.random() * last.length)]
    );
}

export function GenerateTournamentName() {
    const first = [
        'Roadrunner',
        'Stanley',
        'Starbucks',
        'StandardFusion',
        'Black Hole',
        'Star',
        'Vancouver',
        'Stanley Park',
    ];
    const second = [
        '',
        'Bi-Annual',
        'Semi-Annual',
        'Annual',
        'Professional',
        'Inogural',
        'First Ever',
    ];
    const last = ['Memorial', 'Memento Cup', 'Trophy', 'Cup', 'Championship'];
    return (
        first[Math.floor(Math.random() * first.length)] +
        ' ' +
        second[Math.floor(Math.random() * first.length)] +
        ' ' +
        last[Math.floor(Math.random() * last.length)]
    );
}
