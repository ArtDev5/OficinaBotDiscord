
require('dotenv').config();
const { Client, Intents } = require("discord.js")

const bot = new Client({ intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILDS]})  

const mySecret = process.env['TOKEN']

const axios = require('axios');




function pronto() {
  console.log("Bot ligado")
}

bot.on("ready", pronto)

function mensagem(msg) {
  if (!msg.author.bot) {
    if (msg.content.includes("clima")) {

      let local = 'Aracaju'

      if (msg.content.includes("clima")) {
        local = msg.content.split("em ")[1]
      }

      (async () => {
        try {
          const response = await axios.get(`https://api.hgbrasil.com/weather?key=ddbccb12&city_name=${local}`)
          let tempo = response.data.results.description
          let max = response.data.results.forecast[0].max
          let min = response.data.results.forecast[0].min
          let description = response.data.results.forecast[0].description
          console.log(local + ' - ' +tempo)
          msg.channel.send(`Em ${local} o clima está ${tempo}. A previsão para hoje é para máxima de ${max} graus e mínima de ${min} graus, podendo conter ${description}`)
        } catch (error) {
          console.log(error);
        }
      })();
      
    }
  }
}

bot.on("messageCreate", mensagem)

bot.login(mySecret)