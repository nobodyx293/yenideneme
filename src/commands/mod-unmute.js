const { MessageEmbed } = require('discord.js');
const settings = require('../../src/Settings/Settings.json');
const config = require('../../src/Settings/Config.json');
const db = require('quick.db');

exports.run = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor('#ffffff').setFooter(settings.Footer)
    if(![config.Yetkili.AbilityYT,config.Yetkili.muteYT].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Yetki Yetersiz!**")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(yanlis.setDescription('**Bir kullanıcı belirtmelisin!**')).then(x => x.delete({timeout: 5000}))
    
    let muteli = db.fetch(`muteli.${member.id}.${message.guild.id}`)
    if(!muteli) {
    if(muteli == 'muteli'){
    db.delete(`muteli.${member.id}.${message.guild.id}`)
    db.delete(`süre.${member.id}.${message.author.id}`)
    client.channels.cache.get(config.Log.MuteLog).send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#ffffff").setDescription(`
    **${member} adlı kullanıcın mute cezası kaldırıldı!**
    
    **• Yetkili:** ${message.author} (\`${message.author.id}\`)
    **• Kullanıcı:** ${member} (\`${member.id}\`)

    `))
    await member.roles.remove(config.roller.Muterol)
    message.channel.send(yanlis.setDescription(`**<@${member}> (\`${member.id}\`) adlı kullanıcının mute cezası kaldırıldı!**`)).then(x => x.delete({timeout: 5000}))
    }}else {
        message.channel.send(yanlis.setDescription('**Kişinin Mutesi Gözükmüyor!**')).then(x => x.delete({timeout: 2000}))
    }

}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'unmute',
}