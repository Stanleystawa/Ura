export const setup = {
  name: "neon",
  version: "40.0.3",
  permission: "Users",
  creator: "John Lester",
  description: "Neon Text Effect",
  category: "Text Generation",
  usages: ["[text]"],
  mainScreenshot: ["/media/neon/screenshot/main.jpg"],
  screenshot: ["/media/neon/screenshot/main.jpg"],
  cooldown: 5,
  isPrefix: true
};
export const domain = {"neon": setup.name}
export const execCommand = async function({api, event, key, kernel, umaru, args, Users, context}) {
  await umaru.createJournal(event);
  let text = args.join(" ");
  if(args.length === 0) text = await Users.getName(event.senderID);
  return api.sendMessage({body: context, attachment: await kernel.readStream(["neon"], {key: key, text: text})}, event.threadID, async() => {
    await umaru.deleteJournal(event);
  }, event.messageID)
}