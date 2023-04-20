import { commandHandler } from "..";

export const cmd:commandHandler={
    name:"ping",
    description:"ping",
    aliases:["pong"],
    exec(message, args) {
        message.reply("pong!botbotより優秀")
    },
}