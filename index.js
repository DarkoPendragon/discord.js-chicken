const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
module.exports = (client, options = {}) => {
	function getRandomInt(min, max, decimal) {  
        var rand = Math.random() < 0.5 ? ((1-Math.random()) * (max-min) + min) : (Math.random() * (max-min) + min);
        var power = Math.pow(10, decimal);
        return Math.floor(rand*power) / power;
    }

    function postChicken(message, should) {
    	if (!should) return;
    	if (!options.postChannel) return console.error(new Error("discord.js-chicken needs a channel ID (postChannel)"))
    	client.channels.fetch(options.postChannel).then(channel => {
    		channel.send({ embeds: [new MessageEmbed().setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() }).setDescription(options.description ?? `[A user has been chickened! Laugh at this user!](${message.url})`).setColor('RANDOM')], components: [new MessageActionRow().addComponents([ new MessageButton().setLabel('Laugh at this user!').setStyle('SECONDARY').setCustomId('LAUGHAT') ])] })
    	})
    }

    client.on('interactionCreate', (interaction) => {
    	if (!interaction.isButton() && interaction.customId != "LAUGHAT") return;
        interaction.update({ embeds: [new MessageEmbed(interaction.message.embeds[0]).setFooter({ text: `${interaction.member.displayName ?? interaction.user.username} laughed first!`, iconURL: interaction.member?.displayAvatarURL({ dynamic: true }) })], components: [] }).catch(client.sendError)
    })

	client.on('messageCreate', (message) => {
		if (message.author.bot || message.system || !message.member) return;
		const ran = getRandomInt(options?.minPercent ?? 0, options?.maxPercent ?? 100, options?.decimalPlaces ?? 2)
		let emojis = Array.from(options?.emojis ?? [{chance: options.chance ?? 0.5, emoji: "🐔"}, {chance: 0.3, emoji: "🐓"}]);
		let didReact = false
		function doNext() {
			let emo = emojis.shift()
			if (!emo) return postChicken(message, didReact)
			let chance = emo?.chance ?? options.chance ?? 0.5;
			let emoji = emo?.emoji ?? emo;
			if (ran <= chance) { // !options.match || options.match == "normal" &&
				message.react(emoji).then(() => {
					didReact = true
					doNext()
				}).catch(e => {
					console.error(`[CHICKEN] ${e.stack}`)
					doNext()
				})
			} else {
				doNext()
			}
		}
		doNext()
	})
}