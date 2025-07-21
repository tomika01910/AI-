const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const jimp = require("jimp");

module.exports.config = {
    name: "bf",
    version: "1.0",
    hasPermssion: 0,
    credits: "𝐂𝐘Sakib ai ",
    description: "মেনশন দিলে দুইজনের জুটি প্রোফাইল পিক তৈরি করে",
    commandCategory: "image",
    usages: "bf @mention",
    cooldowns: 5
};

module.exports.onLoad = async function() {
    const dirPath = __dirname + "/cache/canvas/";
    const arr2Path = path.join(dirPath, "arr2.png");

    if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
    if (!fs.existsSync(arr2Path)) {
        const imgURL = "https://i.imgur.com/iaOiAXe.jpg";
        const response = await axios.get(imgURL, { responseType: "arraybuffer" });
        fs.writeFileSync(arr2Path, Buffer.from(response.data, "utf-8"));
    }
};

async function circle(imagePath) {
    const image = await jimp.read(imagePath);
    image.circle();
    return await image.getBufferAsync(jimp.MIME_PNG);
}

async function makeImage({ one, two }) {
    const backgroundPath = __dirname + "/cache/canvas/arr2.png";
    const oneAvt = path.join(__dirname, `/cache/canvas/${one}_avt.png`);
    const twoAvt = path.join(__dirname, `/cache/canvas/${two}_avt.png`);

    // Download avatar images
    const oneBuffer = (await axios.get(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=662856820fa708a1d379%7Cc1e65695696fb991c7.3.1`, { responseType: "arraybuffer" })).data;
    const twoBuffer = (await axios.get(`https://graph.facebook.com/${two}/picture?width=512&height=512&access_token=662856820fa708a1d379%7Cc1e65695696fb991c7.3.1`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(oneAvt, Buffer.from(oneBuffer, "utf-8"));
    fs.writeFileSync(twoAvt, Buffer.from(twoBuffer, "utf-8"));

    const bg = await jimp.read(backgroundPath);
    const circleOne = await jimp.read(await circle(oneAvt));
    const circleTwo = await jimp.read(await circle(twoAvt));

    bg.composite(circleOne.resize(130, 130), 100, 100);
    bg.composite(circleTwo.resize(130, 130), 340, 100);

    const finalPath = __dirname + `/cache/canvas/bf_${one}_${two}.png`;
    await bg.writeAsync(finalPath);

    fs.unlinkSync(oneAvt);
    fs.unlinkSync(twoAvt);

    return finalPath;
}

module.exports.run = async function({ event, api }) {
    const { threadID, messageID, senderID, mentions } = event;
    const mentionList = Object.keys(mentions);

    if (mentionList.length < 1) return api.sendMessage("👀 মেনশন দে ভাই 😂", threadID, messageID);

    const p1 = senderID;
    const p2 = mentionList[0];

    const imgPath = await makeImage({ one: p1, two: p2 });

    return api.sendMessage({
        body: `╔═══❖••°°••❖═══╗\nআমরা একসাথে সুন্দর মিলে যাই ❤️\n╚═══❖••°°••❖═══╝`,
        attachment: fs.createReadStream(imgPath)
    }, threadID, () => fs.unlinkSync(imgPath), messageID);
};
