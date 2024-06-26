export const setup = {
  name: "jojo",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Jojo ask about photo",
  category: "Image Generation",
  usages: ["","[userID]","[@mention]"],
  mainScreenshot: ["/media/jojo/screenshot/main.jpg"],
  screenshot: ["/media/jojo/screenshot/1.jpg","/media/jojo/screenshot/2.jpg","/media/jojo/screenshot/3.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"jojo": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let mentions = Object.keys(event.mentions);
  (mentions.length === 0 && /^[0-9]+$/.test(args[0])) ? mentions[0] = args[0]: (event.type == "message_reply" && event.messageReply.attachments.length !== 0 && event.messageReply.attachments[0].type == "photo") ? "" : (event.type == "message_reply") ? mentions[0] = event.messageReply.senderID : (mentions.length === 0) ? mentions[0] = event.senderID: mentions[0] = mentions[0];
  return api.sendMessage({body: context, attachment: await kernel.readStream(["jojo"], {key: key, targetID: (event.type == "message_reply" && event.messageReply.attachments.length !== 0 && event.messageReply.attachments[0].type == "photo") ? await kernel.readImageFromURL(event.messageReply.attachments[0].url) :await Users.getImage(mentions[0])})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}