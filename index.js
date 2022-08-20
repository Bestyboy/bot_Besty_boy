/** Required */
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dot_env from 'dotenv';

dot_env.config();

/** Bot init */
let intents = [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages];
let partials = [Partials.Channel, Partials.GuildMember, Partials.Message];

const client = new Client( {
	intents: intents,
	partials: partials,
} );

/** On startup */
client.once( 'ready', () => {
	console.log( 'Bot started' );
} );

let wordlist = {
	'quoi': 'feur',
	'non': 'brill',
	'ca va': 'ba oe et toi mon reuf',
	'ouais': 'stern',
	'oui': 'stiti',
	'wesh': 'den',
	'question': 'pause les direct mon reuf',
};

/** On message */
client.on( 'messageCreate', async message => {
	
	if (message.author.bot) return;
	//if (message.channel.id === process.env.CHANNEL_ID) {
	const guild = message.guild;
	const content = message.content.toLowerCase();
	for (const key in wordlist) {
		if (content.slice( -key.length - 2 ).includes( key )) {
			await message.reply( wordlist[key] );
		}
	}
} );

client.login( process.env.TOKEN );