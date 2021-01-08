import { GuildMember, MessageEmbed, User } from "discord.js";
import { Command } from "discord.js-commando";
import { type } from "os";
import Essentials from "../structures/EssentialsClient";
import { errorColor, successColor } from "./colors";

export default class EmbedHelper {
    readonly client!: Essentials;
    constructor(client:Essentials) {
        this.client = client;
    } 

    public addFooter(embed:MessageEmbed=new MessageEmbed(), client:Essentials=this.client):MessageEmbed {
        return embed.setFooter(this.client.user?.username, client.user?.avatarURL({format:"png"}) || undefined);
    }

    public successEmbed(embed:MessageEmbed=new MessageEmbed(), client:Essentials=this.client):MessageEmbed {
        this.addFooter(embed)
        .setTimestamp()
        .setColor(successColor);

        return embed
    }
    
    public errorEmbed(embed:MessageEmbed=new MessageEmbed(), client:Essentials=this.client):MessageEmbed {
        this.addFooter(embed)
        .setTimestamp()
        .setColor(errorColor);

        return embed
    }

    public setAuthor(embed:MessageEmbed=new MessageEmbed(), user:User, client:Essentials=this.client):MessageEmbed {

        return embed.setAuthor(user.username + "#" + user.discriminator, user.avatarURL({format:"png"}) || undefined)
         
    }
     
}