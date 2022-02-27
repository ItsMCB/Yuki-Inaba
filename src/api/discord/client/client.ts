import * as fs from "fs";
import { Client, MessageEmbedOptions, Message, MessageEmbed, Intents, Collection, MessageOptions, ColorResolvable, MessageEmbedFooter } from "discord.js";
import { Command } from "../interfaces/command";
import { Event } from "../interfaces/event";
import { Config } from "../interfaces/config";
import { LocaleTest } from "../interfaces/locale";
import { FullContext } from "../fullContext";

class Bot extends Client {

    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    private config: Config;
    private locale: LocaleTest;

    // Embed colors
    public colorPurple: string = "#5b497d";
    public colorBlue: string = "#3b3980";

    public zeroWidthSpace: string = "\u200b";

    public constructor() {
        super({ intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.DIRECT_MESSAGE_TYPING
        ], partials: [ "CHANNEL"] });
    }

    public async start(config: Config): Promise<void> {
        this.config = config;
        this.locale = new LocaleTest("en_US");
        this.login(this.config.token);
        // Commands
        const commandFiles: string[] = fs.readdirSync("./src/api/discord/commands");
        commandFiles.map(async(command: string) => {
            const file: Command = await import(`${__dirname}/../commands/${command}`);
            this.commands.set(file.name, file);
            console.log("[COMMANDS] Loaded: " + file.name);
        });
        // Events
        const eventFiles: string[] = fs.readdirSync("./src/api/discord/events");
        eventFiles.map(async(event: string) => {
            const file: Event = await import(`${__dirname}/../events/${event}`);
            this.events.set(file.name, file);
            this.on(file.name, file.run.bind(null, this));
            console.log("[EVENTS] Loaded: " + file.name);
        });
    }

    public getLocale() {
        return this.locale;
    }
    
    public embed(context: FullContext, options: MessageEmbedOptions): MessageEmbed {
        return new MessageEmbed({
            ...options,
            color: this.colorPurple as ColorResolvable,
            footer: {
                text: this.processLocale(context, this.locale.locale.messages.embed.footer)
            }
        });
    };

    public singleEmbed(context: FullContext, options: MessageEmbedOptions, ): MessageOptions {
        return { embeds: [this.embed(context, options)] };
    }

    public usage(context: FullContext): MessageOptions {
        return this.singleEmbed(context, {
            description: this.processLocale(context, this.locale.locale.messages.replies.invalidUsage)
        })
    }

    public processLocale(context: FullContext, text: string, ) {
        let commandUsage: string = "";
        if (context.getCommand().usage) {
            context.getCommand().usage.forEach(usage => {
                commandUsage = commandUsage + "yuki " + context.getCommandName() + " " + usage + "\n";
            });
        } else {
            commandUsage = "Oops! This commands lacks a usage entry."
        }
        return text
        .replaceAll("[prefix]","yuki")
        .replaceAll("[newline]","\n")
        .replaceAll("[command.name]", context.getCommandName())
        .replaceAll("[usage]",commandUsage)
        .replaceAll("[authorTag]",context.getMessageAuthorTag())
    }
}

export { Bot } 