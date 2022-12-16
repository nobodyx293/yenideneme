const Discord = require('discord.js');

exports.run = (client, message, args) => {
    if (!args[0]) return message.reply("Lütfen Bulduğunuz Bug'u Açıklayın Örneğin:\n`Bot Yanıt Vermiyor Veya Komut Çalışmıyor`");
    if (args[0] === "bug") return message.reply("Lütfen Bulduğunuz Bug'u Açıklayın Örneğin:\n`Bot Yanıt Vermiyor Veya Komut Çalışmıyor`");
    args = args.join(" ");
    message.reply("Bildiriminiz İçin Teşşekür Ederiz ✅ ");
    const content = `**${message.author.username}#${message.author.discriminator}** (${message.author.id}) Raporladı:\n~~--------------------------------~~\n**${args}**\n~~--------------------------------~~\nBu Serverda: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
    client.channels.cache.get("1051499147448045649").send(content)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bug',
  description: 'Reports a bug.',
  usage: 'bug <bug>'
};