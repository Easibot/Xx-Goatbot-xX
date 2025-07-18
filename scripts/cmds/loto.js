module.exports = {
  config: {
    name: "loto",
    aliases: ["lot"],
    version: "1.1",
    author: "XxGhostxX", // à ne pas changer
    countDown: 10,
    role: 0,
    shortDescription: "Jeu du hasard Naruto-style",
    longDescription: "Testez votre chance avec Naruto, Sasuke, ou Sakura. Le hasard décidera si vous êtes riche ou encore plus pauvre !",
    category: "𝙅𝙀𝙐𝙓",
    guide: `{pn} <Naruto/Sasuke/Sakura> <montant>\n\n🌟 *Exemple* : %loto Naruto 100\n\n📌 *Règles* :\n- Mise minimale : 30💲\n- Si tu gagnes, tu repars avec 5 fois ta mise !\n- Choisis bien ton personnage... ou prépare-toi à être ridiculisé !`
  },

  onStart: async function ({ args, message, usersData, event }) {
    if (args[0] && args[0].toLowerCase() === "guide") {
      return message.reply(this.config.guide);
    }

    // Rendre les choix insensibles à la casse
    const betType = args[0]?.toLowerCase();
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["naruto", "sasuke", "sakura"].includes(betType)) {
      return message.reply("🌠》CHOISIS ENTRE 《🌠\n • ~loto 𝙉𝙖𝙧𝙪𝙩𝙤 \n • ~loto 𝙎𝙖𝙨𝙪𝙠𝙚 \n • ~loto 𝙎𝙖𝙠𝙪𝙧𝙖\n\n🌀~loto 𝙜𝙪𝙞𝙙𝙚: savoir comment jouer");
    }

    if (!Number.isInteger(betAmount) || betAmount < 30) {
      return message.reply("💰𝙈𝙞𝙨𝙚 𝙖𝙪 𝙢𝙤𝙞𝙣𝙨 30💲, 𝙢𝙚𝙧𝙘𝙞 !");
    }

    if (betAmount > userData.money) {
      return message.reply(`💸 𝙏'𝙚𝙨 𝙩𝙧𝙤𝙥 𝙥𝙖𝙪𝙫𝙧𝙚 𝙥𝙤𝙪𝙧 ç𝙖, 𝙢𝙤𝙣 𝙜𝙖𝙧𝙨. 𝙄𝙡 𝙩𝙚 𝙢𝙖𝙣𝙦𝙪𝙚 𝙙𝙚𝙨 💲. 𝙍𝙚𝙫𝙞𝙚𝙣𝙨 𝙦𝙪𝙖𝙣𝙙 𝙩'𝙖𝙪𝙧𝙖𝙨 𝙖𝙨𝙨𝙚𝙯 !`);
    }

    const dice = ["🍋", "🍎", "🍇", "🍅", "🍏", "🍓"];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const win = Math.random() < 0.5; // 50% chance de gagner
    const resultString = results.join(" | ");
    const winAmount = betAmount * 5;

    const winMessages = {
      naruto: [
        `🎉 𝘽𝙧𝙖𝙫𝙤 ! 𝙏'𝙖𝙨 𝙗𝙞𝙚𝙣 𝙛𝙖𝙞𝙩 𝙙𝙚 𝙢𝙚 𝙘𝙝𝙤𝙞𝙨𝙞𝙧 ! ${winAmount}💲 𝙥𝙤𝙪𝙧 𝙩𝙤𝙞. 𝙅'𝙨𝙪𝙞𝙨 𝙪𝙣 𝙫𝙧𝙖𝙞 𝙘𝙝𝙚𝙛, 𝙝𝙚𝙞𝙣 ?!`,
        `🌟 𝘼𝙫𝙚𝙘 𝙢𝙤𝙞, 𝙉𝙖𝙧𝙪𝙩𝙤, 𝙘'𝙚𝙨𝙩 𝙜𝙖𝙜𝙣𝗲́ 𝗮̀ 𝙩𝙤𝙪𝙨 𝙡𝙚𝙨 𝙘𝙤𝙪𝙥𝙨 ! 𝙏𝙞𝙚𝙣𝙨 𝙩𝙚𝙨 ${winAmount}💲, 𝙚𝙩 𝙧𝙖𝙢𝗲̀𝙣𝙚-𝙢𝙤𝙞 𝙙𝙚𝙨 𝙧𝙖𝙢𝙚𝙣 𝙖𝙥𝙧𝗲̀𝙨.`,
        `🍀 𝙀𝙝 𝙤𝙪𝙖𝙞𝙨, 𝙘𝙝𝙤𝙞𝙨𝙞𝙧 𝙉𝙖𝙧𝙪𝙩𝙤, 𝙘'𝙚𝙨𝙩 𝙘𝙝𝙤𝙞𝙨𝙞𝙧 𝙡𝙖 𝙫𝙞𝙘𝙩𝙤𝙞𝙧𝙚. ${winAmount}💲 𝙥𝙤𝙪𝙧 𝙩𝙤𝙞. 𝙊𝙣 𝙘𝙤𝙣𝙩𝙞𝙣𝙪𝙚 ?`
      ],
      sasuke: [
        `🎉 𝙏'𝙖𝙨 𝙛𝙖𝙞𝙩 𝙡𝙚 𝙗𝙤𝙣 𝙘𝙝𝙤𝙞𝙭 𝙖𝙫𝙚𝙘 𝙎𝘼𝙎𝙐𝙆𝙀. 𝙑𝙤𝙞𝙡à ${winAmount}💲, 𝙢𝙤𝙣 𝙥𝙤𝙩𝙚. 𝙀𝙩 𝙤𝙪𝙖𝙞𝙨, 𝙎𝙖𝙨𝙪𝙠𝙚, 𝙘'𝙚𝙨𝙩 𝙡𝙖 𝙘𝙡𝙖𝙨𝙨𝙚.`,
        `🌟 𝙎𝙖𝙨𝙪𝙠𝙚 𝙩𝙚 𝙥𝙧𝙤𝙪𝙫𝙚 𝙦𝙪'𝙞𝙡 𝙚𝙨𝙩 𝙪𝙣 𝙜𝗲́𝙣𝙞𝙚... 𝙚𝙩 𝙩𝙤𝙞 𝙖𝙪𝙨𝙨𝙞. ${winAmount}💲 𝙥𝙤𝙪𝙧 𝙩𝙤𝙞. 𝙊𝙣 𝙘𝙤𝙣𝙩𝙞𝙣𝙪𝙚 ?`,
        `🍀 𝙋𝙖𝙨 𝙢𝙖𝙡 ! 𝙏'𝙖𝙨 𝙥𝙖𝙧𝙞𝗲́ 𝙨𝙪𝙧 𝙎𝙖𝙨𝙪𝙠𝙚 𝙚𝙩 𝙩'𝙖𝙨 𝙜𝙖𝙜𝙣𝗲́ ${winAmount}💲. 𝘾𝙤𝙢𝙢𝙚 𝙦𝙪𝙤𝙞, 𝙡'𝙞𝙣𝙩𝙚𝙡𝙡𝙞𝙜𝙚𝙣𝙘𝙚 𝙥𝙖𝙞𝙚.`
      ],
      sakura: [
        `🎉 𝙎𝙖𝙠𝙪𝙧𝙖 𝙩𝙚 𝙢𝙤𝙣𝙩𝙧𝙚 𝙦𝙪'𝙚𝙡𝙡𝙚 𝙚𝙨𝙩 𝙗𝙞𝙚𝙣 𝙥𝙡𝙪𝙨 𝙦𝙪'𝙪𝙣𝙚 𝙣𝙞𝙣𝙟𝙖 𝙢𝗲́𝙙𝙚𝙘𝙞𝙣 ! ${winAmount}💲 𝙥𝙤𝙪𝙧 𝙩𝙤𝙞.`,
        `🌟 𝙎𝙖𝙠𝙪𝙧𝙖 𝙖 𝙙𝙚𝙨 𝙩𝙖𝙡𝙚𝙣𝙩𝙨 𝙘𝙖𝙘𝙝𝗲́𝙨, 𝙚𝙩 𝙩𝙤𝙞, 𝙩𝙪 𝙧𝙚𝙥𝙖𝙧𝙨 𝙖𝙫𝙚𝙘 ${winAmount}💲. 𝙀𝙡𝙡𝙚 𝙜𝗲̀𝙧𝙚 !`,
        `🍀 𝘽𝙧𝙖𝙫𝙤 ! 𝙎𝙖𝙠𝙪𝙧𝙖 𝙣𝙚 𝙩𝙚 𝙙𝗲́𝗰̧𝙤𝙞𝙩 𝙟𝙖𝙢𝙖𝙞𝙨. ${winAmount}💲 𝙙𝙖𝙣𝙨 𝙩𝙖 𝙥𝙤𝙘𝙝𝙚, ç𝙖 𝙛𝙖𝙞𝙩 𝙥𝙡𝙖𝙞𝙨𝙞𝙧, 𝙝𝙚𝙞𝙣 ?`
      ]
    };

    const loseMessages = {
      naruto: [
        "😐 𝙎𝗲́𝙧𝙞𝙚𝙪𝙭 ? 𝙏𝙪 𝙥𝙚𝙣𝙨𝙚𝙨 𝙦𝙪𝙚 𝙟'𝙖𝙡𝙡𝙖𝙞𝙨 𝙡𝙚 𝙛𝙖𝙞𝙧𝙚 𝙨𝙖𝙣𝙨 𝙢𝙚𝙨 𝙧𝙖𝙢𝙚𝙣 ? 𝙏'𝙖𝙨 𝙥𝙚𝙧𝙙𝙪 ${betAmount}💲. 𝙅𝙚 𝙫𝙖𝙞𝙨 𝙖𝙘𝙝𝙚𝙩𝙚𝙧 𝙙𝙚𝙨 𝙧𝙖𝙢𝙚𝙣 𝙖𝙫𝙚𝙘.",
        "🤣 𝙏'𝙖𝙨 𝙘𝙧𝙪 𝙦𝙪𝙚 𝙟'𝙖𝙡𝙡𝙖𝙞𝙨 𝙩𝙚 𝙡𝙖𝙞𝙨𝙨𝙚𝙧 𝙜𝙖𝙜𝙣𝙚𝙧 ? 𝙉𝙤𝙣, 𝙢𝙖𝙞𝙨 𝙡𝙤𝙡. 𝙈𝙚𝙧𝙘𝙞 𝙥𝙤𝙪𝙧 𝙡𝙚𝙨 ${betAmount}💲, ç𝙖 𝙥𝙖𝙞𝙚𝙧𝙖 𝙢𝙚𝙨 𝙧𝙖𝙢𝙚𝙣.",
        "😎 𝙀𝙨𝙨𝙖𝙮𝙚 𝙚𝙣𝙘𝙤𝙧𝙚, 𝙥𝙚𝙧𝙙𝙖𝙣𝙩 ! 𝙉𝙖𝙧𝙪𝙩𝙤 𝙧𝙚𝙨𝙩𝙚 𝙞𝙢𝙗𝙖𝙩𝙩𝙖𝙗𝙡𝙚. 𝘽𝙮𝙚-𝙗𝙮𝙚 ${betAmount}💲."
      ],
      sasuke: [
        "💀 𝙎𝙖𝙨𝙪𝙠𝙚, 𝙨𝗲́𝙧𝙞𝙚𝙪𝙭 ? 𝙈𝙖𝙪𝙫𝙖𝙞𝙨 𝙘𝙝𝙤𝙞𝙭, 𝙣𝙞𝙣𝙟𝙖. 𝙏𝙪 𝙫𝙞𝙚𝙣𝙨 𝙙𝙚 𝙥𝙚𝙧𝙙𝙧𝙚 ${betAmount}💲.",
        "⚡ 𝙎𝙖𝙨𝙪𝙠𝙚 𝙩𝙚 𝙧𝙚𝙜𝙖𝙧𝙙𝙚 𝙙𝙚 𝙝𝙖𝙪𝙩 𝙥𝙚𝙣𝙙𝙖𝙣𝙩 𝙦𝙪𝙚 𝙩𝙪 𝙥𝙚𝙧𝙙𝙨 ${betAmount}💲. 𝙅𝙚 𝙨𝙖𝙞𝙨...𝙘'𝙚𝙨𝙩 𝙪𝙣 𝙗𝗮̂𝙩𝙖𝙧𝙙",
        "🌀 𝙎𝙖𝙨𝙪𝙠𝙚 𝙩'𝙖 𝙡𝙖𝙞𝙨𝙨𝗲́ 𝙩𝙤𝙢𝙗𝙚𝙧. 𝙇𝙚 𝙘𝙤𝙣𝙣𝙖𝙧𝙙 ! 𝙄𝙡 𝙩'𝙖𝙨 𝙥𝙧𝙞𝙨 ${betAmount}💲."
      ],
      sakura: [
        "🌸 𝙏𝙪 𝙥𝙚𝙣𝙨𝙖𝙞𝙨 𝙦𝙪𝙚 𝙎𝙖𝙠𝙪𝙧𝙖 𝙖𝙡𝙡𝙖𝙞𝙩 𝙩𝙚 𝙨𝙖𝙪𝙫𝙚𝙧 ? 𝙎𝙚𝙧𝙞𝙚𝙪𝙨𝙚𝙢𝙚𝙣𝙩..𝙤𝙣 𝙥𝙖𝙧𝙡𝙚 𝙙𝙚 𝙨𝙖𝙠𝙪𝙧𝙖 ?𝙏'𝙖𝙨 𝙥𝙚𝙧𝙙𝙪 ${betAmount}💲.",
        "💢 𝙈𝗲̂𝙢𝙚 𝙖𝙫𝙚𝙘 𝙨𝙖 𝙛𝙤𝙧𝙘𝙚, 𝙎𝙖𝙠𝙪𝙧𝙖 𝙣'𝙖 𝙧𝙞𝙚𝙣 𝙥𝙪 𝙛𝙖𝙞𝙧𝙚. 𝘾'𝗲́𝙩𝙖𝙞𝙩 𝗲́𝙫𝙞𝙙𝙚𝙣𝙩. ${betAmount}💲 𝙚𝙣 𝙢𝙤𝙞𝙣𝙨 𝙥𝙤?
