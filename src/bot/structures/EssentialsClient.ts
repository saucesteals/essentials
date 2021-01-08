import { CommandoClient, CommandoClientOptions } from "discord.js-commando";
import EmbedHelper from "../utils/EmbedHelper";

export default class Essentials extends CommandoClient {
  public embedHelper: EmbedHelper;

  constructor(config: CommandoClientOptions, commandDir: string) {
    super(config);

    this.registry
      .registerDefaultTypes()
      .registerDefaultGroups()
      .registerDefaultCommands({ unknownCommand: false })
      .registerCommandsIn({
        filter: /^([^.].*)\.(js|ts)$/,
        dirname: commandDir,
      });

    this.on("ready", () => {
      console.log(`Ready as ${this.user?.username}`);
    });

    this.embedHelper = new EmbedHelper(this);
  }
}
