import { TOKEN } from "./constants.js";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { ask } from "./ia.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.content.substring(0, 1) === "!") {
    const prompt = message.content.substring(1); //remove the exclamation mark from the message
    const answer = await ask(prompt); //prompt GPT-3
    client.channels
      .fetch(message.channelId)
      .then((channel) => channel.send(answer));
  }
});

client.login(TOKEN.TOKEN_DISCORD);
