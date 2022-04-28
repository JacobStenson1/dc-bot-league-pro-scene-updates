import leagues from '../../api/leagues';
import editInteractionReply from '../../functions/editInteractionReply';

export default async (interaction) => {
    const allLeagues = await leagues();

    console.log('allGames');
    console.log(allLeagues);

    allLeagues.data.leagues.length = 5;

    return editInteractionReply(interaction, JSON.stringify(allLeagues.data.leagues));
};