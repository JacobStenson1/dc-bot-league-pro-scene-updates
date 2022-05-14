import getGamesOnDay from './_getGamesOnDay';

export default (leagueId, momentToday) => {
    return getGamesOnDay(leagueId, momentToday);
}