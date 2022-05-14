import { CommandInteraction } from 'discord.js';
import { TODAY, TOMORROW } from '../../../constants/commands/games';
import editInteractionReply from '../../../functions/editInteractionReply';
import getGamesToday from './getGamesToday';
import getGamesTomorrow from './getGamesTomorrow';
import { MOMENT_LONDON_TIMEZONE } from '../../../utils/moment';

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

const handleGamesToday = async (interaction: CommandInteraction, leagueId) => {
    const gamesToday = await getGamesToday(leagueId, MOMENT_LONDON_TIMEZONE());
    if (!gamesToday)
        return editInteractionReply(interaction, `No games found for: ${MOMENT_LONDON_TIMEZONE().format('DD/MM/YYYY')}`);
    return editInteractionReply(interaction, gamesToday);
};

const handleGamesTomorrow = async (interaction, leagueId) => {
    const momentTomorrow = MOMENT_LONDON_TIMEZONE().add(1, 'day');
    const gamesTomorrow = await getGamesTomorrow(leagueId, momentTomorrow);
    if (!gamesTomorrow)
        return editInteractionReply(interaction, `No games found for: ${momentTomorrow.format('DD/MM/YYYY')}`);
    return editInteractionReply(interaction, gamesTomorrow);
};