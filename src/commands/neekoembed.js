import { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('neekoembed')
  .setDescription('Envía un embed personalizado como Neeko (solo admins)')
  .addStringOption(option =>
    option.setName('titulo')
      .setDescription('Título del embed')
      .setRequired(true)
  )
  .addStringOption(option =>
    option.setName('descripcion')
      .setDescription('Descripción del embed (usa \\n para saltos de línea, puedes usar **negrita**, *cursiva*, __subrayado__, etc.)')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
    await interaction.reply({ content: 'Solo los administradores pueden usar este comando.', ephemeral: true });
    return;
  }
  const titulo = interaction.options.getString('titulo');
  let descripcion = interaction.options.getString('descripcion');
  descripcion = descripcion.replace(/\\n/g, '\n'); // Soporta \n como salto de línea

  const embed = new EmbedBuilder()
    .setTitle(titulo)
    .setDescription(descripcion)
    .setColor(0x8e44ad) // Color violeta Neeko
    .setTimestamp();

  await interaction.reply({ content: 'Embed enviado como Neeko.', ephemeral: true });
  await interaction.channel.send({ embeds: [embed] });
}
