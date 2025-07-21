module.exports.run = async({ api, event }) => {
const axios = global.nodemodule["axios"];
const request = global.nodemodule["request"];
const fs = global.nodemodule["fs-extra"];

var link = [
"https://i.imgur.com/FbnZI40.mp4",
"https://i.imgur.com/8k6OOZg.mp4",
"https://i.imgur.com/lgQghHX.mp4",
"https://i.imgur.com/D7HZFSg.mp4",
"https://i.imgur.com/vUe9Zlv.mp4",
"https://i.imgur.com/oxFuJYw.mp4"
];

var callback = () => api.sendMessage({
    attachment: fs.createReadStream(__dirname + "/cache/1.mp4")
}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.mp4"));

return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
.pipe(fs.createWriteStream(__dirname + "/cache/1.mp4"))
.on("close", () => callback());
};
