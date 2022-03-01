/** Module creates Mongoose schema for users and exports corresponding Mongoose model. */

const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  analyses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Analysis"
    }
  ],
  chat: [
    {
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
      },
      messages: [
        {
          sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
          },
          content: {
            type: String,
            required: true
          },
          isRead: {
            type: Boolean,
            required: true
          }
        }
      ]
    }
  ]
});

/** Serialization logic for MongoDB objects to JSON.
 *  Multiple id fields are deleted if they are not needed.
 */

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    if (returnedObject.chat)
      returnedObject.chat.forEach((c) => {
        delete c._id;
        c.messages.forEach((m) => {
          delete m._id;
        });
      });

    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

module.exports = mongoose.model("User", userSchema);
