import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('neeko')
  .setDescription('Envía un mensaje como si fuera Neeko (solo admins)')
  .addStringOption(option =>
    option.setName('mensaje')
      .setDescription('El mensaje a enviar (puede incluir emojis, links, etc.)')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  // Solo admins pueden usarlo (por seguridad extra)
  if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
    await interaction.reply({ content: 'Solo los administradores pueden usar este comando.', ephemeral: true });
    return;
  }
  const mensaje = interaction.options.getString('mensaje');
  await interaction.channel.send(mensaje);
  await interaction.reply({ content: 'Mensaje enviado como Neeko.', ephemeral: true });
}
