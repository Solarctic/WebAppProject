// Get DOM elements
const storyElement = document.getElementById('dialogue-text')
const videoElement = document.getElementById('video-container')
const bgMusic = document.getElementById('bg-music')
const choices = document.querySelectorAll('.choice-btn')
const speakerName = document.getElementById('speaker-name')

// Current story index and state
let currentIndex = 0
let typewriterInterval
let isChoosing = false

// Story data
const story = [
  {
    video: '/beginning.mp4', // 新增开头视频
    speaker: 'Narrator',
    text: 'Welcome to the court. Prepare for the adventure.',
    choices: [], // 无按钮，点击视频推进
    responses: [],
  },
  {
    video: '/1.mp4',
    speaker: 'Phoenix Wright',
    text: "The court finds the defendant... Wait, this can't be right!",
    choices: [], // 还是无按钮，点击视频推进
    responses: [],
  },
  {
    video: '/2.mp4',
    speaker: 'Miles Edgeworth',
    text: "The prosecution's case is airtight. What will you do?",
    choices: ['Press Testimony', 'Analyze Scene', 'Challenge Claim', 'Object Now!'],
    responses: [
      'The witness is clearly hiding something!',
      'The crime scene photos tell a different story!',
      'That claim contradicts the forensic evidence!',
      "OBJECTION! The prosecution's argument has fatal flaws!",
    ],
  },
  {
    video: '/3.mp4',
    speaker: 'Judge',
    text: 'The court will hear your final argument.',
    choices: ['Present Truth', 'Reveal Culprit', 'Expose Lies', 'Final Objection'],
    responses: [
      'The truth points to someone else entirely!',
      'The real culprit is in this courtroom right now!',
      'These lies have gone on long enough!',
      'OBJECTION! The defense has proven its case!',
    ],
  },
  {
    video: '/end.mp4',
    speaker: 'Judge',
    text: 'Court is adjourned. The defendant is... NOT GUILTY!',
    choices: [],
    responses: [],
  },
]

// Clear typewriter effect
function clearTypewriter() {
  if (typewriterInterval) clearInterval(typewriterInterval)
}

// Typewriter effect to show text gradually
function typeText(text, speed = 30) {
  clearTypewriter()
  storyElement.textContent = ''
  let i = 0
  typewriterInterval = setInterval(() => {
    if (i < text.length) {
      storyElement.textContent += text.charAt(i)
      i++
    } else {
      clearInterval(typewriterInterval)
    }
  }, speed)
}

// Update the scene content
function updateScene() {
  isChoosing = false
  const currentScene = story[currentIndex]

  videoElement.src = currentScene.video
  videoElement.currentTime = 0
  videoElement.play()

  speakerName.textContent = currentScene.speaker
  typeText(currentScene.text)

  // Show/hide buttons
  if (currentIndex === 0 || currentIndex === 1) {
    // 新增的开头视频和1.mp4都隐藏按钮
    choices.forEach((choice) => {
      choice.style.display = 'none'
    })
  } else {
    choices.forEach((choice, index) => {
      if (index < currentScene.choices.length) {
        choice.textContent = currentScene.choices[index]
        choice.style.display = 'block'
        choice.disabled = false
      } else {
        choice.style.display = 'none'
      }
    })
  }
}

// Global function to start the game
window.startGame = function () {
  bgMusic.play()

  choices.forEach((choice) => {
    choice.style.display = 'none'
  })

  updateScene()

  videoElement.addEventListener('click', () => {
    if (isChoosing) return

    // 新增开头视频和1.mp4都可以通过点击视频推进剧情
    if (currentIndex === 0 || currentIndex === 1 || currentIndex === 3) {
      if (currentIndex < story.length - 1) {
        currentIndex++
        updateScene()
      }
    }
  })
}

// Button click handlers
choices.forEach((choice, index) => {
  choice.addEventListener('click', () => {
    if (currentIndex === 1) {
      // On scene 1 only Object Now! (index 3) advances
      if (index !== 3) return
    }

    const currentScene = story[currentIndex]
    if (index >= currentScene.responses.length) return

    isChoosing = true

    choices.forEach((btn) => {
      btn.disabled = true
    })

    clearTypewriter()
    typeText(currentScene.responses[index])
    speakerName.textContent = 'Player'

    setTimeout(() => {
      if (currentIndex < story.length - 1) {
        currentIndex++
        updateScene()
      }
    }, 3500)
  })
})
