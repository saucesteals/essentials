import Essentials from './bot/structures/EssentialsClient'
import path from 'path'
require("dotenv").config();

const config = {
  commandPrefix: process.env.BOT_PREFIX,
  owner: process.env.OWNER_ID,
  invite: process.env.DISCORD_INVITE,
}

const bot = new Essentials(config, path.join(__dirname, "bot", "commands"))

bot.login(process.env.BOT_TOKEN)