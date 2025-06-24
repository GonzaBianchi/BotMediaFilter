import { Events, EmbedBuilder } from 'discord.js';
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
        const embed = new EmbedBuilder()
          .setAuthor({
            name: `${message.author.username}#${message.author.discriminator} (ID: ${message.author.id})`,
            iconURL: message.author.displayAvatarURL()
          });
        // Si hay imagen adjunta, mostrar la primera en el embed
        const firstImage = message.attachments.find(a => a.contentType && a.contentType.startsWith('image/'));
        if (firstImage) {
          embed.setImage(firstImage.url);
        }
        await targetChannel.send({
          embeds: [embed],
          // Fuera del embed, solo el contenido del mensaje y todos los archivos adjuntos
          content: message.content || '',
          files: message.attachments.map(a => a.url)
        });
      }
    }
  });
};
