document.addEventListener("DOMContentLoaded", function () {
  const storyElement = document.getElementById("story-text");
  const videoElement = document.getElementById("next-video");
  const startBtn = document.getElementById("start-btn");
  const bgMusic = document.getElementById("bg-music");
  const choices = document.querySelectorAll(".choice-btn");

  // Sample dialogue options
  const sampleDialogues = [
    "The witness's testimony clearly contradicts the evidence! What will you do?",
    "Hold it! That last statement doesn't make sense with what we know.",
    "The defense is ready, Your Honor. We have new evidence to present.",
    "Take that! The truth will always prevail in the court of law!",
  ];

  // Story video sequence
  const story = [
    { video: "1.mp4", text: "This is a test dialogue for each scene!" },
    { video: "2.mp4", text: "This is also another text dialogue?" },
    { video: "3.mp4", text: "Objectionnnnnnnnnnnnnnnn." },
    { video: "end.mp4", text: "Justice has been served. The trial ends." },
  ];

  let currentIndex = 0;

  function typeText(text, element, speed = 30) {
    element.textContent = "";
    let i = 0;
    const interval = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  // TODO: can you check this function because the first video 1.mp4 doesnt play
  function updateScene() {

    //comment this out if you dont want music
    bgMusic.play().catch(() => {
      console.log("Background music autoplay prevented");
    });

    const currentScene = story[currentIndex];
    videoElement.src = currentScene.video;
    videoElement.currentTime = 0;
    videoElement.loop = false;
    videoElement.play();

    if (currentScene.text) {
      typeText(currentScene.text, storyElement, 30);
    } else {
      storyElement.textContent = "";
    }
  }

  // Advance story on video click
  videoElement.addEventListener("click", function handleVideoClick() {
    if (currentIndex < story.length - 1) {
      currentIndex++;
      updateScene();
    } else {
      videoElement.removeEventListener("click", handleVideoClick);
    }
  });

  // Start button
  startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    videoElement.style.display = "block";
    bgMusic.play().catch(() => {
      console.log("Background music autoplay prevented");
    });
    updateScene();
  });


  //broke this function....
  // Now handle choice buttons click
  choices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
      // Show a random dialogue first
      const randomDialogue =
        sampleDialogues[Math.floor(Math.random() * sampleDialogues.length)];
      storyElement.textContent = randomDialogue;
      setTimeout(() => {
        currentIndex = index + 1; // Adjust index if needed to match your story array
        updateScene();
      }, 2000);
    });
  });
});
