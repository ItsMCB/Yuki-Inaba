import { RunFunction } from "../interfaces/event";
import { Command } from "../interfaces/command";
import { Message } from "discord.js";
import { Bot } from "../client/client";
import { FullContext } from "../fullContext";

export const run: RunFunction = async(client: Bot, message: Message) => {
    const prefix: string = "yuki";

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args: string[] = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName: string = args.shift().toLowerCase();
    const command: Command = client.commands.get(commandName)
    || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) { return; }

    if (command.guildOnly && message.guild === null) {
        let msg: Message = await message.channel.send(client.singleEmbed(new FullContext(message,command),{ description: "I can't execute that command inside direct messages!"}));
        setTimeout(() => {
            msg.delete();
        }, 3000);
        return;
    }
    command
    .run(client, message, args)
    .catch((error: any) => message.channel.send("An error has occured @_@") && console.log(error))
}

export const name: string = "message";