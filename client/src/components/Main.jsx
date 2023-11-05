import React, { useState } from "react";
import SendButton from "../assets/send.svg";
import UserIcon from "../assets/user-icon.png";
import GPTImgLogo from "../assets/chatgptLogo.svg";
import { sendMessagetoOpenAI } from "../openai";

const Main = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi I am Health GPT, state of art model developed by 3 DTUites",
      isBot: true,
    },
  ]);

  const handleSend = async () => {
    const res = await sendMessagetoOpenAI(input);
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: res, isBot: true },
    ]);
    console.log(res, "::res");
  };

  return (
    <div className="main">
      <div className="chats">
        {messages.map((message, i) => {
          return (
            <div key={i} className={message.isBot ? "chat bot" : "chat"}>
              <img
                src={message.isBot ? GPTImgLogo : UserIcon}
                className="chatImage"
                alt=""
              />
              <span className="txt">
                {message.text.split("•").map((txt, i) => {
                  return <p key={i}>{`${txt}`}</p>;
                })}
              </span>
            </div>
          );
        })}
      </div>
      <div className="chatFooter">
        <div className="input">
          <input
            placeholder="Send a message"
            type="text"
            name=""
            id=""
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              console.log(input.toString());
            }}
          />{" "}
          <button className="send" onClick={handleSend}>
            <img src={SendButton} alt="send" />
          </button>
        </div>
        <p>
          Dummy GPT may produce inaccurate information about people, places or
          facts.{" "}
        </p>
      </div>
    </div>
  );
};

export default Main;
