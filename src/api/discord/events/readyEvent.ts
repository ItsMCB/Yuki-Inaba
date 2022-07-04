import { RunFunction } from "../interfaces/event";
import { Bot } from "../client/client";

export const run: RunFunction = async (client: Bot) => {
    console.log(client.user.tag + " has logged in!")
}

export const name: string = 'ready';