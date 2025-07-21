const fs = global.nodemodule["fs-extra"];

module.exports.config = { name: "Obot", version: "1.0.1", hasPermssion: 0, credits: "CYBER TEAM", description: "goibot", commandCategory: "Noprefix", usages: "noprefix", cooldowns: 5, };

module.exports.handleEvent = async function({ api, event, args, Threads, Users }) { const { threadID, messageID } = event; const moment = require("moment-timezone"); const time = moment.tz("Asia/Dhaka").format("HH:mm:ss L"); const id = event.senderID; const name = await Users.getNameUser(event.senderID);

const tl = [ "beshi bot bot korle leave dimu but 😒", "shunbo na 😼 tumi amake prem korai dia nai 🥺", "ami pagal der sathe kotha boli na 😒", "eto deko na prem e pore jabo 🙈", "bolo babu, tumi amake valobaso naki? 🙈💋", "bar bar dakle matha gorom hoye jai 😑", "hmm bolo ki korte pari tomake jonne 😐", "eto dekkis keno? gali khaite iccha ase naki 🤬", "I love you janu 🥰", "Bolo jaan, kemon aso? 😚", "bot bole opoman korso 😰", "hop bedi, boss bolo 😼", "chup thako naile daat bhenge dibo 😒", "bot na, jaanu bolo 😘", "disturb korish na busy asi 😋", "ami gorib der sathe kotha boli na 😼", "dakle kisu kore dibo 😘", "mood nai disturb korish na 😑", "aso kiss dei 🤭😘", "kichu kaj nai? shudhu bot bot koros 🤣", "tor kotha tor bariteo keu shune na 🤔😂", "dako na busy asi 😑", "mistake korso naki 🤣", "bolo ki bolba, sobar samne bolba naki 🤭", "kalke dekha korbi 😈", "hmm bolo sunchi 😏", "ar koto bar dakhbi sunchi to 😑", "ami to blind kichu dekhi na 🐸", "bot na jaan bolo 😌", "koto cute lage tumi jaan 🥰", "tor chokhe pore na ami busy asi 😒", "valobasha sobai kore, noshto hobona 🤣" ];

const rand = tl[Math.floor(Math.random() * tl.length)];

if (event.body && event.body.toLowerCase().startsWith("/bot")) { return api.sendMessage(${name}, ${rand}, threadID, messageID); } };

module.exports.run = function({ api, event, client, __GLOBAL }) {};

            
