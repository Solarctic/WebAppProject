document.addEventListener("DOMContentLoaded", function () {
  const dialogueText = document.getElementById("dialogue-text");
  const choices = document.querySelectorAll(".choice-btn");

  // Sample dialogue options
  const sampleDialogues = [
    "The witness's testimony clearly contradicts the evidence! What will you do?",
    "Hold it! That last statement doesn't make sense with what we know.",
    "The defense is ready, Your Honor. We have new evidence to present.",
    "Take that! The truth will always prevail in the court of law!",
  ];

  // Add click handlers to choices
  choices.forEach((choice) => {
    choice.addEventListener("click", function () {
      // Random response for demo purposes
      const randomDialogue =
        sampleDialogues[Math.floor(Math.random() * sampleDialogues.length)];

      dialogueText.textContent = randomDialogue;
    });
  });
});
