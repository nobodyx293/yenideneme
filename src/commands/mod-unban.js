const { MessageEmbed, DiscordAPIError } = require('discord.js');
const settings = require('../../src/Settings/Settings.json');
const config = require('../../src/Settings/Config.json');
const moment = require('moment');

exports.run = async(client, message, args) => {
    let embed = new MessageEmbed().setColor("#fffff").setTimestamp();
    if(![config.Yetkili.banY].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR'))return message.channel.send("**Yetki Yetersiz!**")

    let member = args[0]
    if(!member) return message.channel.send(embed.setDescription(`**Doğru Bir İd Belirt!`)).then(x => x.delete({timeout: 5000}))
   message.guild.fetchBans().then(yasaklar => {
    if(yasaklar.size == 0) return message.channel.send(embed.setDescription(`**Sunucuda Banlı Üye Yok!**`)).then(x => x.delete({timeout: 5000}))
    let banliüye= yasaklar.find(yasakli => yasakli.user.id == member)
    if(!banliüye) return message.channel.send(embed.setDescription(`**Üye Sunucuda Yasaklı Görünmüyor!**`)).then(x => x.delete({timeout: 5000}))
})


    const unban = embed.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#ffffff").setDescription(`
    **<@!${member}> adlı kullanıcının sunucuda yasağı kaldırıldı!**
    
    **• Yetkili:** ${message.author}(\`${message.author.id}\`)
    **• Kullanıcı:** <@${member}>(\`${member.id}\`)
    `)
    await message.channel.send(new MessageEmbed().setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`**<@${member}> (\`${member.id}\`) adlı kullanıcının yasağı kaldırıldı!**`))
    await client.channels.cache.get(config.Log.BanLog).send(unban);
    await message.guild.members.unban(member)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'unban',
}