import { getAllGamesForLeague } from '../../../api/games';
import { ScheduleGame } from '../../../utils/types/interfaces/scheduleGame';
import momentTz, { Moment } from 'moment-timezone';
import getItemsSpecificDate from '../../../utils/functions/getItemsSpecificDate';

export default async (leagueId, date: Moment) => {
    const leagueGames = await getAllGamesForLeague(leagueId);

    // Get the games today, must use "as ScheduleGame[]" as function is a util function and wont return the correct type
    const gamesToday = getItemsSpecificDate(leagueGames.data.schedule.events, 'startTime', date) as ScheduleGame[];

    if (gamesToday.length === 0) {
        return false;
    }

    return formatGames(leagueId, gamesToday);
}

const formatGames = (leagueId, games) => {
    let gamesTodayString = `League pro games today for League ID: ${leagueId}:\n\n`;

    for (const game of games) {
        const gameTime = momentTz.utc(game.startTime);
        const gameTimeGmtFormat = gameTime.format('DD/MM/YYYY HH:mm');
        const gameTimeBstFormat = gameTime.tz('Europe/London').format('DD/MM/YYYY HH:mm');

        gamesTodayString +=
            `Start time: ${gameTimeGmtFormat} (GMT) - ${gameTimeBstFormat} (London)\n` +
            `League: ${game.league.name}\n` +
            `Teams: ${game?.match?.teams?.map((team) => team.name).join(' & ') ?? '?Found no teams?'}\n` +
            `\n`;
    }

    return gamesTodayString;
};