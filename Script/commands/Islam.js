/** Custom coded by Sa Kib AI 🖤, নিজের ছাড়া অন্য কোথাও শেয়ার করো না 😉 **/

module.exports.config = {
  name: "islam",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Sa Kib AI 🖤",
  description: "Islamic video send kare Sa Kib style 🖤",
  commandCategory: "Sa Kib AI 🖤",
  usages: "islam",
  cooldowns: 5,
  dependencies: {
    "request":"",
    "fs-extra":"",
    "axios":""
  }
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];

var messageList = [
"আসসালামু আলাইকুম ভাইজান 🌸 Sa Kib AI 🖤 থেকে ইসলামিক ভিডিও আপনার জন্য ✨",
"আলহামদুলিল্লাহ 🖤 Sa Kib AI নিয়ে আসলো ইসলামিক ভিডিও 🎁",
"ইসলামিক vibes 🖤 Powered by Sa Kib AI ✨"
];
var msg = messageList[Math.floor(Math.random() * messageList.length)];

var links = [
"https://drive.google.com/uc?id=1Y5O3qRzxt-MFR4vVhz0QsMwHQmr-34iH",
"https://drive.google.com/uc?id=1YDyNrN-rnzsboFmYm8Q5-FhzoJD9WV3O",
"https://drive.google.com/uc?id=1XzgEzopoYBfuDzPsml5-RiRnItXVx4zW",
"https://drive.google.com/uc?id=1YEeal83MYRI9sjHuEhJdjXZo9nVZmfHD",
"https://drive.google.com/uc?id=1YMEDEKVXjnHE0KcCJHbcT2PSbu8uGSk4",
"https://drive.google.com/uc?id=1YRb2k01n4rIdA9Vf69oxIOdv54JyAprD",
"https://drive.google.com/uc?id=1YSQCTVhrHTNl6B9xSBCQ7frBJ3bp_KoA",
"https://drive.google.com/uc?id=1Yc9Rwwdpqha1AWeEb5BXV-goFbag0441",
"https://drive.google.com/uc?id=1YcwtkC5wRbbHsAFuEQYQuwQsH4-ZiBS8",
"https://drive.google.com/uc?id=1YhfyPl8oGmsIAIOjWQyzQYkDdZUPSalo"
];

var callback = () => api.sendMessage({body:`${msg}`,attachment: fs.createReadStream(__dirname + "/cache/islamic.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/islamic.mp4"));
return request(encodeURI(links[Math.floor(Math.random() * links.length)])).pipe(fs.createWriteStream(__dirname+"/cache/islamic.mp4")).on("close",() => callback());
};
