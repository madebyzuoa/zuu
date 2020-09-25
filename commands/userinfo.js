const Discord = require("discord.js");
const dotenv = require("dotenv")
dotenv.config()

module.exports.run =async (bot, message, args) => {
    
    const status = {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline/Invisible"
      }
        
const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

if (member.user.bot === true) {
    bot = "Yes.";
  } else {
    bot = "No.";
  }

            let embed = new Discord.RichEmbed()
                .setTitle(member.user.tag)
                .setThumbnail(member.user.displayAvatarURL)
                .setColor(process.env.C_BLUE)

                .setDescription(`**Nickname:**
${member.nickname !== null ? `${member.nickname}` : "N/A"}
**Bot:**
${bot}
**Status:**
${status[member.user.presence.status]}
**Currently Playing:**
${member.user.presence.game ? `${member.user.presence.game.name}` : "N/A"}
**Created At:** 
${member.user.createdAt}
**Roles:**
${member.roles.filter(r => r.id !== message.guild.id).sort((roleA, roleB) => roleB.position - roleA.position).map(roles => `<@&${roles.id}>`).join(" ") || "N/A"}`)
                .setFooter(`ID: ` + member.user.id)
                .setTimestamp()
    
            message.channel.send(embed);
    }

    module.exports.help = {
        name: "userinfo"
    }