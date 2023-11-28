import dotenv from 'dotenv'
dotenv.config()

import { Client, GatewayIntentBits } from 'discord.js';
import OpenAI from 'openai';

const client = new Client ({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
    ]
})

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
})

client.login(process.env.DISCORD_KEY);

client.on("messageCreate", async (message) => {
    console.log(message.content);

    const userInput = message.content;
    if (!message.author.bot){
const aiResponse = await openai.chat.completions.create({
    messages: [{role: "user", content: userInput}],
    model: "gpt-3.5-turbo"
}) 

        client.channels.cache.get(message.channelId).send(aiResponse.choices[0].message.content)
    }
});