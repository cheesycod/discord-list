client.on("message", message => {
 if((message.channel.id=="790208177568350208")&&(message.author.id=="790208063104876574")&&(message.embeds[0].title.includes("[discord-list:master]"))&&(message.embeds[0].title.includes("commit"))){
  const embed1 = new Discord.MessageEmbed()
  .setTitle(`Starting To Pull The Latest Commit!`)
  .setURL(message.embeds[0].url)
  .setDescription(`Pulling...`)
  .setTimestamp()
  .setAuthor(message.embeds[0].author.name)
  .setColor("#5865F2");
  
  message.channel.send(embed1).then(msg1=>{
   shell.exec("git reset --hard origin/master");
   const res = shell.exec("git pull");
   if(res.stdout=="Already up to date.\n"){
   const embed2 = new Discord.MessageEmbed()
  .setTitle(`Failed to Pull!`)
  .setURL(message.embeds[0].url)
  .setDescription(`\`Already up to date.\``)
  .setTimestamp()
  .setAuthor(message.embeds[0].author.name)
  .setColor("#ED4245");
   msg1.channel.send(embed2)
   }
   else{
    const embed2 = new Discord.MessageEmbed()
  .setTitle(`Pulled Successfully.`)
  .setURL(message.embeds[0].url)
  .setDescription(`\`\`\`sh\n${res.stdout}\n\`\`\`\n\nChecking Dependencies...`)
  .setTimestamp()
  .setAuthor(message.embeds[0].author.name)
  .setColor("#5865F2");
  msg1.channel.send(embed2);
  
  if((message.embeds[0].description.includes("npm"))||(message.embeds[0].description.includes("pkg"))||(message.embeds[0].description.includes("package"))){
   const ress = shell.exec("npm i");
   if(!ress.stderr){
   const embed3 = new Discord.MessageEmbed()
  .setTitle(`Installing Dependencies!`)
  .setURL(message.embeds[0].url)
  .setDescription(`\`\`\`sh\n${ress.stdout}\n\`\`\`\n\nBuilding...`)
  .setTimestamp()
  .setAuthor(message.embeds[0].author.name)
  .setColor("#57F287");
  msg1.channel.send(embed2);
  if(message.embeds[0].description.includes("build")){
   const re = shell.exec("npm run build");
   const embed3 = new Discord.MessageEmbed()
  .setTitle(`Building!`)
  .setURL(message.embeds[0].url)
  .setDescription("```\nsh\n"+(res.stdout || res.stderr)+"\n```")
  .setTimestamp()
  .setAuthor(message.embeds[0].author.name)
  .setColor("#FEE75C");
  }
  }
   else{
    const embed2 = new Discord.MessageEmbed()
  .setTitle(`Failed to install dependencies!`)
  .setURL(message.embeds[0].url)
  .setDescription(`\`\`\`\n${ress.stderr}\n\`\`\``)
  .setTimestamp()
  .setAuthor(message.embeds[0].author.name)
  .setColor("#57F287");
   msg1.channel.send(embed2);
   }
  }
   }
  });
 }
 if (message.content.startsWith("https://discord.com/channels/")) {
  message.content = message.content.replace("https://discord.com/channels/", "");
  const ar = message.content.split("/");
  //[guid,chid,msgid]
  try {
   const guid = ar[0];
   const chid = ar[1];
   const msgid = ar[2];
   client.guilds.cache.get(guid).channels.cache.get(chid).messages.fetch(msgid).then(msg => {
    const hmm = new Discord.MessageEmbed()
    .setTitle("Message content of Link posted above")
    .setURL("https://discord.com/channels/"+message.content)
    .setColor("RANDOM")
    .setThumbnail(msg.author.displayAvatarURL())
    .setDescription(msg.content)
    .setFooter(`By ${msg.author.tag} | in ${msg.channel.name} of ${msg.guild.name} server | Auto-Generated by RDL bot.`);
    message.channel.send(hmm);
   });
  }
  catch (e) {
   message.reply(e);
  }
 }
 if (!message.content.startsWith(prefix) || message.author.bot) return;
 let args = message.content.slice(prefix.length).trim().split(/ +/);
 let command = args.shift().toLowerCase();
 if (command == "" || !command) message.reply("What do you want?");
 else if (command == "reload") {
  if (message.content.includes("--force")) {
   if (!client.owners.includes(message.author.id)) {
    message.reply("You're not a owner, so you can't force me.");
   }
   else {
    reload();
    message.reply("**Force** Reloading Commands and Events!");
   }
  }
  else {
   let cdm = searchCommand("help");
   if (!cdm) {
    message.reply("Reloading Commands and Events!");
    reload();
   }
   else {
    message.reply("I think the commands are already there. Use `--force` to force reload!");
   }
  }
 }
 else {
  try {
  let cmd = searchCommand(command);
   if (!cmd) return message.reply("That command Doesn't exist!");
   else eval(cmd.code);
 }
  catch(e){
   message.reply(`An Error Occured!\n\`\`\`\n${e}\n\`\`\``);
  }
 }
});