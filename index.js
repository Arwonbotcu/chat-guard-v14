const { Client, GatewayIntentBits, Partials } = require("discord.js");
const config = require("./config.js");
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.login(config.token || process.env.TOKEN)

client.on("messageCreate", async (message) => {
  let kanal = db.fetch(`dosyaengel_${message.channel.id}`) 
  let log = db.fetch(`log_${message.guild.id}`) 
 
  if (message.channel.id === kanal) {
    if (message.attachments.size >= 1) {
      message.delete();
      message.channel.send("Bu kanalda dosya engel sistemi etkin!")
      client.channels.cache.get(log).send("<@"+message.author+">"+ " Adl?? Kullan??c?? "+ "<#"+kanal+">"+ " Kanal??nda Dosya Atmaya ??al????t??!")
    }
  }
});
client.on("messageCreate", async msg => { 
  const yasak = db.fetch(`etiketengel_${msg.guild.id}`)
  const kelime = ["<@"+yasak+">"]; 
  if (kelime.some(some => msg.content.includes(some))) {
    msg.delete()
  msg.channel.send("Bu kullan??c??y?? etiketlemek bu sunucu yasaklanm????!")
  let log = db.fetch(`log_${msg.guild.id}`) 
  client.channels.cache.get(log).send(`<@${msg.author.id}> Adl?? Kullan??c?? ${yasak} IDli Kullan??c??s??n?? Etiketlemeye ??al????t??!`)
 
  }}) 
  client.on("messageCreate", async message => { 
    const anan??nam?? = db.fetch(`roletiket_${message.guild.id}`)
    if (message.content.toLowerCase() === `<@&${anan??nam??}>` || message.content.toLowerCase() === `<@&${anan??nam??}>` || message.content.toLowerCase() === `<@&${anan??nam??}>`) {
    message.delete()
    message.channel.send(`${message.author}, bu rol?? etiketleyemezsin.`)
    let log = db.fetch(`log_${message.guild.id}`) 
    client.channels.cache.get(log).send(`${message.author.tag} Adl?? Kullan??c?? ${anan??nam??} IDli Rol?? Etiketlemeye ??al????t??!`)
    }

  })
  client.on('messageCreate', msg => {
    const filtre = db.fetch(`everengel_${msg.guild.id}`)
       if (filtre) {
           const etiket = ["@everyone", "@here",];
           let kelimeler = msg.content.split(' ');
           kelimeler.forEach(kelime=> {
            if(etiket.some(k??f??r => k??f??r === kelime))  {
                     msg.delete();  
                     let log = db.fetch(`log_${msg.guild.id}`) 
    client.channels.cache.get(log).send(`${msg.author.tag} Adl?? Kullan??c?? everyone atmaya ??al????t??`)
                         return msg.channel.send('Bu Sunucuda ever engel a????k!').then(msg => console.log());
                     
                        }
                      })
                  }
                 }) 
                 client.on('messageCreate', msg => {
                  const filtre = db.fetch(`k??f??rengel_${msg.guild.id}`)
                     if (filtre) {
                         const kufurler = ["o??", "amk", "anan?? sikiyim", "anan??skm", "pi??", "amk", "amsk", "sikim", "sikiyim", "orospu ??ocu??u", "pi?? kurusu", "kahpe", "orospu", "sik", "yarrak", "amc??k", "am??k", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
                         let kelimeler = msg.content.split(' ');
                         kelimeler.forEach(kelime=> {
                          if(kufurler.some(k??f??r => k??f??r === kelime))  {
                                   msg.delete();  
                                   let log = db.fetch(`log_${msg.guild.id}`) 
                                   client.channels.cache.get(log).send(`${msg.author.tag} Adl?? Kullan??c?? K??f??r Etmeye ??al????t??!`)
                                       return msg.channel.send('Bu Sunucuda K??f??r Filtresi Aktiftir.').then(msg => console.log());
                                   
                                      }
                                    })
                                }
                               }) 
   client.on("messageUpdate", (oldMessage, newMessage, msg) => {
     
     
    const filtre = db.fetch(`k??f??rengel_${newMessage.guild.id}`)
       if (filtre) {
           const kufurler = ["o??", "amk", "anan?? sikiyim", "anan??skm", "pi??", "amk", "amsk", "sikim", "sikiyim", "orospu ??ocu??u", "pi?? kurusu", "kahpe", "orospu", "sik", "yarrak", "amc??k", "am??k", "yarram", "sikimi ye", "mk", "mq", "aq", "amq",];
           let kelimeler = newMessage.content.split(' ');
           kelimeler.forEach(kelime=> {
            if(kufurler.some(k??f??r => k??f??r === kelime))  {
        
             
              newMessage.delete();
              let log = db.fetch(`log_${msg.guild.id}`) 
              client.channels.cache.get(log).send(`${msg.author.tag} Adl?? Kullan??c?? mesaj??n?? d??zenleyerek k??f??r ??al????t??`) 
                         return newMessage.channel.send('Bu Sunucuda K??f??r Filtresi Aktiftir.').then(msg => console.log());
                        
             
             }
           })
       }
      }) 
     
      client.on("messageCreate", msg => {
       let i = db.fetch(`reklam_${msg.guild.id}`)
          if (i == 'acik') {
              const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg",];
              if (reklam.some(word => msg.content.includes(word))) {
                
                        msg.delete();
                        let log = db.fetch(`log_${msg.guild.id}`) 
                        client.channels.cache.get(log).send(`${msg.author.tag} Adl?? Kullan??c?? Reklam Yapmaya ??al????t??`)
                          return msg.channel.send('**Bu Sunucuda** `Reklam Engelle`** Aktif Reklam Yapmana ??zin Vermem ??zin Vermem ? !**').then(msg => console.log);
          

                }
              }
          })
        
       
            
          
         
       