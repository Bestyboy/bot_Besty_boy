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
	'rouge': 'gorge',
	'qui': 'rikou',
	'si': 'tron',
	'pas': 'ris',
	'mais': 'juin',
	'profonde': 'aiment',
	'ah': 'vion',
	'ok': 'sur glace',
	'tal': 'iban',
	'nan': 'ci',
};

/** On message */
client.on( 'messageCreate', async message => {
	if (message.author.bot) return;
	
	const content = message.content.toLowerCase();
	for (const entry of Object.entries( wordlist )) {
		if (content.slice( -entry[0].length - 2 ).includes( entry[0] )) {
			await message.reply( entry[1] );
		}
	}
} );

client.login( process.env.TOKEN );