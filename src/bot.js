import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import registerEvents from './events/messageHandler.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

registerEvents(client);

client.login(process.env.TOKEN);
