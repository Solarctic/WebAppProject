const videoElement = document.getElementById('video-container')
const bgMusic = document.getElementById('bg-music')
const choices = document.querySelectorAll('.choice-btn')
const cheatButton = document.getElementById('cheat-button')

// Special buttons
const specialBtn1 = document.createElement('button')
specialBtn1.textContent = 'The Imperial Jade with blood'
specialBtn1.className =
  'bg-green-500 hover:bg-green-600 px-4 py-2 rounded text-white font-bold ml-2'
specialBtn1.style.display = 'none'

const specialBtn2 = document.createElement('button')
specialBtn2.textContent = 'Testimony: Key'
specialBtn2.className = 'bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white font-bold ml-2'
specialBtn2.style.display = 'none'

cheatButton.after(specialBtn1, specialBtn2)

// Game state
let currentIndex = 0
let isChoosing = false
let cheatCount = 0
let jumpedToEnd = false
let hasJade = false
let hasKey = false

// Background music change points
const musicMap = {
  0: '/Prologue.mp3',
  8: '/court.mp3',
  17: '/Suspense.mp3',
  35: '/Lobby.mp3',
}

// Story structure
const story = [
  { video: '/jadeStolen.mp4', choices: [], next: 1 },
  { video: '/jadeStolen2.mp4', choices: [], next: 2 },
  { video: '/mayaChat.mp4', choices: [], next: 3 },
  { video: '/phoeAnw.mp4', choices: [], next: 4 },
  { video: '/mayaChat2.mp4', choices: [], next: 5 },
  { video: '/phoeAnw2.mp4', choices: [], next: 6 },
  {
    video: '/doorKnock.mp4',
    choices: [
      { text: 'open', next: 8 },
      { text: 'leave it', next: 7 },
    ],
  },
  {
    video: '/lazyEnd.mp4',
    choices: [
      { text: 'restart', next: 0 },
      { text: 'choose again', next: 6 },
    ],
  },
  { video: '/mission.mp4', choices: [], next: 9 },
  { video: '/mission2.mp4', choices: [], next: 10 },
  { video: '/mission3.mp4', choices: [], next: 11 },
  { video: '/mission4.mp4', choices: [], next: 12 },
  { video: '/mission5.mp4', choices: [], next: 13 },
  { video: '/mission6.mp4', choices: [], next: 14 },
  { video: '/mission7.mp4', choices: [], next: 15 },
  { video: '/mission8.mp4', choices: [], next: 16 },
  { video: '/mission9.mp4', choices: [], next: 17 },
  { video: '/day0.mp4', choices: [], next: 18 },
  { video: '/rply.mp4', choices: [], next: 19 },
  { video: '/day1.mp4', choices: [], next: 20 },
  { video: '/day2.mp4', choices: [], next: 21 },
  {
    video: '/day3.mp4',
    choices: [
      { text: 'Ask about the jade', next: 22 },
      { text: 'Ask why pushed', next: 28 },
    ],
  },
  { video: '/day4.mp4', choices: [] },
  { video: '/day5.mp4', choices: [] },
  { video: '/day6.mp4', choices: [] },
  { video: '/push0.mp4', choices: [] },
  { video: '/push1.mp4', choices: [] },
  { video: '/push2.mp4', choices: [], next: 34 },
  { video: '/push0.mp4', choices: [] },
  { video: '/push1.mp4', choices: [] },
  { video: '/push2.mp4', choices: [] },
  { video: '/day4.mp4', choices: [] },
  { video: '/day5.mp4', choices: [] },
  { video: '/day6.mp4', choices: [] },
  { video: '/evidence.mp4', choices: [] },
  { video: '/new.mp4', choices: [] },
  { video: '/hall1.mp4', choices: [] },
  { video: '/hall2.mp4', choices: [] },
  { video: '/hall3.mp4', choices: [] },
  { video: '/hall4.mp4', choices: [] },
  { video: '/hall5.mp4', choices: [] },
  { video: '/begin.mp4', choices: [] },
  { video: '/begin2.mp4', choices: [] },
  { video: '/begin3.mp4', choices: [] },
  { video: '/begin4.mp4', choices: [] },
  { video: '/begin5.mp4', choices: [] },
  { video: '/begin6.mp4', choices: [] },
  { video: '/begin7.mp4', choices: [] },
  { video: '/begin8.mp4', choices: [] },
  { video: '/begin9.mp4', choices: [] },
  { video: '/begin10.mp4', choices: [] },
  { video: '/begin11.mp4', choices: [] },
  { video: '/begin12.mp4', choices: [] },
  { video: '/begin13.mp4', choices: [] },
  { video: '/begin14.mp4', choices: [] },
  { video: '/begin15.mp4', choices: [] },
  { video: '/begin16.mp4', choices: [] },
  { video: '/begin17.mp4', choices: [] },
  { video: '/begin18.mp4', choices: [] },
  { video: '/begin19mp4', choices: [] },
  { video: '/begin20.mp4', choices: [] },
]

function updateCheatButton() {
  cheatButton.textContent = `😈 Cheat (${cheatCount})`
  cheatButton.disabled = cheatCount <= 0
}

function maybeUnlockCheat() {
  if (currentIndex === 7) {
    cheatCount++
    updateCheatButton()
  }
}

cheatButton.addEventListener('click', () => {
  if (cheatCount <= 0) return
  cheatCount--
  updateCheatButton()

  setTimeout(() => {
    if (currentIndex === 6) {
      currentIndex = 8
    } else if (currentIndex < story.length - 1) {
      currentIndex++
    }
    updateScene()
    jumpedToEnd = false
  }, 1000)
})

function updateScene() {
  isChoosing = false
  const currentScene = story[currentIndex]

  videoElement.src = currentScene.video
  videoElement.currentTime = 0
  videoElement.play()
  jumpedToEnd = false

  maybeUnlockCheat()

  // 🎵 切换背景音乐
  if (musicMap[currentIndex]) {
    bgMusic.pause()
    bgMusic.src = musicMap[currentIndex]
    bgMusic.currentTime = 0
    bgMusic.play()
  }

  // 🎯 evidence.mp4 获得两个特殊按钮
  if (currentIndex === 34) {
    if (!hasJade) {
      specialBtn1.style.display = 'inline-block'
      hasJade = true
    }
    if (!hasKey) {
      specialBtn2.style.display = 'inline-block'
      hasKey = true
    }
  }

  if (!currentScene.choices || currentScene.choices.length === 0) {
    choices.forEach((btn) => (btn.style.display = 'none'))
  } else {
    choices.forEach((btn, idx) => {
      if (idx < currentScene.choices.length) {
        btn.textContent = currentScene.choices[idx].text
        btn.style.display = 'block'
        btn.disabled = false
      } else {
        btn.style.display = 'none'
      }
    })
  }
}

choices.forEach((choice, index) => {
  choice.addEventListener('click', () => {
    if (isChoosing) return
    isChoosing = true
    choices.forEach((btn) => (btn.disabled = true))

    setTimeout(() => {
      const currentScene = story[currentIndex]
      if (currentScene.choices && currentScene.choices[index]) {
        currentIndex = currentScene.choices[index].next
      } else if (currentScene.next !== undefined) {
        currentIndex = currentScene.next
      } else if (currentIndex < story.length - 1) {
        currentIndex++
      }
      updateScene()
    }, 1000)
  })
})

window.startGame = function () {
  bgMusic.play()
  choices.forEach((btn) => (btn.style.display = 'none'))

  updateScene()

  videoElement.addEventListener('click', () => {
    if (isChoosing) return

    if (!jumpedToEnd) {
      if (videoElement.duration) {
        videoElement.currentTime = videoElement.duration - 0.05
        videoElement.pause()
        jumpedToEnd = true
      }
      return
    }

    if ([6, 7, 21].includes(currentIndex)) return

    const currentScene = story[currentIndex]
    if (currentScene.next !== undefined) {
      currentIndex = currentScene.next
      updateScene()
    } else if (currentIndex < story.length - 1) {
      currentIndex++
      updateScene()
    }
  })
}
