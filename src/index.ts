import { Config } from "./api/discord/interfaces/config";
import { Bot } from "./api/discord/client/client";
import 'dotenv/config'

const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
    console.log("Please create a .env file and add DISCORD_BOT_TOKEN=\"<TOKEN HERE>\"");
    process.exit(1);
}

new Bot().start({token: process.env.DISCORD_BOT_TOKEN});