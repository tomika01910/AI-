module.exports.config = {
	name: "language",
	version: "1.0.0",
	hasPermssion: 2,
	credits: "Sa Kib",
	description: "Change BOT language",
	commandCategory: "System",
	usages: "[bangla] [english]",
	cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
	const { threadID, messageID } = event;

	switch (args[0]?.toLowerCase()) {
		case "bangla":
		case "bn":
			return api.sendMessage(
				"Basha Banglai Chole Asheche 🥰",
				threadID,
				() => global.config.language = "bn"
			);

		case "english":
		case "en":
			return api.sendMessage(
				"Language switched to English 🟢",
				threadID,
				() => global.config.language = "en"
			);

		default:
			return api.sendMessage(
				"❌ Bhul Syntax!\nUse: language bangla / english",
				threadID,
				messageID
			);
	}
};
