module.exports = client => {
    client.user.setPresence({ 
        status: 'online',
        activity: {
        name: 'Lunar Client',
        type: 'PLAYING',
        },
    }).catch(console.error)
}