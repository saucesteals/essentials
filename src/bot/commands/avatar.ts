import { CommandoMessage } from "discord.js-commando";
import Essentials from "../structures/EssentialsClient";
import EssentialsCommand from "../structures/EssentialsCommand";
import { GuildMember, User, Message } from 'discord.js'

export default class Avatar extends EssentialsCommand {
  constructor(client: Essentials) {
    super(client, {
      name: "avatar",
      memberName: "avatar",
      aliases: ["av"],
      group: "util",
      description: "Get a member's avatar",
      args: [
        {
          key: "member",
          prompt: "Who's avatar would you like to see?",
          type: "member",
          default: "undefined"
        },
      ],
    });
  }

  public async run(message: CommandoMessage, { member }: {member:GuildMember | string}): Promise<Message | Message[]> {
    const embed = this.client.helper.successEmbed();
    const user = typeof member != "string" ? member.user : message.author;


    embed.setTitle(user.username + "#" + user.discriminator)
    .setImage(user.avatarURL({size:4096}) || user.defaultAvatarURL);

    return message.say({content:message.author.toString(), embed:embed})

  }
}

