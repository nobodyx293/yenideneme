const { MessageEmbed, DiscordAPIError, MessageReaction } = require('discord.js');
const config = require('../../src/Settings/Config.json');
const settings = require('../../src/Settings/Settings.json');
const moment = require('moment');
const db = require('quick.db');

exports.run = async(client, message, args) => {
    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED').setFooter(settings.Footer)
    
if(![config.Yetkili.banY].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Yetki Yetersiz!**")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(yanlis.setDescription('**Bir üye belirtmelisin!**')).then(x => x.delete({timeout: 5000}))
    let sebep = args.splice(1).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('**Bir sebeb belirtmelisin!**')).then(x => x.delete({timeout: 5000}))



    let cezaID = db.get(`cezaid.${message.guild.id}`, +1)

    db.add(`cezaid.${message.guild.id}`, +1);
    db.push(`moderasyon.${member.id}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: member.id ,ID: cezaID,Komut: 'Sunucudan Yasaklandı',  Sebep: sebep, Süre: 'BAN'})
    db.set(`moderasyon.${cezaID}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: member.id ,ID: cezaID,Komut: 'Sunucudan Yasaklandı',  Sebep: sebep, Süre: 'BAN'})

    const ban = new MessageEmbed()
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setColor('#ffffff')
    .setDescription(`
   ** ${member} adlı kullanıcı yasaklandı!**
    
    **• Yetkili:** ${message.author} (\`${message.author.id}\`)
    **• Kullanıcı:** ${member} (\`${member.id}\`)
    
    **• Sebep:** \`${sebep}\`
    `)
    message.channel.send(new MessageEmbed().setDescription(`**${member} (\`${member.id}\`) adlı kullanıcı banlandı!**`))
    client.channels.cache.get(config.Log.BanLog).send(ban)
  

    member.ban({ reason: `Luffyy Banke!`})
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'ban',
}