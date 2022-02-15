const Discord = require('discord.js');
module.exports.run = (client, message) =>{

    message.channel.send("In 5 seconds a scrambler will appear <a:eyesSHAKE:806640749764280341>")
    let winner = false;
    let sent = false;
    let failed = false;

    setTimeout(() =>{
        if(!winner && !sent){
            var word = ["computer", "science", "fortnite","minecraft", "keyboard", "rocket league", "discord", "Ireland"];
            
            var randWord = word[Math.floor(Math.random() * word.length)];
            const announcement = new Discord.MessageEmbed()
            .setColor('#FFC0CB')
            .setDescription(`The First person to type **` + randWord + `** wins!`)

            message.channel.send(announcement)
            sent = true;
            var startTime = performance.now()
           
            client.on('message', msg=>{
                if(msg.content.toLowerCase() === randWord.toLowerCase() && winner === false && failed === false){
                    var endTime = performance.now()
                    time = Math.round(((endTime-startTime)/1000) * 100) / 100;
                    
                    const WINNER = new Discord.MessageEmbed()
                    .setColor('#FFC0CB')
                    .setDescription(`${msg.author} Won in **` + time + `** seconds!`)

                    msg.channel.send(WINNER);
                    winner = true; 
                }
            })
        }
    }, 5000);

    if(winner === false){
        setTimeout(() =>{
            const loser = new Discord.MessageEmbed()
            .setColor('#FFC0CB')
            .setDescription(`:x: No one was quick enough :(`)
    
            message.channel.send(loser)
            failed = true;
        }, 15000)
    }
}

module.exports.config = {
    name: "scrambler",
    aliases: []
}