import { CommandoClient, CommandoClientOptions } from "discord.js-commando";

export default class Essentials extends CommandoClient {

  constructor(config: CommandoClientOptions, commandDir: string) {
    super(config);

    this.registry
      .registerDefaultTypes()
      .registerDefaultGroups()
      .registerGroups([
        ["mod", "Moderation"]
      ])
      .registerDefaultCommands({ unknownCommand: false })
      .registerCommandsIn({
        filter: /^([^.].*)\.(js|ts)$/,
        dirname: commandDir,
      });

    this.on("ready", () => {
      console.log(`Ready as ${this.user?.username}`);
    });
    
  }
}
