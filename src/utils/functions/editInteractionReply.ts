import { CommandInteraction } from 'discord.js';

const editInteractionReply = (interaction: CommandInteraction, newMsgInfoObj: Object | string) => interaction.editReply(newMsgInfoObj);
export default editInteractionReply;