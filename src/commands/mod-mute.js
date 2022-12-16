const { MessageEmbed } = require('discord.js');//kod alıntı agalarım
const settings = require('../../src/Settings/Settings.json');
const config = require('../../src/Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const db = require('quick.db');

exports.run = async(client, message, args) => {
    let yanlis = new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setColor('#ffffff').setFooter(settings.Footer)
    if(![config.Yetkili.muteY].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("**Yetki Yetersiz!**")
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!member) return message.channel.send(yanlis.setDescription('**Bir kullanıcı belirtmelisin!**')).then(x => x.delete({timeout: 5000}))
    let zaman = args[1]
    if(!zaman) return message.channel.send(yanlis.setDescription(`**Bir zaman belirtmelisin!**`)).then(x => x.delete({timeout: 5000}))
    let sebep = args.splice(2).join(" ")
    if(!sebep) return message.channel.send(yanlis.setDescription('**Bir sebeb belirtmelisin!**')).then(x => x.delete({timeout: 5000}))
    
    let timereplace = args[1];
    let time = timereplace.replace(/y/, ' Yıl').replace(/d/, ' Gün').replace(/s/, ' Saniye').replace(/m/, ' Dakika').replace(/h/, ' Saat')
    var tarih = new Date(Date.now())
    var tarih2 = ms(timereplace)
    var tarih3 = Date.now() + tarih2
    let atılmaay = moment(Date.now()).format("MM")
    let atılmagün = moment(Date.now()).format("DD")
    let atılmasaat = moment(Date.now()).format("HH:mm:ss")
    let bitişay = moment(tarih3).format("MM")
    let bitişgün = moment(tarih3).format("DD")
    let bitişsaat = moment(tarih3).format("HH:mm:ss")
    let muteatılma = `\`${atılmagün} ${atılmaay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${atılmasaat}\``
    let mutebitiş = `\`${bitişgün} ${bitişay.replace(/01/, 'Ocak').replace(/02/, 'Şubat').replace(/03/, 'Mart').replace(/04/, 'Nisan').replace(/05/, 'Mayıs').replace(/06/, 'Haziran').replace(/07/, 'Temmuz').replace(/08/, 'Ağustos').replace(/09/, 'Eylül').replace(/10/, 'Ekim').replace(/11/, 'Kasım').replace(/12/, 'Aralık')} ${bitişsaat}\``
    moment.locale("tr")

    let cezaID = db.get(`cezaid.${message.guild.id}`)+1
    await db.add(`cezaid.${message.guild.id}`, +1);
    await db.push(`moderasyon.${member.id}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: member.id ,ID: cezaID, Komut: 'Mute', Tarih: muteatılma, Sebep: sebep, Süre: time})
    await db.set(`moderasyon.${cezaID}.${message.guild.id}`, { Yetkili: message.author.id,Cezalı: member.id ,ID: cezaID, Komut: 'Mute', Tarih: muteatılma, Sebep: sebep, Süre: time})

    await db.set(`muteli.${member.id}.${message.guild.id}`, 'muteli')
    await db.set(`süre.${member.id}.${message.guild.id}`, zaman)

    let mute = new MessageEmbed()
    .setColor("#ffffff")
    .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    .setDescription(`
    **${member} (\`${member.id}\`) adlı kullanıcı metin kanallarında susturuldu!** 
    
    **• Yetkili:** ${message.author} (\`${message.author.id}\`)
   ** • Cezalı:** ${member} (\`${member.id}\`)
    **• Süre:** \`${zaman}\`
    **• Mute Atılma:** \`${muteatılma}\`
    **• Mute Bitiş:** \`${mutebitiş}\`
    
    **• Sebep:** \`${sebep}\`
    `)
    client.channels.cache.get(config.Log.MuteLog).send(mute)
    await member.roles.add(config.roller.Muterol)
    message.channel.send(yanlis.setDescription(`**${member} (\`${member.id}\`) adlı kullanıcı metin kanallarında susturuldu!**`))
    

    setTimeout(async() => {
        let muteli = db.fetch(`muteli.${member.id}.${message.guild.id}`)
        if(!muteli) return;
        if(muteli == 'muteli') {
            client.channels.cache.get(config.Log.MuteLog).send(new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#ffffff").setDescription(`
           ** ${member} (\`${member.id}\`) adlı kullanıcı metin kanallarında susturulması bitti! **
            
            **• Yetkili:** ${message.author} (\`${message.author.id}\`)
            **• Cezalı:** ${member} (\`${member.id}\`)
            **• Süre:** \`${zaman}\`
            **• Mute Atılma:** \`${muteatılma}\`
            **• Mute Bitiş:** \`${mutebitiş}\`
        
            **• Sebep:** \`${sebep}\`
            `))
            await db.delete(`muteli.${member.id}.${message.guild.id}`)
            await db.delete(`süre.${member.id}.${message.author.id}`)
          await member.roles.remove(config.roller.Muterol)
            
        }
    }, ms(zaman));
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'mute',
}
