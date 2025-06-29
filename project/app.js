document.addEventListener("DOMContentLoaded", function () {
  // Get DOM elements
  const storyElement = document.getElementById("dialogue-text");
  const videoElement = document.getElementById("video-container");
  const bgMusic = document.getElementById("bg-music");
  const choices = document.querySelectorAll(".choice-btn");
  const speakerName = document.getElementById("speaker-name");

  // Values
  let currentIndex = 0;
  let typewriterInterval;
  let isChoosing = false;

  // Story data
  const story = [
    {
      video: "1.mp4",
      speaker: "Phoenix Wright",
      text: "The court finds the defendant... Wait, this can't be right!",
      choices: [
        "Examine Evidence",
        "Question Witness",
        "Present Profile",
        "Object Now!",
      ],
      responses: [
        "This evidence clearly shows inconsistencies in the testimony!",
        "Your testimony contradicts the coroner's report!",
        "The defendant's profile shows no history of violence!",
        "OBJECTION! The prosecution's argument has fatal flaws!",
      ],
    },
    {
      video: "2.mp4",
      speaker: "Miles Edgeworth",
      text: "The prosecution's case is airtight. What will you do?",
      choices: [
        "Press Testimony",
        "Analyze Scene",
        "Challenge Claim",
        "Demand Proof",
      ],
      responses: [
        "The witness is clearly hiding something!",
        "The crime scene photos tell a different story!",
        "That claim contradicts the forensic evidence!",
        "Where's the concrete evidence for that assertion?",
      ],
    },
    {
      video: "3.mp4",
      speaker: "Judge",
      text: "The court will hear your final argument.",
      choices: [
        "Present Truth",
        "Reveal Culprit",
        "Expose Lies",
        "Final Objection",
      ],
      responses: [
        "The truth points to someone else entirely!",
        "The real culprit is in this courtroom right now!",
        "These lies have gone on long enough!",
        "OBJECTION! The defense has proven its case!",
      ],
    },
    {
      video: "end.mp4",
      speaker: "Judge",
      text: "Court is adjourned. The defendant is... NOT GUILTY!",
      choices: [],
      responses: [],
    },
  ];

  // Clear typewriter effect
  function clearTypewriter() {
    if (typewriterInterval) {
      clearInterval(typewriterInterval);
    }
  }
  // Typewriter effect for dialogue
  function typeText(text, speed = 30) {
    clearTypewriter();
    storyElement.textContent = "";

    let i = 0;
    typewriterInterval = setInterval(() => {
      if (i < text.length) {
        storyElement.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, speed);
  }

  // Update the scene with current story data
  function updateScene() {
    isChoosing = false;
    // Get a index of the story
    const currentScene = story[currentIndex];

    // Update video
    videoElement.src = currentScene.video;
    // Reset to zero
    videoElement.currentTime = 0;
    videoElement.play();

    // Update speaker and text
    speakerName.textContent = currentScene.speaker;
    typeText(currentScene.text);

    // Update choices
    choices.forEach((choice, index) => {
      if (index < currentScene.choices.length) {
        choice.textContent = currentScene.choices[index];
        choice.style.display = "block";
        choice.disabled = false;
      } else {
        // Hide it
        choice.style.display = "none";
      }
    });
  }

  // Start Function
  function startGame() {
    bgMusic.play();

    // Hide all choices
    choices.forEach((choice) => {
      choice.style.display = "none";
    });

    updateScene();
  }

  // Handle choice selection
  choices.forEach((choice, index) => {
    choice.addEventListener("click", () => {
      const currentScene = story[currentIndex];
      if (index >= currentScene.responses.length) return;

      isChoosing = true;

      // Disable all choices during response
      choices.forEach((btn) => {
        btn.disabled = true;
      });

      // Dialogue typing
      clearTypewriter();
      typeText(currentScene.responses[index]);
      speakerName.textContent = "Player";

      // Set a timer before move to next scene
      setTimeout(() => {
        if (currentIndex < story.length - 1) {
          currentIndex++;
          updateScene();
        }
      }, 3500);
    });
  });

  // Start the game
  startGame();
});
