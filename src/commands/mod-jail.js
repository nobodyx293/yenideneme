const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const settings = require('../../src/Settings/Settings.json');
const config = require('../../src/Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

exports.run = async(client, message, args) => {

    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('RED').setFooter(settings.Footer)
       if(![config.Yetkili.jailY].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Yetki Yetersiz!**")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(yanlis.setDescription('**Bir kullanıcı belirtmelisin!**')).then(x => x.delete({timeout: 5000}))
    let sebep = args.splice(1).join(" ") || `Sebep girilmemiş.`
    if(!sebep) return message.channel.send(yanlis.setDescription('Bir sebep belirtmen gerekiyor.')).then(x => x.delete({timeout: 5000}))

    

    let cezaID = db.get(`cezaid.${message.guild.id}`)+1
    db.add(`cezaid.${message.guild.id}`, +1);
    db.push(`moderasyon.${member.id}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: member.id ,ID: cezaID, Komut: 'JAİL',  Sebep: sebep,})
    db.set(`moderasyon.${cezaID}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: member.id ,ID: cezaID, Komut: 'JAİL',  Sebep: sebep,})
    db.set(`cezalı.${member.id}.${message.guild.id}`, 'cezalı')

member.roles.set([config.roller.Jailrol])
        message.channel.send((`**${member} (\`${member.id}\`) adlı kullanıcı "**${sebep}**" sebebiyle jail'e atıldı!**`))
        const jail = new Discord.MessageEmbed()
            .setColor("#ffffff")
            .setTimestamp()
            .setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))
            .setDescription(`
       **   ${member} adlı kullanıcı karantinaya atıldı!**
    
    **• Yetkili:** ${message.author} (\`${message.author.id}\`)
    **• Kullanıcı:** ${member} (\`${member.id}\`)
    
    **• Sebep:** \`${sebep}\`
            `);
    client.channels.cache.get(config.Log.JailLog).send(jail)
  
    }
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'jail',
}