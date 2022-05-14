import getGamesOnDay from './_getGamesOnDay';

export default (leagueId, momentTomorrow) => {
    return getGamesOnDay(leagueId, momentTomorrow);
}