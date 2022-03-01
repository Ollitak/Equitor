import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";

import "./styles/bottomBar.css";

const BottomBar = () => {
  const [chatMenuShow, setChatMenuShow] = useState(false);

  const setChatMenu = () => {
    setChatMenuShow(!chatMenuShow);
  };

  return (
    <Menu secondary fixed="bottom" className="br-container">
      {chatMenuShow ? (
        <div className="br-chat-menu-container">
          <div className="br-chat-menu-top-container">
            <h1 className="br-chat-menu-title">MESSAGE MENU</h1>
            <Icon
              name="angle down"
              onClick={setChatMenu}
              size="big"
              className="br-chat-menu-icon"
            />
          </div>
          <button className="br-chat-menu-button">asdasd</button>
          <button className="br-chat-menu-button">asdasd</button>
        </div>
      ) : (
        <button className="br-open-chat-menu-button" onClick={setChatMenu}>
          MESSAGES
          <Icon name="angle up" className="br-open-chat-menu-button-icon" />
        </button>
      )}
    </Menu>
  );
};

export default BottomBar;
