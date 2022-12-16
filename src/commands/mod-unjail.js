const { MessageEmbed } = require('discord.js');
const settings = require('../../src/Settings/Settings.json');
const config = require('../../src/Settings/Config.json');
const db = require('quick.db');

exports.run = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('#ffffff').setFooter(settings.Footer)
    if(![config.Yetkili.jailY].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Yetki Yetersiz!**")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(yanlis.setDescription('**Bir kullanıcı belirtmelisin!**')).then(x => x.delete({timeout: 5000}))
    let cezalı = db.fetch(`cezalı.${member.id}.${message.guild.id}`)
    if(cezalı == 'cezalı') {
    await db.delete(`cezalı.${member.id}.${message.guild.id}`)
    client.channels.cache.get(config.Log.JailLog).send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#ffffff").setDescription(` 
    **${member} adlı kullanıcı Karantinadan Çıkarıldı!**
    
    **• Yetkili:** ${message.author} (\`${message.author.id}\`)
    **• Kullanıcı:** ${member} (\`${member.id}\`)
    `))

    await member.roles.remove(config.roller.Jailrol)
    await member.roles.add(config.kayıt.unreg)
    message.channel.send(yanlis.setDescription(`**${member} (\`${member.id}\`) adlı kullanıcının jail cezası kaldırıldı!**`)).then(x => x.delete({timeout: 5000}))
    } else {
        message.channel.send(yanlis.setDescription('**Kişinin Jaili Gözükmüyor!**')).then(x => x.delete({timeout: 5000}))
    }
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'unjail',
}