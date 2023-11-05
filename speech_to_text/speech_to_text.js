const recognition = new webkitSpeechRecognition();
const transcriptElement = document.getElementById("transcript");
const startButton = document.getElementById("start-button");

recognition.continuous = true;
recognition.lang = "en-US";

startButton.addEventListener("click", () => {
  recognition.start();
});

recognition.onresult = (event) => {
  let transcript = "";

  for (let i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      transcript += event.results[i][0].transcript;
    } else {
      transcript += event.results[i][0].transcript + " ";
    }
  }

  transcriptElement.textContent = transcript;
};

recognition.onerror = (event) => {
  console.error("Error:", event.error);
};
