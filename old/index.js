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

let guild;

/** On startup */
client.once( 'ready', () => {
	console.log( 'Bot started' );
} );

/** On message */
client.on( 'messageCreate', async message => {
	if (message.author.bot) return;
	//if (message.channel.id === process.env.CHANNEL_ID) {
	const guild = message.guild;
	const content = message.content.toLowerCase();
	if (content.slice( -7 ).includes( 'quoi' )) {
		await message.reply( 'feur' );
		//}
		
	}
	
} );

client.login( process.env.TOKEN ); // Your Token