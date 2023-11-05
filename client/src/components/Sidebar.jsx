import React from "react";
import Logo from "../assets/logo.png";
import AddButton from "../assets/add-30.png";
import MssgButton from "../assets/message.svg";
import HomeButton from "../assets/home.svg";
import SaveButton from "../assets/bookmark.svg";
import RocketButton from "../assets/rocket.svg";

const Sidebar = () => {
  return (
    <div className="sideBar">
      <div className="upperSide">
        <div className="upperSide__top">
          <img src={Logo} className="logo" alt="logo" />{" "}
          <span className="brand">Health GPT</span>
        </div>
        <button className="midButton">
          <img src={AddButton} alt="" className="addButton" />
          New Chat
        </button>
        <div className="upperSide__bottom">
          <button className="query">
            <img src={MssgButton} alt="Query" />
            Dummy Question ?
          </button>
          <button className="query">
            <img src={MssgButton} alt="Query" />
            How to use this APP ?
          </button>
        </div>
      </div>
      <div className="lowerSide">
        <div className="listItems">
          <img src={HomeButton} alt="" className="listItemsImg" />
          Home
        </div>
        <div className="listItems">
          <img src={SaveButton} alt="Save item" className="listItemsImg" />
          Save
        </div>
        <div className="listItems">
          <img
            src={RocketButton}
            alt="upgrade to premium icon"
            className="listItemsImg"
          />
          Upgrade to Premium
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
