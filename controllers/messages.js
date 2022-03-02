/** Module defines API endpoints that control chat messages. */

const messageRouter = require("express").Router();
const User = require("../models/user");
const middleware = require("../utils/middleware");

/** POST endpoint to save a chat message to database.
 *  Chat messages are stored to the User collection. Each user document has a list of chats with
 *  users they have chatted before. Each chat has property for receiver user as well as list of
 *  chat messages. Post endpoint retreives both the sender user and receiver user and saves the new
 *  chat message for both users. If users don't have chatted before (i.e. no open chats yet), a
 *  whole new chat property is created.
 */

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

  // Check if the users have chatted before. If so, add a new message to that chat
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

  // If users have not chatted before, create a new chat for both users
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

  try {
    const updatedSender = await User.findByIdAndUpdate(
      sender._id,
      { chat: chatSender },
      { new: true }
    )
      .populate("chat.receiver", "username id")
      .populate("chat.messages.sender", "username id");

    const updatedReceiver = await User.findByIdAndUpdate(
      receiver._id,
      { chat: chatReceiver },
      { new: true }
    )
      .populate("chat.receiver", "username id")
      .populate("chat.messages.sender", "username id");

    if (!updatedSender || !updatedReceiver) {
      return res.status(400).send({ error: "User update unsuccessful" });
    }

    res.json(updatedSender);
  } catch (e) {
    next(e);
  }
});

module.exports = messageRouter;
