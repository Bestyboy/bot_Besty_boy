/** Required */
import { Client, GatewayIntentBits, Partials } from 'discord.js';
import {
	AudioPlayer,
	createAudioResource,
	entersState,
	joinVoiceChannel,
	StreamType,
	VoiceConnectionStatus,
} from '@discordjs/voice';
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
let vocal;

/** Play the audio */
async function play(stream) {
	if (!voiceConnection || voiceConnection.state.status === VoiceConnectionStatus.Disconnected) {
		voiceConnection = joinVoiceChannel( {
			channelId: process.env.VOCAL_ID,
			guildId: process.env.GUILD_ID,
			adapterCreator: guild.voiceAdapterCreator,
		} );
		voiceConnection = await entersState( voiceConnection, VoiceConnectionStatus.Ready, 5_000 );
	}
	
	if (voiceConnection.state.status === VoiceConnectionStatus.Ready) {
		let audioRessource = createAudioResource( stream, {inputType: StreamType.Arbitrary, inlineVolume: true} );
		audioPlayer.subscribe( voiceConnection );
		audioPlayer.play( audioRessource );
	}
}


/** On startup */
client.once( 'ready', () => {
	console.log( 'Bot started' );
	guild = client.guilds.cache.get( process.env.GUILD_ID );
	vocal = guild.channels.cache.get( process.env.VOCAL_ID );
} );

client.on( 'messageCreate', async message => {
	console.log(message, message.channel.id);
	if (message.channel.id === process.env.CHANNEL_ID) {
		await message.reply( 'Je suis un bot 🤖' );
	}
	
} );

client.login( process.env.TOKEN );