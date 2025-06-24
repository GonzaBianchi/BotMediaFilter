import { Events } from 'discord.js';
import filterMedia from '../utils/mediaFilter.js';

// Configura aquí los IDs de los canales origen y destino
const SOURCE_CHANNELS = [
  '752883098059800650', // chat general
  '1248474578372788244' // general lol
];
const TARGET_CHANNEL = '1369911906277789727';

export default (client) => {
  client.on(Events.MessageCreate, async (message) => {
    if (
      message.author.bot ||
      !SOURCE_CHANNELS.includes(message.channel.id)
    ) return;

    if (filterMedia(message)) {
      const targetChannel = await client.channels.fetch(TARGET_CHANNEL);
      if (targetChannel) {
        targetChannel.send({ content: message.content, files: message.attachments.map(a => a.url) });
      }
    }
  });
};
