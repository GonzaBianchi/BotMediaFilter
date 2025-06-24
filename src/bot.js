import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';
import registerEvents from './events/messageHandler.js';
import fs from 'fs';
import path from 'path';
import { REST, Routes } from 'discord.js';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

// Cargar comandos slash
const commands = [];
const commandsPath = path.join(process.cwd(), 'src', 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js') && file !== 'index.js');
for (const file of commandFiles) {
  const command = await import(`../commands/${file}`);
  if (command.data && command.execute) {
    commands.push(command.data.toJSON());
    client.commands = client.commands || new Map();
    client.commands.set(command.data.name, command);
  }
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

try {
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );
  console.log('Comandos de barra registrados.');
} catch (error) {
  console.error(error);
}

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  const command = client.commands?.get(interaction.commandName);
  if (!command) return;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Error al ejecutar el comando.', ephemeral: true });
  }
});

registerEvents(client);

client.login(process.env.TOKEN);
