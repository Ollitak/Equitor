import React from "react";
import "./TopSection.css";
import { Link } from "react-router-dom";
import analysesService from "../services/analyses";


const text = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const OnLoggedIn = ({ setUser }) => {
  const logOut = () => {
    analysesService.setToken(null);
    window.localStorage.clear();
    setUser("");
  };

  return(
    <div className={"button-container"}>
      <Link to="/create-analysis">
        <button className={"button"}> Create analysis </button>
      </Link>
      <button className={"button"} onClick={logOut}> Log out </button>
    </div>
  );
};

const OnLoggedOut = () => {
  return(
    <div className={"button-container"}>
      <Link to="/login">
        <button className={"button"}> Log in</button>
      </Link>
      <Link to="/createaccount">
        <button className={"button"}> Create account</button>
      </Link>
    </div>
  );
};


const TopSection = ({ user, setUser }) => {
  return(
    <div className={"image-container"}>
      <div className={"content-container"}>
        <div className={"top-text-container"}>
          <p>{text}</p>
        </div>
        {user ? <OnLoggedIn setUser={setUser} /> : <OnLoggedOut />}
      </div>
    </div>
  );

};

export default TopSection;