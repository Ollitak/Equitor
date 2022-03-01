/** Module defines API endpoints that control chat messages. */

const messageRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

/** POST endpoint to save a chat message to database.  */

messageRouter.post("/", middleware.userExtractor, async (req, res, next) => {
  const body = req.body;
  const receiverId = body.receiverId;

  const sender = req.user;
  const receiver = await User.findById(receiverId);

  var chatSender = sender.chat;
  var chatReceiver = receiver.chat;

  const newMessage = {
    sender: sender._id,
    content: body.content,
    isRead: false
  };

  // If users have chatted before, add a new message to the chat
  var chattedBefore = false;
  chatSender.forEach((singleChat) => {
    if (singleChat.receiver._id.toString() === receiverId) {
      chattedBefore = true;
      singleChat.messages = singleChat.messages.concat(newMessage);
    }
  });

  // Also add new message for the receiver
  chatReceiver.forEach((singleChat) => {
    if (singleChat.receiver._id.toString() === sender._id.toString()) {
      chattedBefore = true;
      singleChat.messages = singleChat.messages.concat(newMessage);
    }
  });

  // If users have not chatted before, create a new chat
  if (!chattedBefore) {
    chatSender = chatSender.concat({
      receiver: receiver._id,
      messages: [newMessage]
    });
    chatReceiver = chatReceiver.concat({
      receiver: sender._id,
      messages: [newMessage]
    });
  }

  console.log(chatSender);

  try {
    const updatedSender = await User.findByIdAndUpdate(
      sender._id,
      { chat: chatSender },
      { new: true }
    );
    const updatedReceiver = await User.findByIdAndUpdate(
      receiver._id,
      { chat: chatReceiver },
      { new: true }
    );

    if (!updatedSender || !updatedReceiver) {
      return res.status(400).send({ error: "User update unsuccessful" });
    }

    res.json(updatedSender);
  } catch (e) {
    next(e);
  }
});

module.exports = messageRouter;
