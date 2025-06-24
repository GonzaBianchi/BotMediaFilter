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
        // Menciona correctamente al usuario
        const authorMention = `<@${message.author.id}>`;
        let content = `**Enviado por:** ${authorMention}`;
        if (message.content) content += `\n${message.content}`;
        await targetChannel.send({
          content,
          files: message.attachments.map(a => a.url)
        });
      }
    }
  });
};
