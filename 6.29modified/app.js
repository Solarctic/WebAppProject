document.addEventListener("DOMContentLoaded", function () {
  const dialogueText = document.getElementById("dialogue-text");
  const choices = document.querySelectorAll(".choice-btn");
  const videoElement = document.getElementById("video-container");
  const bgMusic = new Audio("court.mp3");

  const story = [
    { video: "start.mp4", text: "click to start" },
    { video: "1.mp4", text: "This is text on 1.mp4" },
    { video: "2.mp4", text: "This is text on 2.mp4" },
    { video: "3.mp4", text: "This is text on 3.mp4" },
    { video: "end.mp4", text: "The End." },
  ];

  let currentIndex = 0;
  let musicStarted = false;

  function updateScene() {
    const currentScene = story[currentIndex];
    dialogueText.textContent = currentScene.text;
    videoElement.src = currentScene.video;
    videoElement.currentTime = 0;
    videoElement.loop = false;
    videoElement.play();
  }

  videoElement.addEventListener("click", () => {
    if (currentIndex < story.length - 1) {
      currentIndex++;
      updateScene();

      if (!musicStarted) {
        musicStarted = true;
        bgMusic.loop = true;
        bgMusic.play().catch(() => {
          console.log("Background music autoplay prevented");
        });
      }
    } else {
      videoElement.removeEventListener("click", arguments.callee);
      dialogueText.textContent = "end";
    }
  });

  const sampleDialogues = [
    "The witness's testimony clearly contradicts the evidence! What will you do?",
    "Hold it! That last statement doesn't make sense with what we know.",
    "The defense is ready, Your Honor. We have new evidence to present.",
    "Take that! The truth will always prevail in the court of law!",
  ];

  choices.forEach((choice) => {
    choice.addEventListener("click", function () {
      const randomDialogue =
        sampleDialogues[Math.floor(Math.random() * sampleDialogues.length)];
      dialogueText.textContent = randomDialogue;
    });
  });

  updateScene();
});
