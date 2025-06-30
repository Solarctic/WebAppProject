const story = [
  {
    video: "1.mp4",
  },
  {
    video: "2.mp4",
  },
  {
    video: "3.mp4",
  },
  {
    video: "end.mp4",
  },
];

let currentIndex = 0;

const storyElement = document.getElementById("story-text");
const videoElement = document.getElementById("next-video");
const startBtn = document.getElementById("start-btn");
const bgMusic = document.getElementById("bg-music");

  function updateScene() {
    const currentScene = story[currentIndex];

    storyElement.textContent = "";

    videoElement.src = currentScene.video;
    videoElement.currentTime = 0;
    videoElement.loop = false;

    videoElement.addEventListener(
      "loadedmetadata",
      () => {
        if (currentScene.text) {
          typeText(currentScene.text, storyElement, 30);
        } else {
          storyElement.textContent = "";
        }
        videoElement.play();
      },
      { once: true }
    );
  }

  function typeText(text, element, speed = 30) {
    element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

videoElement.addEventListener("click", () => {
  if (currentIndex < story.length - 1) {
    currentIndex++;
    updateScene();
  } else {
    videoElement.removeEventListener("click", arguments.callee);
  }
});

startBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  videoElement.style.display = "block";
  bgMusic.play().catch(() => {
    console.log("Background music autoplay prevented");
  });
  updateScene();
});
