import editInteractionReply from '../../utils/functions/editInteractionReply';
import { getAllGamesForLeague } from '../../apis/proSceneApi/games';
import { CommandInteraction } from 'discord.js';
import getItemsToday from '../../utils/functions/getItemsToday';
import { ScheduleGame } from '../../utils/types/interfaces/scheduleGame';
// import moment from 'moment';
import momentTz from 'moment-timezone';

export default async (interaction: CommandInteraction) => {

    const leagueId = interaction.options.getString('league');

    if (!leagueId) return await editInteractionReply(interaction, 'Please provide a league ID.');

    const leagueGames = await getAllGamesForLeague(leagueId);

    // Get the games today, must use "as ScheduleGame[]" as function is a util function and wont return the correct type
    const gamesToday = getItemsToday(leagueGames.data.schedule.events, 'startTime') as ScheduleGame[];

    let gamesTodayString = `League pro games today for League ID: ${leagueId}:\n\n`;

    if (gamesToday.length === 0) {
        return editInteractionReply(interaction, gamesTodayString + 'No games today.');
    }

    for (const game of gamesToday) {
        const gameTime = momentTz.utc(game.startTime);
        const gameTimeGmtFormat = gameTime.format('DD/MM/YYYY HH:mm');
        const gameTimeBstFormat = gameTime.tz('Europe/London').format('DD/MM/YYYY HH:mm');

        gamesTodayString +=
            `Start time: ${gameTimeGmtFormat} (GMT) - ${gameTimeBstFormat} (London)\n` +
            `League: ${game.league.name}\n` +
            `Teams: ${game?.match?.teams?.map((team) => team.name).join(' & ') ?? '?Found no teams?'}\n` +
            `\n`;
    }

    return editInteractionReply(interaction, gamesTodayString);
}