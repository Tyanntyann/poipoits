
import fs from "fs"
import { Client, Message } from "discord.js"
const token = process.env['token']
const prefix="poi"
const client = new Client({
    intents: Object.values(65531).filter(Number.isInteger),
});
export type commandHandler = {
    name: string,
    description: string,
    aliases:string[],
    exec: (message: Message, args: string[]) => void
}
const commandHandlers: Array<commandHandler> = [];

fs.readdirSync("./commands", { withFileTypes: true }).filter(dirent => dirent.isFile())
    .forEach(a => {
        const cmd: commandHandler = require(`./commands/${a.name.split(".")[0]}.js`).cmd
        commandHandlers.push(cmd)
    })


client.on("ready", () => {
    console.log(`${client.user?.tag}としてログインしました`)
})

client.on("messageCreate", (message) => {
    const args = message.content.split(/ |　/)
    const command=args.shift()??""    
    if(!command.startsWith("poi")){
        return
    }
    commandHandlers.find(a=>a.aliases.includes(prefix+command)||a.name==prefix+command)
    ?.exec(message as Message,args)
})

client.login(token)