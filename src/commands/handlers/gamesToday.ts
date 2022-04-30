import editInteractionReply from '../../functions/editInteractionReply';
import { getAllGamesForLeague } from '../../api/games';
import { CommandInteraction } from 'discord.js';
import getItemsToday from '../../utils/functions/getItemsToday';
import { ScheduleGame } from '../../utils/types/interfaces/scheduleGame';
import moment from 'moment';

export default async (interaction: CommandInteraction) => {

    const leagueId = interaction.options.getString('league');

    if (!leagueId) return await editInteractionReply(interaction, 'Please provide a league ID.');

    const leagueGames = await getAllGamesForLeague(leagueId);

    // Get the games today, must use "as ScheduleGame[]" as function is a util function and wont return the correct type
    const gamesToday = getItemsToday(leagueGames.data.schedule.events, 'startTime') as ScheduleGame[];

    let gamesTodayString = `League pro games today for League ID: ${leagueId}:\n\n`;
    for (const game of gamesToday) {
        console.log(game);
        gamesTodayString +=
            `Start time: ${moment(game.startTime).format('DD/MM/YYYY HH:mm')}\n` +
            `League: ${game.league.name}\n`+
            `Teams: ${game?.match?.teams?.map((team) => team.name).join(' & ') ?? '?Found no teams?'}\n`+
            `\n`
    }

    return editInteractionReply(interaction, gamesTodayString);
}