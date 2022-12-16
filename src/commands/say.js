const { MessageEmbed } = require('discord.js');
const settings = require('../../src/Settings/Settings.json');
const config = require('../../src/Settings/Config.json');
const db = require('quick.db');

exports.run = async(client, message, args) => {

    if(![config.Yetkili.regY].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Yetki Yetersiz!**")


    const taglı = message.guild.members.cache.filter(r => r.user.username.includes(settings.tag)).size
    const toplam = message.guild.memberCount
    const ses = message.guild.channels.cache.filter(channel => channel.type == 'voice').map(channel => channel.members.size).reduce((a,b) => a + b)

    message.channel.send(new MessageEmbed()
    .setColor("#ffffff")
    .setDescription(`
    \`•\` Sunucumuda **${toplam}** adet üye var.
    \`•\` Şu anda toplam **${ses}** kişi seslide.
`)
    );
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'say',
}


  