import { CommandoMessage } from "discord.js-commando";
import Essentials from "../structures/EssentialsClient";
import EssentialsCommand from "../structures/EssentialsCommand";
import { Message, TextChannel } from 'discord.js'
import { bolden } from '../utils/formatting'
import EssentialsEmbed from "../structures/EssentialsEmbed";

export default class Purge extends EssentialsCommand {
  constructor(client: Essentials) {
    super(client, {
      name: "purge",
      memberName: "purge",
      group: "mod",
      guildOnly: true,
      description: "Purge messages from the channel",
      clientPermissions: ['MANAGE_MESSAGES'],
      userPermissions: ['MANAGE_MESSAGES'],
      args: [
        {
          key: "amount",
          prompt: "How many messages would you like to purge?",
          type: "integer"
        },
      ],
    });
  }

  public async run(message: CommandoMessage, { amount }: {amount:number}): Promise<Message | Message[]> {

    (<TextChannel>message.channel).bulkDelete(amount+1)

    const embed = new EssentialsEmbed()
    .isSuccess()
    .setClientAsFooter(this.client)
    .setUserAsAuthor(message.author)
    .setDescription(`Purged ${bolden(amount.toString())} messages!`)

    const reply = <Message> await message.say({content:message.author.toString(), embed:embed})

    reply.delete({timeout:5 * 1000})

    return reply

  }
}

