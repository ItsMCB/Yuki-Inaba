import { RunFunction } from "../interfaces/command";
import { Bot } from "../client/client";
import { Message } from "discord.js";
import { FullContext } from "../fullContext";
import { flip } from "../../coin";

export const run: RunFunction = async(client, message) => {
    const context = new FullContext(message, this);
    const msg: Message = await message.channel.send("https://tenor.com/view/coin-toss-coin-toss-gif-5017733");
    setTimeout(() => {
        msg.edit(client.processLocale(context, client.getLocale().locale.messages.replies.flippingFinished))
        msg.edit(client.singleEmbed(context, {
            description: flip()
        }));
    }, 900);
}

export const name: string = "flip";

export const guildOnly: boolean = true