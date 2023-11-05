
import React, { useState, useRef, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import SendButton from "../assets/send.svg";
import UserIcon from "../assets/user-icon.png";
import GPTImgLogo from "../assets/logoIcon.png";
import { sendMessagetoOpenAI } from "../openai";
import MicIcon from "../assets/microphone.png";

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
  const chatsRef = useRef(null);
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

      // console.log(output);
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

  const transcriptElementRef = useRef(null);
  const startButtonRef = useRef(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

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
    searchVideos(input);
  };

  function searchVideos(text) {
    const searchQuery = text;
    console.log(searchQuery);

    // Your API key (replace 'YOUR_API_KEY' with your actual API key)
    const apiKey = "AIzaSyDgVFyVusbs1qhmLYLe3qFRfPpPHoPqOMs";

    const popa = `medical first aid in the following situation: ${searchQuery}`;

    // API request URL to search for videos based on the search query
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${popa}&maxResults=4`;

    // Fetch the video data
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        displayVideos(data.items);
      })
      .catch((error) => console.error("Error fetching videos:", error));
  }
  // Function to display the retrieved videos
  function displayVideos(videos) {
    const videoList = document.getElementById("videoList");
    videoList.innerHTML = ""; // Clear previous results

    videos.forEach((video) => {
      const videoId = video.id.videoId;
      const videoTitle = video.snippet.title;

      // Display each video as an embedded iframe
      const iframe = document.createElement("iframe");
      iframe.width = 560;
      iframe.height = 315;
      iframe.src = `https://www.youtube.com/embed/${videoId}`;
      iframe.title = videoTitle;
      iframe.allowFullscreen = true;

      // Add the video iframe to the videoList div
      videoList.appendChild(iframe);

      // Storing data in local storage
      localStorage.setItem("cachedData", "some data to be cached");

      // After 10 seconds, remove the data from local storage
      setTimeout(function () {
        localStorage.removeItem("cachedData");
      }, 1000); // 10000 milliseconds = 10 seconds
    });
  }

  return (
    <div className="main">
      <div className="chats" ref={chatsRef}>
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
        <div id="videoList"></div>
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
            ref={transcriptElementRef}
            placeholder="Send a message"
            type="text"
            name=""
            id=""
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // console.log(input.toString());
            }}
          />{" "}
          <button
            id="start-button"
            ref={startButtonRef}
            onTouchStart={SpeechRecognition.startListening}
            onMouseDown={SpeechRecognition.startListening}
            onTouchEnd={SpeechRecognition.stopListening}
            onMouseUp={SpeechRecognition.stopListening}
            onClick={() => {
              // handleSpeechRecognition();
              setInput(transcript);
              console.log(listening);
            }}>
            <img src={MicIcon} alt="" />
          </button>
          <button className="send" onClick={handleSend}>
            <img src={SendButton} alt="send" />
          </button>
        </div>
        <p>
          Health GPT may produce inaccurate information about people, places or
          facts.{" "}
        </p>
      </div>
    </div>
  );
};

export default Main;
