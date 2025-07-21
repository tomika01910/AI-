module.exports.config = {
  name: "config",
  version: "1.0.0",
  hasPermssion: 2,  // শুধু বটের মালিক এবং এডমিনরা চালাতে পারবে
  credits: "Sakib AI by Sakib",
  description: "সাকিবের পারফেক্ট কনফিগারেশন বট",
  commandCategory: "admin",
  cooldowns: 5
};

module.exports.languages = {
  "en": {},
  "bn": {}
};

const appState = require("../../appstate.json");  // ফেসবুক সেশন কুকি
const cookie = appState.map(item => item.key + "=" + item.value).join(";");
const headers = {
  "Host": "mbasic.facebook.com",
  "user-agent": "Mozilla/5.0 (Linux; Android 11; M2101K7BG Build/RP1A.200720.011;) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/97.0.4692.98 Mobile Safari/537.36",
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
  "sec-fetch-site": "same-origin",
  "sec-fetch-mode": "navigate",
  "sec-fetch-user": "?1",
  "sec-fetch-dest": "document",
  "referer": "https://mbasic.facebook.com/?refsrc=deprecated&_rdr",
  "accept-encoding": "gzip, deflate",
  "accept-language": "bn-BD,bn;q=0.9,en-US;q=0.8,en;q=0.7",
  "Cookie": cookie
};

module.exports.handleReply = async function({ api, event, handleReply }) {
  const botID = api.getCurrentUserID();
  const axios = require("axios");

  const { type, author } = handleReply;
  const { threadID, messageID, senderID } = event;
  let body = event.body || "";

  if (author != senderID) return;  // শুধুমাত্র মূল ইউজারের রিপ্লাই গ্রহণ

  const args = body.split(" ");

  const reply = (msg, callback) => {
    if (callback) api.sendMessage(msg, threadID, callback, messageID);
    else api.sendMessage(msg, threadID, messageID);
  };

  // মেনু অপশন গুলো
  if (type == 'menu') {
    if (["01", "1", "02", "2"].includes(args[0])) {
      reply(`👉 বটের ${["01", "1"].includes(args[0]) ? "বায়ো" : "নিকনেম"} পরিবর্তন করতে, এই মেসেজটির রিপ্লাই হিসেবে নতুন টেক্সট দিন অথবা 'delete' লিখে মুছে ফেলুন।`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: ["01", "1"].includes(args[0]) ? "changeBio" : "changeNickname"
        });
      });
    }
    else if (["06", "6"].includes(args[0])) {
      reply(`👉 বটের প্রোফাইল ছবি পরিবর্তনের জন্য, এই মেসেজের রিপ্লাই হিসেবে একটি ছবি অথবা ছবির লিঙ্ক দিন।`, (err, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "changeAvatar"
        });
      });
    }
    else if (["08", "8"].includes(args[0])) {
      reply(`👉 মেসেঞ্জারে ব্লক করতে চান এমন আইডি গুলো স্পেস দিয়ে আলাদা করে লিখে রিপ্লাই করুন।`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "blockUser"
        });
      });
    }
    else if (["09", "9"].includes(args[0])) {
      reply(`👉 আনব্লক করতে চান এমন আইডি গুলো স্পেস দিয়ে আলাদা করে লিখে রিপ্লাই করুন।`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "unBlockUser"
        });
      });
    }
    else if (["10"].includes(args[0])) {
      reply(`👉 বটের পেজে পোস্ট করতে চান এমন কিছু লিখে রিপ্লাই করুন।`, (e, info) => {
        global.client.handleReply.push({
          name: this.config.name,
          messageID: info.messageID,
          author: senderID,
          type: "createPost"
        });
      });
    }
    else if (["21"].includes(args[0])) {
      api.logout(e => {
        if (e) return reply('❌ এরর হয়েছে, পরে আবার চেষ্টা করুন।');
        else console.log('✅ সফলভাবে লগআউট করা হয়েছে।');
      });
    }
  }

  // বায়ো পরিবর্তন
  else if (type == 'changeBio') {
    const bio = body.toLowerCase() == 'delete' ? '' : body;
    api.changeBio(bio, false, err => {
      if (err) return reply("❌ এরর হয়েছে, পরে আবার চেষ্টা করুন।");
      else return reply(`✅ বটের বায়ো ${!bio ? "সফলভাবে মুছে ফেলা হয়েছে" : `পরিবর্তিত হয়েছে: ${bio}`}`);
    });
  }

  // নিকনেম পরিবর্তন
  else if (type == 'changeNickname') {
    const nickname = body.toLowerCase() == 'delete' ? '' : body;
    const res = (await axios.get('https://mbasic.facebook.com/' + botID + '/about', {
      headers,
      params: {
        nocollections: "1",
        lst: `${botID}:${botID}:${Date.now().toString().slice(0, 10)}`,
        refid: "17"
      }
    })).data;
    require('fs-extra').writeFileSync(__dirname + "/cache/resNickname.html", res);

    let form;
    if (nickname) {
      const name_id = res.includes('href="/profile/edit/info/nicknames/?entid=') ? res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0] : null;
      const variables = {
        collectionToken: (Buffer.from("app_collection:" + botID + ":2327158227:206")).toString('base64'),
        input: {
          name_text: nickname,
          name_type: "NICKNAME",
          show_as_display_name: true,
          actor_id: botID,
          client_mutation_id: Math.round(Math.random() * 19).toString()
        },
        scale: 3,
        sectionToken: (Buffer.from("app_section:" + botID + ":2327158227")).toString('base64')
      };

      if (name_id) variables.input.name_id = name_id;

      form = {
        av: botID,
        fb_api_req_friendly_name: "ProfileCometNicknameSaveMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "100017985245260",
        variables: JSON.stringify(variables)
      };
    }
    else {
      if (!res.includes('href="/profile/edit/info/nicknames/?entid=')) return reply('❌ বটের কোনো নিকনেম নেই মুছে ফেলার জন্য।');
      const name_id = res.split('href="/profile/edit/info/nicknames/?entid=')[1].split("&amp;")[0];
      form = {
        av: botID,
        fb_api_req_friendly_name: "ProfileCometAboutFieldItemDeleteMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "100037743553265",
        variables: JSON.stringify({
          collectionToken: (Buffer.from("app_collection:" + botID + ":2327158227:206")).toString('base64'),
          input: {
            entid: name_id,
            field_type: "nicknames",
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          scale: 3,
          sectionToken: (Buffer.from("app_section:" + botID + ":2327158227")).toString('base64'),
          isNicknameField: true,
          useDefaultActor: false
        })
      };
    }

    api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
      if (e) return reply(`❌ এরর হয়েছে, পরে আবার চেষ্টা করুন।`);
      else if (JSON.parse(i).errors) reply(`❌ এরর: ${JSON.parse(i).errors[0].summary}`);
      else reply(`✅ বটের নিকনেম ${!nickname ? "সফলভাবে মুছে ফেলা হয়েছে" : `পরিবর্তিত হয়েছে: ${nickname}`}`);
    });
  }

  // প্রোফাইল ছবি পরিবর্তন
  else if (type == 'changeAvatar') {
    let imgUrl;
    if (body && body.match(/^https?:\/\/\S+$/)) imgUrl = body;
    else if (event.attachments[0] && event.attachments[0].type == "photo") imgUrl = event.attachments[0].url;
    else return reply(`❗ একটি সঠিক ছবি লিঙ্ক বা ছবি রিপ্লাই হিসেবে দিন।`, (err, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: "changeAvatar"
      });
    });

    try {
      const imgBuffer = (await axios.get(imgUrl, { responseType: "stream" })).data;
      const form0 = { file: imgBuffer };
      let uploadImageToFb = await api.httpPostFormData(`https://www.facebook.com/profile/picture/upload/?profile_id=${botID}&photo_source=57&av=${botID}`, form0);
      uploadImageToFb = JSON.parse(uploadImageToFb.split("for (;;);")[1]);
      if (uploadImageToFb.error) return reply("❌ এরর: " + uploadImageToFb.error.errorDescription);

      const idPhoto = uploadImageToFb.payload.fbid;
      const form = {
        av: botID,
        fb_api_req_friendly_name: "ProfileCometProfilePictureSetMutation",
        fb_api_caller_class: "RelayModern",
        doc_id: "100037743553265",
        variables: JSON.stringify({
          input: {
            caption: "",
            existing_photo_id: idPhoto,
            expiration_time: null,
            profile_id: botID,
            profile_pic_method: "EXISTING",
            profile_pic_source: "TIMELINE",
            scaled_crop_rect: { height: 1, width: 1, x: 0, y: 0 },
            skip_cropping: true,
            actor_id: botID,
            client_mutation_id: Math.round(Math.random() * 19).toString()
          },
          isPage: false,
          isProfile: true,
          scale: 3
        })
      };

      api.httpPost("https://www.facebook.com/api/graphql/", form, (e, i) => {
        if (e) reply(`❌ এরর হয়েছে, পরে আবার চেষ্টা করুন।`);
        else if (JSON.parse(i.slice(0, i.indexOf('\n') + 1)).errors) reply(`❌ এরর: ${JSON.parse(i).errors[0].description}`);
        else reply(`✅ বটের প্রোফাইল ছবি সফলভাবে পরিবর্তিত হয়েছে।`);
      });
    }
    catch {
      reply(`❌ এরর হয়েছে, পরে আবার চেষ্টা করুন।`);
    }
  }

  // ইউজার ব্লক করা
  else if (type == 'blockUser') {
    if (!body) return reply("❗ ব্লক করতে ইউজার আইডি দিন", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'blockUser'
      });
    });
    const uids = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    for (const uid of uids) {
      try {
        await api.changeBlockedStatus(uid, true);
        success.push(uid);
      } catch {
        failed.push(uid);
      }
    }
    reply(`✅ সফলভাবে ${success.length} জনকে ব্লক করা হয়েছে।${failed.length > 0 ? `\n❌ ব্লক করতে ব্যর্থ: ${failed.join(", ")}` : ""}`);
  }

  // ইউজার আনব্লক করা
  else if (type == 'unBlockUser') {
    if (!body) return reply("❗ আনব্লক করতে ইউজার আইডি দিন", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'unBlockUser'
      });
    });
    const uids = body.replace(/\s+/g, " ").split(" ");
    const success = [];
    const failed = [];
    for (const uid of uids) {
      try {
        await api.changeBlockedStatus(uid, false);
        success.push(uid);
      } catch {
        failed.push(uid);
      }
    }
    reply(`✅ সফলভাবে ${success.length} জনকে আনব্লক করা হয়েছে।${failed.length > 0 ? `\n❌ আনব্লক করতে ব্যর্থ: ${failed.join(", ")}` : ""}`);
  }

  // পোস্ট তৈরি করা
  else if (type == 'createPost') {
    if (!body) return reply("❗ পোস্ট করার জন্য কিছু লিখুন", (e, info) => {
      global.client.handleReply.push({
        name: this.config.name,
        messageID: info.messageID,
        author: senderID,
        type: 'createPost'
      });
    });

    const getGUID = () => {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    };

    const session_id = getGUID();
    const form = {
      av: botID,
      fb_api_req_friendly_name: "ComposerStoryCreateMutation",
      fb_api_caller_class: "RelayModern",
      doc_id: "100017985245260",
      variables: JSON.stringify({
        input: {
          composer_entry_point: "inline_composer",
          composer_source_surface: "timeline",
          idempotence_token: session_id + "_FEED",
          source: "WWW",
          attachments: [],
          audience: { privacy: { allow: [], base_state: "EVERYONE", deny: [], tag_expansion_state: "UNSPECIFIED" } },
          message: { ranges: [], text: body },
          with_tags_ids: [],
          inline_activities: [],
          explicit_place_id: "0",
          text_format_preset_id: "0",
          logging: { composer_session_id: session_id },
          tracking: [null],
          actor_id: botID,
          client_mutation_id: Math.round(Math.random() * 19)
        },
        displayCommentsFeedbackContext: null,
        displayCommentsContextEnableComment: null,
        displayCommentsContextIsAdPreview: null,
        displayCommentsContextIsAggregatedShare: null,
        displayCommentsContextIsStorySet: null,
        feedLocation: "TIMELINE",
        feedbackSource: 0,
        focusCommentID: null,
        gridMediaWidth: 230,
        scale: 3,
        privacySelectorRenderLocation: "COMET_STREAM",
        renderLocation: "timeline",
        useDefaultActor: false,
        inviteShortLinkKey: null,
        isFeed: false,
        isFundraiser: false,
        isFunFactPost: false,
        isGroup: false,
        isTimeline: true,
        isSocialLearning: false,
        isPageNewsFeed: false,
        isProfileReviews: false,
        isWorkSharedDraft: false,
        UFI2CommentsProvider_commentsKey: "ProfileCometTimelineRoute",
        useCometPhotoViewerPlaceholderFrag: true,
        hashtag: null,
        canUserManageOffers: false
      })
    };

    api.httpPost('https://www.facebook.com/api/graphql/', form, (e, i) => {
      if (e || JSON.parse(i).errors) return reply(`❌ পোস্ট তৈরি ব্যর্থ, পরে চেষ্টা করুন।`);
      const postID = JSON.parse(i).data.story_create.story.legacy_story_hideable_id;
      const urlPost = JSON.parse(i).data.story_create.story.url;
      return reply(`✅ পোস্ট সফলভাবে তৈরি হয়েছে\n📌 পোস্ট আইডি: ${postID}\n🔗 লিঙ্ক: ${urlPost}`);
    });
  }

  // এখান থেকে পরবর্তি অন্য ফাংশন যুক্ত করো যদি দরকার হয়
};
