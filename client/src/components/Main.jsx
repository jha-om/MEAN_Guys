import React, { useState, useRef, useEffect } from "react";
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
  const [longlat, setLongLat] = useState({
    long: "",
    lat: "",
  });
  // const getLocationRef = useRef(null);

  useEffect(() => {
    function showPosition(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      const accuracy = position.coords.accuracy;

      const output = `
          Latitude: ${latitude}
          Longitude: ${longitude}
          Accuracy: ${accuracy} meters
        `;

      console.log(output);
      setLongLat({
        long: longitude,
        lat: latitude,
      });
    }

    function showError(error) {
      switch (error.code) {
        case 1:
          alert("Permission denied.");
          break;
        case 2:
          alert("Position unavailable.");
          break;
        case 3:
          alert("Timeout.");
          break;
        default:
          alert("Unknown error.");
      }
    }
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  }, []);

  function openGoogleMapsWithLatitudeAndLongitude(latitude, longitude) {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;
    window.open(url, "_blank");
  }

  function openGoogleMapsWithLatitudeAndLongitudeAndSearchHosp(lat, long) {
    const url = `https://www.google.com/maps/search/?api=1&query=hospitals+24/7+near+me+&destination=${lat},${long}`;
    setTimeout(() => {
      window.open(url, "_blank");
    }, 1500);
  }

  const handleGeoHospClick = () => {
    openGoogleMapsWithLatitudeAndLongitudeAndSearchHosp(
      longlat.lat,
      longlat.long
    );
  };
  const handleGeoClick = () => {
    openGoogleMapsWithLatitudeAndLongitude(longlat.lat, longlat.long);
  };

  const handleSend = async () => {
    const res = await sendMessagetoOpenAI(input);
    setMessages([
      ...messages,
      { text: input, isBot: false },
      { text: res, isBot: true },
    ]);
  };

  return (
    <div className="main">
      <div className="chats">
        {messages.map((message, i) => {
          return (
            <>
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
            </>
          );
        })}
      </div>
      <div className="chatFooter">
        <div className="locations">
          <button
            // ref={getLocationRef}
            onClick={handleGeoHospClick}
            className="navigateMe"
            id="getLocation">
            Get Hospitals nearby !
          </button>
          <button
            // ref={getLocationRef}
            onClick={handleGeoClick}
            className="navigateMe"
            id="getLocation">
            Get your location !
          </button>
        </div>
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
