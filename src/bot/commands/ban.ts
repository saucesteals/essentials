import { CommandoMessage } from "discord.js-commando";
import Essentials from "../structures/EssentialsClient";
import EssentialsCommand from "../structures/EssentialsCommand";
import { GuildMember, Message } from 'discord.js'
import EssentialsEmbed from "../structures/EssentialsEmbed";
import { errorEmoji, successEmoji } from "../utils/emojis";

export default class Ban extends EssentialsCommand {
  constructor(client: Essentials) {
    super(client, {
      name: "ban",
      memberName: "ban",
      group: "mod",
      guildOnly: true,
      description: "Ban a member",
      clientPermissions: ['BAN_MEMBERS'],
      userPermissions: ['BAN_MEMBERS'],
      args: [
        {
          key: "member",
          prompt: "Who would you like to ban?",
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
        .setDescription(`${errorEmoji} You can't ban yourself!`)

    } else if (member.hasPermission('ADMINISTRATOR')) {
        embed.isError()
        .setClientAsFooter(this.client)
        .setDescription(`${errorEmoji} That user is an administrator, I can't do that.`)

    } else if (!member.bannable) {
        embed.isError()
        .setClientAsFooter(this.client)
        .setDescription(`${errorEmoji} I don't have permissions to ban that user!`)

    } else {

        member.ban()

        embed.isSuccess()
        .setClientAsFooter(this.client)
        .setDescription(`${successEmoji} Successfully banned ${member.user.username}#${member.user.discriminator}!`)

    }

    return message.say({content:message.author.toString(), embed:embed})
  }
}

