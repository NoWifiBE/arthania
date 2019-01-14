//Settings!

const yourID = "347705956911808512";

const setupCMD = "!createrolemessage"

let initialMessage = `**Si tu es d'accord avec le règlement ! Clique juste ici !** (If you're an english person, please, check the emoji for)`;

const roles = ["Règlement accepté 🔓", "English"];

const reactions = ["✅", "👤"];

const botToken = "NTM0MjA5NDUxMTEzMTg1Mjkz.Dx2Q9g.Q3p8qHYx605D9F6Da9TWOtik5vk";




const Discord = require('discord.js');

const bot = new Discord.Client();

bot.login(botToken);





if (roles.length !== reactions.length) throw "Roles list and reactions list are not the same length!";




function generateMessages(){

    var messages = [];

    messages.push(initialMessage);

    for (let role of roles) messages.push(`Clique juste en dessous pour avoir le rôle **"${role}"**`); //DONT CHANGE THIS

    return messages;

}





bot.on("message", message => {

    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD){

        var toSend = generateMessages();

        let mappedArray = [[toSend[0], false], ...toSend.slice(1).map( (message, idx) => [message, reactions[idx]])];

        for (let mapObj of mappedArray){

            message.channel.send(mapObj[0]).then( sent => {

                if (mapObj[1]){

                  sent.react(mapObj[1]);  

                } 

            });

        }

    }

})





bot.on('raw', event => {

    if (event.t === 'MESSAGE_REACTION_ADD' || event.t == "MESSAGE_REACTION_REMOVE"){

        

        let channel = bot.channels.get(event.d.channel_id);

        let message = channel.fetchMessage(event.d.message_id).then(msg=> {

        let user = msg.guild.members.get(event.d.user_id);

        

        if (msg.author.id == bot.user.id && msg.content != initialMessage){

       

            var re = `\\*\\*"(.+)?(?="\\*\\*)`;

            var role = msg.content.match(re)[1];

        

            if (user.id != bot.user.id){

                var roleObj = msg.guild.roles.find(r => r.name === role);

                var memberObj = msg.guild.members.get(user.id);

                

                if (event.t === "MESSAGE_REACTION_ADD"){

                    memberObj.addRole(roleObj)

                } else {

                    memberObj.removeRole(roleObj);

                }

            }

        }

        })

 

    }   

});
