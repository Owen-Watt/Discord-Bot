const profileModel = require('../models/profileSchema');

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client){
        if(!interaction.isCommand()) return;

        const command = client.commands.get(interaction.commandName);

        if(!command) return;

        let profileData;
        try{
            profileData = await profileModel.findOne({ userID: interaction.member.id });
            if(!profileData){
                let profile = await profileModel.create({
                    userID: interaction.member.id,
                    hugCounter: 0,
                })
                profile.save();
            }
            await command.execute(interaction, profileData);
        }catch(error){
            await interaction.reply({
                content: `${error}`,
                ephemeral: true
            })
        }
    }
};