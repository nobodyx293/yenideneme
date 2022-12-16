const { MessageEmbed } = require('discord.js');

exports.run = async(client, message, args) => {

    if(!message.member.hasPermission('ADMINISTRATOR')) return;

 message.channel.clone().then(chnl => {
  let position = message.channel.position;
  chnl.setPosition(position);
  message.channel.delete();
});
  
};

exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'nuke',
}