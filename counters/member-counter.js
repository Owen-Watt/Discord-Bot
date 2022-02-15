module.exports = async (client) =>{
    const guild = client.guilds.cache.get('723482268886368307');
    setInterval(() =>{
        const memberCount = guild.memberCount;
        const channel = guild.channels.cache.get('796117119712100373');
        channel.setName(`• ${memberCount.toLocaleString()}`)
    }, 10000);
}