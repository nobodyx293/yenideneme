const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
  try {
    const commands = new Discord.MessageEmbed()
    await message.channel.send(
      `**_Toplam Komut Sayısı:_**` +
        `\`${client.commands.size}\`` +
        `\n**Komutlar:** \n${client.commands
          .map(props => `\`${props.help.name}\``)
          .join(" | ")}`

    );
  } catch (e) {
    throw e;
  }
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["tümkomutlar", "komutlar"],
  permLevel: 2
};
module.exports.help = {
  name: "komutsayisi",
  description: "Bota eklenmiş tüm komutları listeler.",
  footer:"NobodyXD. was Here ❤️",
  usage: "all-commands"
};