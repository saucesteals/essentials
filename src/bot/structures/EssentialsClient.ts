import { CommandoClient, CommandoClientOptions } from "discord.js-commando";
import Helper from "../utils/helper";

export default class Essentials extends CommandoClient {
  public helper: Helper;

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

    this.helper = new Helper(this);
  }
}
