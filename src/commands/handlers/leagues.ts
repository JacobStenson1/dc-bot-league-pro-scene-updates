import leagues from '../../api/leagues';
import editInteractionReply from '../../functions/editInteractionReply';
import { ButtonInteraction, CommandInteraction, MessageActionRow, MessageButton, MessageEmbed } from 'discord.js';
import embedPaginator from '../../utils/classes/embedPaginator';
import {
    leaguesNextPage,
    leaguesPreviousPage
} from '../../constants/buttons/pagination';

export default async (interaction: CommandInteraction) => {
    const allLeagues = await leagues();

    allLeagues.data.leagues.length = 5;

    const {MessageEmbed, MessageButton} = require('discord.js');
    const embed1 = new MessageEmbed()
        .setTitle('First Page')
        .setDescription('This is the first page');

    const embed2 = new MessageEmbed()
        .setTitle('Second Page')
        .setDescription('This is the second page');

    const previousPageButton = new MessageButton()
        .setCustomId(leaguesPreviousPage)
        .setLabel('Previous')
        .setStyle('DANGER');

    const nextPageButton = new MessageButton()
        .setCustomId(leaguesNextPage)
        .setLabel('Next')
        .setStyle('SUCCESS');

// Create an array of embeds
    const pages = [
        embed1,
        embed2,
        //....
        //embedN
    ];

//create an array of buttons

    const buttonList = [
        previousPageButton,
        nextPageButton
    ];


// Call the paginationEmbed method, first three arguments are required
// timeout is the time till the reaction collectors are active, after this you can't change pages (in ms), defaults to 120000
    await embedPaginator(interaction, pages, buttonList);


    let leaguesString = 'League pro scene leagues: \n';
    for (const league of allLeagues.data.leagues) {
        leaguesString +=
            `Name: ${league.name}\n` +
            `Region: ${league.region}\n` +
            `Id: ${league.id}\n` +
            `\n`;
    }

    return await editInteractionReply(interaction, leaguesString);
};

export const leaguesPaginationHandler = async (interaction: ButtonInteraction) => {
    // await interaction.deferUpdate();
    // await interaction.editReply({
    //     embeds: [pages[page].setFooter({ text: `Page ${page + 1} / ${pages.length}` })],
    //     components: [row],
    // });

    const embed2 = new MessageEmbed()
        .setTitle('Second Page')
        .setDescription('This is the second page');

    const previousPageButton = new MessageButton()
        .setCustomId(leaguesPreviousPage)
        .setLabel('Previous')
        .setStyle('DANGER');

    const nextPageButton = new MessageButton()
        .setCustomId(leaguesNextPage)
        .setLabel('Next')
        .setStyle('SUCCESS');

    const buttonList = [
        previousPageButton,
        nextPageButton
    ];

    // await interaction.deferReply();

    await interaction.reply({
        embeds: [embed2],
        components: [new MessageActionRow().addComponents(buttonList)]
    });


    return interaction;
}