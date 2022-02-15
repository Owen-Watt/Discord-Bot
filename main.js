
const Discord = require('discord.js');
const client = new Discord.Client({partials: ['MESSAGE', "CHANNEL", "REACTION"]});

const {loadCommands} = require('./utils/loadCommands');
const config = require('./settings.json');

require('./utils/loadEvents')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

loadCommands(client);

let memberCounter = require('./counters/member-counter');

client.on('guildMemberAdd',guildMember=> {      // if a user joins the server
    let {guild} = guildMember;
    
    if(guild.id ==='723482268886368307'){  // if in our server
        let requirementsID = '764080032079020032'  // channel id
        let verifyID = '761611143503675452'  // channel id

        const welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#FFB6C1')
        .setTitle(`**${guild}**`)
        .setDescription(`Welcome <@${guildMember.user.id}> 
        
        •  verify in ${guildMember.guild.channels.cache.get(verifyID).toString()}   // makes the channel ID clickable
        •  ${guildMember.guild.channels.cache.get(requirementsID).toString()}   // makes the channel ID clickable
        •  \`?apply\` to apply to join tokyo`)
        .setImage('https://media.giphy.com/media/GEkAU4EckSumA/giphy.gif')
        .setThumbnail(guildMember.user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        
        let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Un-Verified')  // fetches role by name
            
        guildMember.roles.add(welcomeRole);  
        guildMember.guild.channels.cache.get('723485611478220842').send(welcomeEmbed);
    }
})

client.on('guildMemberRemove',guildMember=> {     // when a member leaves send a message in specified chat
    let {guild} = guildMember;
    
    if(guild.id ==='723482268886368307'){
        const embed = new Discord.MessageEmbed()
        .setAuthor(guildMember.user.tag) 
        .setDescription(`**:x: Member left**
        ${guildMember} left. `) 
        .setTimestamp()
        .setColor('#A00808')
        .setFooter(`ID: ${guildMember.id}`);

        guildMember.guild.channels.cache.get('797152411906342953').send(embed);
    }
});


client.once('ready', () => {
    memberCounter(client).catch(console.error); // starts interval to count members and display how many members are in the server
}) ;

client.login(config.token);