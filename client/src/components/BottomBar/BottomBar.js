import React, { useState, useEffect } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { initializeUsers } from "../../reducers/usersReducer";
import Select from "react-select";

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

const BottomBar = () => {
  const [chatMenuShow, setChatMenuShow] = useState(false);
  const [chatShow, setChatShow] = useState({
    username: null,
    id: null,
    showButton: false,
    showChat: false
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const users = useSelector((state) => state.users);

  // Fetch all users
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  if (!user || !users) return null;

  const openNewChat = (username, id) => {
    setChatMenuShow(false);
    setChatShow({ username, id, showButton: true, showChat: true });
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

const ChatBox = ({ chatShow, setChatShow, user }) => {
  const [message, setMessage] = useState("");

  if (!chatShow.username || !chatShow.id) {
    return null;
  }

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const addMessage = (event) => {
    event.preventDefault();
    console.log("ADDING MESSAGE: " + message);
    setMessage("");
  };

  const minimizeAndExpandChat = () => {
    setChatShow({ ...chatShow, showChat: !chatShow.showChat });
  };

  if (chatShow.showChat) {
    return (
      <div className="br-chatbox-container">
        <div className="br-chat-top-container">
          <h1 className="br-chat-title">{`${chatShow.username}`}</h1>
          <Icon
            name="angle down"
            onClick={minimizeAndExpandChat}
            size="big"
            className="br-chat-menu-icon"
          />
        </div>
        <Chat username={chatShow.username} id={chatShow.id} user={user} />
        <form onSubmit={addMessage}>
          <input value={message} onChange={handleInputChange}></input>
          <button type="submit">Send</button>
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

const Chat = ({ username, id, user }) => {
  var messages = null;

  user.chat.forEach((c) => {
    if (c.receiver.id === id) {
      messages = c.messages;
    }
  });

  console.log(messages);

  if (!messages) {
    return null;
  }
  return (
    <div className="br-chat-container">
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
