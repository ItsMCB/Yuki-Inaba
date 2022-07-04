import { Message } from "discord.js";
import { Command } from "./interfaces/command";

export class FullContext {
    
    private message: Message
    private command: Command
    
    public constructor(message: Message, command: Command) {
        this.message = message;
        this.command = command;
    }

    public getMessageAuthorTag(): string {
        return this.message.author.tag;
    }

    public getCommand(): Command {
        return this.command;
    }

    public getCommandName(): string {
        return this.command.name;
    }

    public getCommandUsage(): string[] {
        return this.command.aliases;
    }
}