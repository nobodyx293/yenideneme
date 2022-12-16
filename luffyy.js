const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js');
const client = new Discord.Client({ fetchAllMembers: true })
const fs = require('fs')
const setting = require('./src/Settings/Settings.json');
const config = require('./src/Settings/Config.json');
const moment = require('moment');
const ms = require('ms');
const button = require('discord-buttons')
button(client)
const db = require('quick.db');
const Activites = new Map();
const { settings } = require('cluster');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.cooldown = new Set();

const express = require("express")
const app = express()
app.get("/foo", (req, res, next) => {
    const foo = JSON.parse(req.body.jsonString)
})
process.on("unhandledRejection", (reason, promise) => {})

client.on('ready', async () => {
      client.user.setActivity("Nobody ❤️ AC-Bot", 
        { url: 'https://twitch.tv/.',
        type: 'STREAMING' }); 
});

client.on("ready", () => {
  client.channels.cache.get(settings.botses).join();   
})


const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.on("ready", () => {
client.channels.cache.get('1049442960481198262').join();
}); 

client.on('message', async (msg, member) => {
    if (msg.channel.type === "dm") return;

    if (msg.content === 'sa') {

        msg.reply('Aleyküm Selam, **Hoşgeldin Kanka <:welcome_exs:1049450846192156722>** ');
    }

    else if (msg.content === 'sea') {

        msg.reply('Aleyküm Selam, **Hoşgeldin Kanka <:welcome_exs:1049450846192156722>**');
    }


    if (msg.content === 'Sa') {

        msg.reply('Aleyküm Selam, **Hoşgeldin Kanka <:welcome_exs:1049450846192156722>** ');
    }

    else if (msg.content === 'Sea') {

        msg.reply('Aleyküm Selam, **Hoşgeldin Kanka <:welcome_exs:1049450846192156722>**');
    }



    else if (msg.content === 'hi') {

        msg.reply('Hi welcome to **Afterburners Team** Server <:AnadoluJet:979742938164764693>');
    }


    else if (msg.content === 'Hi') {

        msg.reply('Hi welcome to **Afterburners Team** Server <:AnadoluJet:979742938164764693>');
    }


    else if (msg.content === 'hey') {

        msg.reply('Hi welcome to **Afterburners Team** Server <:AnadoluJet:979742938164764693>');
    }

    else if (msg.content === 'Hey') {

        msg.reply('Hi welcome to **Afterburners Team** Server <:AnadoluJet:979742938164764693>');
    }

    if (msg.content === 'iyi geceler') {

        msg.reply('iyi geceler **dostum 🌙** ');
    }

    else if (msg.content === 'Iyi geceler') {

        msg.reply('iyi geceler **dostum 🌙**');
    }
    else if (msg.content === 'Iyi Geceler') {

        msg.reply('iyi geceler **dostum 🌙**');
    }
    else if (msg.content === 'Iyi geceler') {

        msg.reply('iyi geceler **dostum 🌙**');
    }
    else if (msg.content === 'IYI GECELER') {

        msg.reply('iyi geceler **dostum 🌙**');
    }







});



client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./src/commands/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklemeye hazırlanılıyor.`);
  files.forEach(f => {
    let props = require(`./src/commands/${f}`);
    log(`Yüklenen komut ismi: ${props.help.name.toUpperCase()}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});


client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./src/commands/${command}`)];
      let cmd = require(`./src/commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./src/commands/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./src/commands/${command}`)];
      let cmd = require(`./src/commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};


client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(setting.prefix)) return;
  let command = message.content.split(' ')[0].slice(setting.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})

client.yetkiler = message => {
  if(!message.guild) {
	return; }
  let permlvl = setting.varsayilanperm  ;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 2;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 3;
  if(message.member.hasPermission("MANAGE_GUILD")) permlvl = 4;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 5;
  if(message.author.id === message.guild.ownerID) permlvl = 6;
  if(message.author.id === setting.owner) permlvl = 7;
  return permlvl;
};

client.on('guildMemberAdd', async member => {
require("moment-duration-format")

if(member.user.bot) return;

let rowyUser = client.users.cache.get(member.id);
const kurulus = new Date().getTime() - rowyUser.createdAt.getTime();  
const gecen = moment.duration(kurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
var kontrol;
var rowyMembers = member.guild.members.cache.size.toString().replace(/ /g, "    ")
var rm = rowyMembers.match(/([0-9])/g)
rowyMembers = rowyMembers.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(rm) {
 rowyMembers = rowyMembers.replace(/([0-9])/g, d => {
   return {
     '0': "0",
     '1': "1",
     '2': "2",
     '3': "3",
     '4': "4",
     '5': "5",
     '6': "6",
     '7': "7",
     '8': "8",
     '9': "9"
    }
    [d];})
}

var rowyVoice = member.guild.channels.cache.filter(channel => channel.type == 'GUILD_VOICE').map(channel => channel.members.size).toString().replace(/ /g, "    ")
var rv = rowyVoice.match(/([0-9])/g)
rowyVoice = rowyVoice.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(rv) {
 rowyVoice = rowyVoice.replace(/([0-9])/g, d => {
   return {
    '0': "0",
    '1': "1",
    '2': "2",
    '3': "3",
    '4': "4",
    '5': "5",
    '6': "6",
    '7': "7",
    '8': "8",
    '9': "9"
    }
    [d];})
}

})


client.on("message" , message => {
    if(!message.guild) return;
   if (message.content.includes(`afk`)) return;
    let etiket = message.mentions.users.first()
    let uye = db.fetch(`user_${message.author.id}_${message.guild.id}`)
    let nickk = db.fetch(`nick_${message.author.id}_${message.guild.id}`)
    if(etiket){
      let reason = db.fetch(`sebep_${etiket.id}_${message.guild.id}`)
      let uye2 = db.fetch(`user_${etiket.id}_${message.guild.id}`)
      if(message.content.includes(uye2)){
      let time = db.fetch(`afktime_${message.guild.id}`);
      let timeObj = ms(Date.now() - time);
        message.channel.send(new Discord.MessageEmbed().setDescription(`${etiket} adlı kullanıcı **${reason}** sebebiyle \`${timeObj}\` süresi boyunca afk.`).setColor("RANDOM"))}}
  if(message.author.id === uye){  
      message.member.setNickname(nickk)
      db.delete(`sebep_${message.author.id}_${message.guild.id}`)
      db.delete(`user_${message.author.id}_${message.guild.id}`)
      db.delete(`nick_${message.author.id}_${message.guild.id}`)
      db.delete(`user_${message.author.id}_${message.guild.id}`);
      db.delete(`afktime_${message.guild.id}`)
      message.reply(`**Başarıyla \`AFK\` modundan çıkış yaptın.**`)
    }  
  });

client.on('message', async message => {
const maxTime = await db.fetch(`max.${message.guild.id}.${message.author.id}`);
const timeout = await db.fetch(`time.${message.guild.id}.${message.author.id}`);
db.add(`mesaj.${message.guild.id}.${message.author.id}`, 1)
if(timeout) {
const sayı = await db.fetch(`mesaj.${message.guild.id}.${message.author.id}`);
if(Date.now() < maxTime) {
 if (message.member.hasPermission("BAN_MEMBERS")) return ;
  return message.delete();
  
}
} else {
db.set(`time.${message.guild.id}.${message.author.id}`, 'ok');
db.set(`max.${message.guild.id}.${message.author.id}`, Date.now()+3000);
setTimeout(() => {
db.delete(`mesaj.${message.guild.id}.${message.author.id}`);
db.delete(`time.${message.guild.id}.${message.author.id}`);
}, 500)
}
});

client.on("messageDelete", async(message) => {
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  let snipe = {
    mesaj: message.content,
    mesajyazan: message.author.id,
    ytarihi: message.createdTimestamp,
    starihi: Date.now(), 
    kanal: message.channel.id
  }
await db.set(`snipe.${message.guild.id}`, snipe)
});

client.on('voiceStateUpdate', async (oldState, newState) => {
  let LogKanal = newState.guild.channels.cache.get(config.Log.SesLog);
  if (!oldState.channelID && newState.channelID) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanala **katıldı!**`).catch();
  if (oldState.channelID && !newState.channelID) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı sesli kanaldan **ayrıldı!**`).catch();
  if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` üyesi ses kanalını **değiştirdi!** (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` => \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`).catch();
  if (oldState.channelID && oldState.selfMute && !newState.selfMute) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` (**${newState.guild.members.cache.get(newState.id).id}**) üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını **kaldırdı!**`).catch();
  if (oldState.channelID && !oldState.selfMute && newState.selfMute) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` (**${newState.guild.members.cache.get(newState.id).id}**) üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **susturdu!**`).catch();
  if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\ (**${newState.guild.members.cache.get(newState.id).id}**) üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını **kaldırdı!**`).catch();
  if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return LogKanal.send(`\`${newState.guild.members.cache.get(newState.id).displayName}\` (**${newState.guild.members.cache.get(newState.id).id}**) üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini **sağırlaştırdı!**`).catch();
});

client.login(process.env.token)







