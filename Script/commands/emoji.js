const fs = global.nodemodule["fs-extra"];

module.exports.config = {
    name: "emoji",
    version: "1.0.1",
    hasPermssion: 0,
    credits: "Sa Kib 💫",
    description: "🔥 Text encode/decode Emoji Style! 🔥",
    commandCategory: "Fun Tools 🛠️",
    usages: "emoji en <text>\nemoji de <emoji-text>",
    cooldowns: 3
};

module.exports.run = async ({ event, api, args }) => {
    const { threadID, messageID } = event;
    const type = args[0];
    const text = args.slice(1).join(" ");

    if (!type || !text) return api.sendMessage("📌 Usage:\nemoji en <text> - text to emoji\nemoji de <emoji> - emoji to text", threadID, messageID);

    if (type == "encode" || type == "en") {
        let encoded = text.toLowerCase()
            .replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ|a/g, "😀")
            .replace(/b/g, "😃")
            .replace(/c/g, "😁")
            .replace(/đ|d/g, "😅")
            .replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ|e/g, "🥰")
            .replace(/f/g, "🤣")
            .replace(/g/g, "🥲")
            .replace(/h/g, "☺️")
            .replace(/i|ì|í|ị|ỉ|ĩ/g, "😊")
            .replace(/k/g, "😇")
            .replace(/l/g, "😉")
            .replace(/m/g, "😒")
            .replace(/n/g, "😞")
            .replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ|o/g, "😙")
            .replace(/p/g, "😟")
            .replace(/q/g, "😕")
            .replace(/r/g, "🙂")
            .replace(/s/g, "🙃")
            .replace(/t/g, "☹️")
            .replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ|u/g, "😡")
            .replace(/v/g, "😍")
            .replace(/w/g, "😳")
            .replace(/x/g, "😩")
            .replace(/y|ỳ|ý|ỵ|ỷ|ỹ/g, "😭")
            .replace(/z/g, "😠")
            .replace(/ /g, ".")
            .replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, "")
            .replace(/\u02C6|\u0306|\u031B/g, "");

        return api.sendMessage(`✅ Encoded:\n${encoded}`, threadID, messageID);
    }

    if (type == "decode" || type == "de") {
        let decoded = text.toLowerCase()
            .replace(/😀/g, "a")
            .replace(/😃/g, "b")
            .replace(/😁/g, "c")
            .replace(/😅/g, "d")
            .replace(/🥰/g, "e")
            .replace(/🤣/g, "f")
            .replace(/🥲/g, "g")
            .replace(/☺️/g, "h")
            .replace(/😊/g, "i")
            .replace(/😇/g, "k")
            .replace(/😉/g, "l")
            .replace(/😒/g, "m")
            .replace(/😞/g, "n")
            .replace(/😙/g, "o")
            .replace(/😟/g, "p")
            .replace(/😕/g, "q")
            .replace(/🙂/g, "r")
            .replace(/🙃/g, "s")
            .replace(/☹️/g, "t")
            .replace(/😡/g, "u")
            .replace(/😍/g, "v")
            .replace(/😳/g, "w")
            .replace(/😩/g, "x")
            .replace(/😭/g, "y")
            .replace(/😠/g, "z")
            .replace(/\./g, " ");

        return api.sendMessage(`✅ Decoded:\n${decoded}`, threadID, messageID);
    }

    return api.sendMessage("❌ Wrong Command!\n👉 Use:\nemoji en <text>\nemoji de <emoji-text>", threadID, messageID);
};
