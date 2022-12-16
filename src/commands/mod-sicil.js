const { MessageEmbed } = require('discord.js');
const config = require('../../src/Settings/Config.json');
const db = require('quick.db')

exports.run = async(client, message, args) => {

    if(![config.Yetkili.regY].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Yetki Yetersiz!**")
    let embed = new MessageEmbed().setTitle(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#fffff").setTimestamp(); 

    let member = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    let data = db.get(`moderasyon.${member.id}.${message.guild.id}`) || [];
    
    let sicil = data.length > 0 ? data.map((value, index) => `\`${index+1}.\`${client.users.cache.get(value.Yetkili) || value.Yetkili} tarafından [**${value.Sebep}**] sebebiyle cezalandırılmış.  `).join("\n") : "Bu Üyenin Ceza Bilgisi Bulunamadı."

    const embed2 = embed.setDescription(`${sicil}`);
    message.channel.send(embed2)

}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'sicil',
}