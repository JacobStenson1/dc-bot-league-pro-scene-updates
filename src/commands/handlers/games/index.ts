import { CommandInteraction } from 'discord.js';
import { TODAY, TOMORROW } from '../../../constants/commands/games';
import editInteractionReply from '../../../functions/editInteractionReply';
import getGamesToday from './getGamesToday';
import getGamesTomorrow from './getGamesTomorrow';

export default async (interaction: CommandInteraction) => {
    const dayToReturn = interaction.options.getString('day_to_return');
    const leagueId = interaction.options.getString('league_id');

    switch (dayToReturn) {
        case TODAY:
            return await handleGamesToday(interaction, leagueId);
        case TOMORROW:
            return await handleGamesTomorrow(interaction, leagueId);
        default:
            console.log('Not valid. Need to enter today or tomorrow');
            return await editInteractionReply(interaction, `Please enter either: ${TODAY} or ${TOMORROW}`);
    }
}

const handleGamesToday = (interaction: CommandInteraction, leagueId) => {
    const gamesToday = getGamesToday(leagueId);
    return editInteractionReply(interaction, gamesToday);
};

const handleGamesTomorrow = async (interaction, leagueId) => {
    const gamesTomorrow = await getGamesTomorrow(leagueId);
    return editInteractionReply(interaction, gamesTomorrow);
};