import { MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { anyClient } from "../types";
import { errorColor, successColor } from "../utils/colors";

export default class EssentialsEmbed extends MessageEmbed {
  constructor(data?: MessageEmbed | EssentialsEmbed | MessageEmbedOptions | undefined) {
    super(data);
  }

  public isSuccess(): EssentialsEmbed {
    return this.setColor(successColor);
  }

  public isError(): EssentialsEmbed {
    return this.setColor(errorColor);
  }

  public setUserAsAuthor(user: User): EssentialsEmbed {
    return this.setAuthor(
      user.username + "#" + user.discriminator,
      user.avatarURL({ format: "png" }) || undefined
    );
  }

  public setClientAsFooter(client: anyClient): EssentialsEmbed {
    return this.setFooter(
      client.user?.username,
      client.user?.avatarURL({ format: "png" }) || undefined
    );
  }
}
