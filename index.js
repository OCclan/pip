const Discord = require("discord.js");
const client = new Discord.Client();



const config = require("./config.json");




  



client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
});


client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  

  if(command === "ping") {
  
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  
  if(command === "say") {
    message.delete()
    
    const embed = new Discord.RichEmbed()
    .setColor(0x954023)
    .setDescription(message.author.username + " says : " + args.join(" "));
    message.channel.send({embed})

  } else

  if(command === "cat") {
    const { body } = await superagent
    .get('http://aws.random.cat/meow');
    const embed = new Discord.RichEmbed()
    .setColor(0x954D23)
    .setTitle("Meow :cat: ")
    .setImage(body.file)
    message.channel.send({embed})
  }else
  
  if(command === "kick") {
  
    if(!message.member.roles.some(r=>["Admin", "Moderator"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable) 
      return message.reply("I cannot kick this user!");
    

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
  
    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

  }
  
  if(command === "ban") {

    if(!message.member.roles.some(r=>["Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! ");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "purge") { 
    async function purge() {
        message.delete(); 

        
        if (!message.member.roles.find("name", "Admin")) { 
            message.channel.send('You need the \`Admin\` role to use this command.'); 
            return;
        }

        
        if (isNaN(args[0])) {
            
            message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>');
            
            return;
        }

        const fetched = await message.channel.fetchMessages({limit: args[0]}); 
        console.log(fetched.size + ' messages found, deleting...');

        
        message.channel.bulkDelete(fetched)
            .catch(error => message.channel.send(`Error: ${error}`));

    }

purge();

}

        });
            


client.login(config.token);
