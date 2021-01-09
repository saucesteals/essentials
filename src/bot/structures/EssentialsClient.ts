import { CommandoClient, CommandoClientOptions } from "discord.js-commando";
import axios, { AxiosInstance } from 'axios'

export default class Essentials extends CommandoClient {
  readonly http: AxiosInstance

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
    
    this.http = axios.create({
      validateStatus: null,
      headers: {
        'user-agent':'EssentialsBot/1.0; +https://github.com/saucesteals/essentials/)'
      }
    })


  }
}
