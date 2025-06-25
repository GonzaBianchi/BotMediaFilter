import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('neeko')
  .setDescription('Envía un mensaje como si fuera Neeko (solo admins)')
  .addStringOption(option =>
    option.setName('mensaje')
      .setDescription('El mensaje a enviar (usa \\n para saltos de línea)')
      .setRequired(true)
  )
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

export async function execute(interaction) {
  // Solo admins pueden usarlo (por seguridad extra)
  if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
    await interaction.reply({ content: 'Solo los administradores pueden usar este comando.', ephemeral: true });
    return;
  }
  let mensaje = interaction.options.getString('mensaje');
  mensaje = mensaje.replace(/\\n/g, '\n'); // Soporta \n como salto de línea

  // Responde primero al usuario para evitar timeout
  await interaction.reply({ content: 'Mensaje enviado como Neeko.', ephemeral: true });

  // Luego envía el mensaje al canal
  await interaction.channel.send(mensaje);
}
