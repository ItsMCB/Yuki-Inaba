import { RunFunction } from "../interfaces/command";
import { Bot } from "../client/client";
import { Message } from "discord.js";
import { FullContext } from "../fullContext";

export const run: RunFunction = async(client, message) => {
    const context: FullContext = new FullContext(message,this);
    const msg: Message = await message.channel.send("Pinging...");
    msg.edit(client.zeroWidthSpace);
    msg.edit(client.singleEmbed(context, {
        description: "Websocket Ping: " + client.ws.ping
    }));
    message.channel.send(client.usage(context))
}

export const name: string = "ping";

export const aliases: string[] = ["pong"];

export const guildOnly: boolean = true

export const usage: string[] = ["about","server <IP>"]