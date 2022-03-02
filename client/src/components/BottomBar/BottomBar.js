import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../../reducers/usersReducer";
import Select from "react-select";
import { addMessage } from "../../reducers/userReducer";

import "./styles/bottomBar.css";

/** Custom styles object for react-select. */

const selectCustomStyle = {
  menu: (provided) => ({
    ...provided,
    backgroundColor: "rgb(48, 48, 48)",
    border: "0.5px solid white"
  }),
  option: (provided) => ({
    ...provided,
    borderBottom: "0.5px solid white",
    color: "white",
    padding: 10,
    backgroundColor: "rgb(48, 48, 48)"
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    borderRadius: 0
  }),
  input: (provided) => ({
    ...provided,
    color: "white"
  }),
  singleValue: (provided) => {
    const color = "white";
    return { ...provided, color };
  }
};

/** Component renders a bar that is fixed on the bottom of the view. On launch, the bar has a
 *  button, that renders a message menu, where user can start a chat with another user.
 *  When user clicks another user to start chatting, a new chat window is rendered next to the
 *  menu window.
 *
 *  Both the menu window and chat window can be minimized and expanded by clicking the arrow icon.
 *  Only one chat window can be open at a time.
 *  User needs to be logged in for BottomBar to render.
 */

const BottomBar = () => {
  /* Is menu window open or closed? */
  const [chatMenuShow, setChatMenuShow] = useState(false);

  /* When user select another user to chat with, chatShow indicates the username and id of that user
   * and whether the chat window is open or closed.
   */
  const [chatShow, setChatShow] = useState({
    username: null,
    id: null,
    showChat: false
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // current user has all chat messages stored in chat property
  var users = useSelector((state) => state.users); // users is used to list possible chat targets

  // Fetch all users
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user || !users) return null;

  // Remove currently logged user from users i.e. user can't chat with himself
  users = users.filter((u) => u.id !== user.id);

  // Open new chat window with the user defined in function parameters. Also, close the menu window.
  const openNewChat = (username, id) => {
    setChatMenuShow(false);
    setChatShow({ username, id, showChat: true });
  };

  return (
    <Menu secondary fixed="bottom" className="br-container">
      <MenuBox
        chatMenuShow={chatMenuShow}
        setChatMenuShow={setChatMenuShow}
        openNewChat={openNewChat}
        user={user}
        users={users}
      />
      <ChatBox chatShow={chatShow} setChatShow={setChatShow} user={user} />
    </Menu>
  );
};

/** MenuBox is used to render a menu window that allows user to pick another user to chat with.
 * @param {string} chatMenuShow indicates if chat menu is minimized or expanded
 * @param {function} setChatMenuShow used to set chatMenuShow true or false
 * @param {function} openNewChat used to open new chat when user is selected in menu window
 * @param {object} user details of the current user
 * @param {array} users list of all equitor users
 */

const MenuBox = ({ chatMenuShow, setChatMenuShow, openNewChat, user, users }) => {
  const setChatMenu = () => {
    setChatMenuShow(!chatMenuShow);
  };

  if (chatMenuShow) {
    return (
      <div className="br-chat-menu-container">
        <div className="br-chat-menu-top-container">
          <h1 className="br-chat-menu-title">MESSAGE MENU</h1>
          <Icon name="angle down" onClick={setChatMenu} size="big" className="br-chat-menu-icon" />
        </div>
        <h2 className="br-chat-menu-subtitle">SELECT USER & START CHATTING</h2>
        <div className="br-chat-menu-select-container">
          <Select
            styles={selectCustomStyle}
            options={users.map((u) => ({ label: u.username, value: u.id }))}
            onChange={(vals) => openNewChat(vals.label, vals.value)}
          />
        </div>
        <h2 className="br-chat-menu-subtitle">PREVIOUS CHATS</h2>
        {user.chat.map((c, id) => (
          <button
            key={id}
            className="br-chat-menu-button"
            onClick={() => openNewChat(c.receiver.username, c.receiver.id)}>
            {c.receiver.username}
          </button>
        ))}
      </div>
    );
  } else {
    return (
      <button className="br-open-chat-menu-button" onClick={setChatMenu}>
        MESSAGE MENU
        <Icon name="angle up" className="br-open-chat-menu-button-icon" />
      </button>
    );
  }
};

/** ChatBox is used to render a chat window.
 * @param {string} chatShow is chat window open or closed? Also, includes id and username of the chat friend
 * @param {function} setChatShow to modify chatShow (in this function used to etiher minimize or expand window)
 * @param {object} user details of the current user
 */

const ChatBox = ({ chatShow, setChatShow, user }) => {
  const [chatMessage, setChatMessage] = useState("");
  const dispatch = useDispatch();

  if (!chatShow.username || !chatShow.id) {
    return null;
  }

  const handleInputChange = (event) => {
    setChatMessage(event.target.value);
  };

  const handleAddMessage = (event) => {
    event.preventDefault();
    dispatch(addMessage(chatShow.id, chatMessage));
    setChatMessage("");
  };

  const minimizeAndExpandChat = () => {
    setChatShow({ ...chatShow, showChat: !chatShow.showChat });
  };

  if (chatShow.showChat) {
    return (
      <div className="br-chatbox-container">
        <div className="br-chatbox-top-container">
          <h1 className="br-chatbox-title">{`${chatShow.username}`}</h1>
          <Icon
            name="angle down"
            onClick={minimizeAndExpandChat}
            size="big"
            className="br-chat-menu-icon"
          />
        </div>
        <ChatArea username={chatShow.username} id={chatShow.id} user={user} />
        <form onSubmit={handleAddMessage} className="br-chatbox-form-area-container">
          <textarea
            className="br-chatbox-input"
            value={chatMessage}
            onChange={handleInputChange}
            type="text"
            placeholder={"Write a new message..."}></textarea>
          <button className="br-chatbox-send-button" type="submit">
            SEND
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <button className="br-open-chat-button" onClick={minimizeAndExpandChat}>
        {chatShow.username}
        <Icon name="angle up" className="br-open-chat-menu-button-icon" />
      </button>
    );
  }
};

/** Render the chat messages
 *  @param {String} username username of the chatting friend
 *  @param {String} id id of the chatting friend
 *  @param {String} user current user
 */

const ChatArea = ({ username, id, user }) => {
  var messages = null;

  user.chat.forEach((c) => {
    if (c.receiver.id === id) {
      messages = [...c.messages];
    }
  });

  // If users have not yet messaged with each other, render only the container div
  if (!messages) {
    return <div className="br-chatbox-message-area-container" />;
  }

  /** In order to keep ChatArea scrolled down as a default functionality, chat area is reversed
   *  in CSS (see class named .br-chatbox-message-area-container). Thus, messages are reversed
   *  to show the most recent message on bottom.
   */

  messages = messages.reverse();

  return (
    <div className="br-chatbox-message-area-container">
      {messages.map((m, id) => (
        <SingleMessage key={id} content={m.content} sender={m.sender} user={user} />
      ))}
    </div>
  );
};

const SingleMessage = ({ content, sender, user }) => {
  if (sender.username === user.username) {
    return (
      <div className="br-single-message-own-container">
        <div className="br-single-message-own">{content}</div>
      </div>
    );
  } else {
    return (
      <div className="br-single-message-friend-container">
        <div className="br-single-message-friend">{content}</div>
      </div>
    );
  }
};

export default BottomBar;
