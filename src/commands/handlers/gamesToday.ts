import editInteractionReply from '../../functions/editInteractionReply';
import { getAllGamesForLeague } from '../../api/games';
import { CommandInteraction } from 'discord.js';
import getItemsToday from '../../utils/getItemsToday';

export default async (interaction: CommandInteraction) => {

    const leagueId = interaction.options.getString('league');

    if (!leagueId) return await editInteractionReply(interaction, 'Please provide a league ID.');

    const leagueGames = await getAllGamesForLeague(leagueId);

    console.log("leagueGames");
    console.log(leagueGames);

    const gamesToday = getItemsToday(leagueGames.data.schedule.events, 'startTime')

    console.log("gamesToday");
    console.log(gamesToday);

    return editInteractionReply(interaction, JSON.stringify(gamesToday));
}