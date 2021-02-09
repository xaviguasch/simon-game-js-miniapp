const buttonColours = ['red', 'blue', 'green', 'yellow']

let gamePattern = []
let userClickedPattern = []

let level = 0
let started = false

const title = document.querySelector('#level-title')

document.addEventListener('keydown', function (event) {
  if (!started) {
    title.textContent = `Level ${level}`
    nextSequence()
    started = true
  }
})

document.querySelectorAll('.btn').forEach((btn) => {
  btn.addEventListener('click', function () {
    const userChosenColour = this.id
    userClickedPattern.push(userChosenColour)

    playSound(userChosenColour)
    animatedPress(btn)

    checkAnswer([userClickedPattern.length - 1])
  })
})

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('Success!')

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence()
      }, 1000)
    }
  } else {
    console.log('Wrong')
    playSound('wrong')

    document.querySelector('body').classList.add('game-over')

    setTimeout(() => {
      document.querySelector('body').classList.remove('game-over')
    }, 200)

    title.textContent = 'Game over, press any key to restart'

    startOver()
  }
}

function nextSequence() {
  userClickedPattern = []

  level++
  title.textContent = `Level ${level}`

  const randomNumber = Math.floor(Math.random() * 4)
  const randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour)
  const pickedTile = document.querySelector(`.${randomChosenColour}`)
  animatedPress(pickedTile)
  playSound(randomChosenColour)
}

function playSound(key) {
  const audio = new Audio(`./sounds/${key}.mp3`)
  audio.play()
}

function animatedPress(tile) {
  tile.classList.add('pressed')
  setTimeout(() => {
    tile.classList.remove('pressed')
  }, 200)
}

function startOver() {
  level = 0
  gamePattern = []
  started = false
}
