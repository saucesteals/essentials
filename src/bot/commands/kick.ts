import { CommandoMessage } from "discord.js-commando";
import Essentials from "../structures/EssentialsClient";
import EssentialsCommand from "../structures/EssentialsCommand";
import { GuildMember, Message } from 'discord.js'
import EssentialsEmbed from "../structures/EssentialsEmbed";
import { errorEmoji, successEmoji } from "../utils/emojis";

export default class Kick extends EssentialsCommand {
  constructor(client: Essentials) {
    super(client, {
      name: "kick",
      memberName: "kick",
      group: "mod",
      guildOnly: true,
      description: "Kick a member",
      clientPermissions: ['KICK_MEMBERS'],
      userPermissions: ['KICK_MEMBERS'],
      args: [
        {
          key: "member",
          prompt: "Who would you like to kick?",
          type: "member"
        },
      ],
    });
  }

  public async run(message: CommandoMessage, { member }: {member:GuildMember}): Promise<Message | Message[]> {

    const embed = new EssentialsEmbed()

    if (message.author.equals(member.user)) {
        embed.isError()
        .setClientAsFooter(this.client)
        .setDescription(`${errorEmoji} You can't kick yourself!`)

    } else if (member.hasPermission('ADMINISTRATOR')) {
        embed.isError()
        .setClientAsFooter(this.client)
        .setDescription(`${errorEmoji} That user is an administrator, I can't do that.`)

    } else if (!member.kickable) {
        embed.isError()
        .setClientAsFooter(this.client)
        .setDescription(`${errorEmoji} I don't have permissions to kick that user!`)

    } else {

        member.kick()

        embed.isSuccess()
        .setClientAsFooter(this.client)
        .setDescription(`${successEmoji} Successfully kicked ${member.user.username}#${member.user.discriminator}!`)

    }

    return message.say({content:message.author.toString(), embed:embed})
  }
}

