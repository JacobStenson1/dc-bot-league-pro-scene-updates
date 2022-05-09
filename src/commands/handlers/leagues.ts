import leagues from '../../apis/proSceneApi/leagues';
import editInteractionReply from '../../utils/functions/editInteractionReply';
import { CommandInteraction } from 'discord.js';

export default async (interaction: CommandInteraction) => {
    const allLeagues = await leagues();

    allLeagues.data.leagues.length = 5;

    let leaguesString = 'League pro scene leagues: \n';
    for (const league of allLeagues.data.leagues) {
        leaguesString +=
            `Name: ${league.name}\n` +
            `Region: ${league.region}\n`+
            `Id: ${league.id}\n`+
            `\n`
    }

    return await editInteractionReply(interaction, leaguesString);
};