# Discord Multimedia Forwarder Bot

Este bot de Discord, hecho con Node.js, Express y discord.js, reenvía mensajes con multimedia (links, imágenes, videos, gifs, etc.) de canales específicos a un canal destino.

## Estructura
- `src/bot.js`: Inicializa el bot de Discord.
- `src/server.js`: Servidor Express opcional.
- `src/commands/`: Carpeta para comandos personalizados.
- `src/events/`: Manejadores de eventos de Discord.
- `src/utils/`: Utilidades como filtros de multimedia.

## Configuración
1. Renombra `.env` y coloca tu token de Discord y puerto.
2. En `src/events/messageHandler.js`, configura los IDs de canales origen y destino.
3. Instala dependencias:
   ```sh
   npm install
   ```
4. Inicia el bot:
   ```sh
   npm start
   ```

## Notas
- Sigue las buenas prácticas de discord.js para modularidad y escalabilidad.
- Puedes agregar comandos y eventos personalizados en sus respectivas carpetas.
