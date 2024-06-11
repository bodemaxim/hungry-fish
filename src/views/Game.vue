<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'

import Toolbar from '@/views/Toolbar.vue'
import ActionsPopup from '@/views/ActionsPopup.vue'

import { fishDictionary } from '@/components/FishObjects'
import { basicPlayerFish } from '@/components/Player'
import { Controls } from '@/enum/Controls'

import type { IFishObject } from '@/interfaces/IFishObject'
import type { IPlayer } from '@/interfaces/IPlayer'
import type { IKeys } from '@/interfaces/IKeys'

//#region Данные
/**
 * Высота игрового окна.
 */
const gameWindowHeight = 603

/**
 * Ширина игрового окна.
 */
const gameWindowWidth = 1072

/**
 * Рыбы в игровом окне.
 */
const fishInGame: Ref<IFishObject[]> = ref<IFishObject[]>([])

/**
 * Html рыб в игре.
 */
const fishInGameHtml: Ref<string> = ref<string>('')

/**
 * Флаг разрешения добавить новую рыбу.
 */
let isNewFishAllowed = true

/**
 * Рыба игрока.
 */
const player: Ref<IPlayer> = ref<IPlayer>({} as IPlayer)

/**
 * Зажатый контрол.
 */
let control: Controls = 9

/**
 * Мощь Игрока.
 */
const playerPower: Ref<number> = ref<number>(0)

/**
 * Время партии.
 */
let gameTime = 0

/**
 * Время начала партии.
 */
const gameStartTime: number = Date.now()

/**
 * Время конца партии.
 */
let gameEndTime: Date | null = null

/**
 * Накапливаемые очки, чтобы увеличить размер Игрока.
 */
let growthPoints: number = 0

/**
 * Очки, которые надо накопить, чтобы увеличить размер Игрока.
 */
const maxGrowthPoints: number = 3

/**
 * Значение ширина / высота Игрока.
 */
let playerWidthToHeightRatio = 0

/**
 * Таймер генерации кадров.
 */
let animationLauncher: number = 0

/**
 * Флаг видимости всплывающего окна действий.
 */
const isActionsPopupVisible: Ref<boolean> = ref<boolean>(false)

/**
 * Флаг видимости всплывающего окна конца игры.
 */
const isGameOverPopupVisible: Ref<boolean> = ref<boolean>(false)
//#endregion Данные

//#region Методы
/**
 * Запустить игру.
 */
const launchGame = () => {
  animationLauncher = setInterval(() => {
    formfishInGameHtml()
  }, 40) //40 - 25 кадров в сек
}

/**
 * Сформировать html игрового окна (кадр).
 */
const formfishInGameHtml = () => {
  changePlayerPosition(getPlayerControl())

  let txt = ''

  //добавить рыбу игрока
  txt += formPlayerHtml(player.value)

  //управлять появлением и движением рыб
  deleteOldFish()

  if (isNewFishAllowed) addNewFish()

  if (fishInGame.value.length > 0) {
    for (const item of fishInGame.value) {
      if (item.goesRight) item.left = item.left + item.speed
      else item.left = item.left - item.speed

      txt += formFishHtml(item)
    }
  }

  fishInGameHtml.value = txt

  processAllOverlaps()
}

/**
 * Сформировать html игрового объекта.
 */
const formFishHtml = (fish: IFishObject): string => {
  let txt = `
  <img src='${fish.imagePath}'
    alt='рыба'
    width='${fish.width}'
    height='${fish.height}'
    style="position:absolute;top:${fish.top}px;left:${fish.left}px;" />`

  return txt
}

/**
 * Сформировать html рыбы игрока.
 */
const formPlayerHtml = (fish: IPlayer): string => {
  let txt = `
  <img src='${fish.imagePath}'
    alt='игрок'
    width='${fish.width}'
    height='${fish.height}'
    style="position:absolute;top:${fish.top}px;left:${fish.left}px;z-index:10" />`

  return txt
}

/**
 * Разрешить появление новой рыбы через N секунд.
 */
const setTimerForAddNewFish = () => {
  isNewFishAllowed = false

  const timerForAddNewFish = generateRandomNumber(500, 3000)

  setTimeout(function () {
    isNewFishAllowed = true
  }, timerForAddNewFish)
}

/**
 * Добавить новую рыбу.
 */
const addNewFish = () => {
  setTimerForAddNewFish()

  const newFishIndex = generateRandomNumber(0, fishDictionary.length)
  const newFish: IFishObject = JSON.parse(JSON.stringify(fishDictionary[newFishIndex]))

  newFish.top = generateRandomNumber(newFish.height, gameWindowHeight - newFish.height)
  newFish.left = newFish.goesRight ? -newFish.width : gameWindowWidth + newFish.width

  fishInGame.value = [...fishInGame.value, newFish]
}

/**
 * Создать впервые рыбу Игрока.
 */
const initPlayer = (playerFish: IPlayer) => {
  player.value = playerFish
  player.value.top = gameWindowHeight / 2 - player.value.height / 2
  player.value.left = gameWindowWidth / 2 - player.value.width / 2
  playerPower.value = player.value.width * player.value.height
  playerWidthToHeightRatio = player.value.width / player.value.height
}

/**
 * Удалить старую рыбу.
 */
const deleteOldFish = () => {
  const fishToRemove = []

  for (const [index, item] of fishInGame.value.entries()) {
    if (item.goesRight) {
      if (item.left > gameWindowWidth) fishToRemove.push(index)
    } else {
      if (item.left < -item.width) fishToRemove.push(index)
    }
  }

  for (const index of fishToRemove.reverse()) {
    fishInGame.value.splice(index, 1)
  }
}

/**
 * Сгенерировать случайное число.
 * @param {number} min - минимальное значение включительно.
 * @param {number} max - максимальное значение включительно.
 */
const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * Получить информацию о столкновении рыб.
 */
const trackOverlap = () => {
  for (const item of fishInGame.value) {
    getIsOverlap(item)
  }
}

/**
 * Возвращает флаг, столкнулась ли рыба с рыбой игрока.
 */
const getIsOverlap = (fish: IFishObject) => {
  if (
    fish.left + fish.width > player.value.left &&
    fish.left < player.value.left + player.value.width &&
    fish.top < player.value.top + player.value.height &&
    fish.top + fish.height > player.value.top
  ) {
    return true
  } else return false
}

/**
 * Обрабатывает события столкновения Игрока с другими рыбами.
 */
const processAllOverlaps = () => {
  for (const item of fishInGame.value) {
    if (getIsOverlap(item)) {
      getWhoWins(item)
      fishInGame.value.splice(fishInGame.value.indexOf(item), 1)
    }
  }
}

/**
 * Обрабатывает исход столкновения Игрока с рыбой.
 * @param {IFishObject} fish - рыба.
 */
const getWhoWins = (fish: IFishObject) => {
  const fishPower: number = fish.width * fish.height
  if (playerPower.value < fishPower) {
    showGameOver()
  } else {
    growPlayer()
  }
}

/**
 * Прибавляет размер Игроку за съеденную рыбу.
 */
const growPlayer = () => {
  growthPoints++
  if (growthPoints <= maxGrowthPoints) return

  player.value.height = player.value.height + 5
  player.value.width = Math.round(player.value.height * playerWidthToHeightRatio)
  playerPower.value = player.value.height * player.value.width
  growthPoints = 0
}

/**
 * Обрабатывает событие окончание игры.
 */
const showGameOver = () => {
  alert(`Game over!
    Power achieved: ${playerPower.value}
    To play again refresh the window!`)
}
//#endregion Методы

//#region События
const onButton = (isPause: boolean) => {
  if (isPause) {
    onPause()
  } else {
    onResume()
  }
}

/**
 * Событие нажатия кнопки "Pause".
 */
const onPause = () => {
  clearInterval(animationLauncher)
  isActionsPopupVisible.value = true
}

/**
 * Событие нажатия кнопки "Resume".
 */
const onResume = () => {
  launchGame()
  isActionsPopupVisible.value = false
}

/**
 * Событие закрытия всплывающего окна действий.
 */
const onCloseActionsPopup = () => (isActionsPopupVisible.value = false)

/**
 * Событие закрытия всплывающего окна конца игры.
 */
const onCloseGameOverPopup = () => (isActionsPopupVisible.value = false)

//#endregion События

//#region Управление
const keys: IKeys = {
  arrowUpEnabled: false,
  arrowRightEnabled: false,
  arrowDownEnabled: false,
  arrowLeftEnabled: false
}

/**
 * Событие нажатия клавиши управления.
 */
const onKeyDown = (e: KeyboardEvent) => {
  console.log(e)
  if (!e.repeat) {
    e.stopPropagation()

    switch (e.key) {
      case 'ArrowUp':
        keys.arrowUpEnabled = true
        break
      case 'ArrowRight':
        keys.arrowRightEnabled = true
        break
      case 'ArrowDown':
        keys.arrowDownEnabled = true
        break
      case 'ArrowLeft':
        keys.arrowLeftEnabled = true
        break
      case ' ':
        if (isActionsPopupVisible.value) onResume()
        else onPause()
        break
    }
  }
}

/**
 * Событие снятия нажатия с клавиши управления.
 */
const onKeyUp = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowUp':
      keys.arrowUpEnabled = false
      break
    case 'ArrowRight':
      keys.arrowRightEnabled = false
      break
    case 'ArrowDown':
      keys.arrowDownEnabled = false
      break
    case 'ArrowLeft':
      keys.arrowLeftEnabled = false
      break
  }
}

/**
 * Получает выбранное игроком направление движения рыбы.
 */
const getPlayerControl = () => {
  if (keys.arrowUpEnabled && !keys.arrowDownEnabled) {
    if (!keys.arrowLeftEnabled && !keys.arrowRightEnabled) control = Controls.up
    else if (!keys.arrowLeftEnabled && keys.arrowRightEnabled) control = Controls.upRight
    else if (keys.arrowUpEnabled && !keys.arrowDownEnabled) control = Controls.upLeft
  } else if (keys.arrowRightEnabled && !keys.arrowLeftEnabled) {
    if (!keys.arrowUpEnabled && !keys.arrowDownEnabled) control = Controls.right
    else if (!keys.arrowUpEnabled && keys.arrowDownEnabled) control = Controls.downRight
  } else if (keys.arrowDownEnabled && !keys.arrowUpEnabled) {
    if (!keys.arrowLeftEnabled && !keys.arrowRightEnabled) control = Controls.down
    else if (keys.arrowLeftEnabled && !keys.arrowRightEnabled) control = Controls.downLeft
  } else if (keys.arrowLeftEnabled && !keys.arrowRightEnabled) {
    if (!keys.arrowUpEnabled && !keys.arrowDownEnabled) control = Controls.left
  } else control = Controls.still
  return control
}

/**
 * Расчитывает координаты Игрока в данный момент.
 */
const changePlayerPosition = (control: Controls) => {
  switch (control) {
    case Controls.up:
      player.value.top = player.value.top - player.value.speed
      break
    case Controls.right:
      player.value.left = player.value.left + player.value.speed
      player.value.imagePath = player.value.imageRightPath
      break
    case Controls.down:
      player.value.top = player.value.top + player.value.speed
      break
    case Controls.left:
      player.value.left = player.value.left - player.value.speed
      player.value.imagePath = player.value.imageLeftPath
      break
    case Controls.upLeft:
      player.value.top = player.value.top - player.value.speed
      player.value.left = player.value.left - player.value.speed
      player.value.imagePath = player.value.imageLeftPath
      break
    case Controls.upRight:
      player.value.top = player.value.top - player.value.speed
      player.value.left = player.value.left + player.value.speed
      player.value.imagePath = player.value.imageRightPath
      break
    case Controls.downLeft:
      player.value.top = player.value.top + player.value.speed
      player.value.left = player.value.left - player.value.speed
      player.value.imagePath = player.value.imageLeftPath
      break
    case Controls.downRight:
      player.value.top = player.value.top + player.value.speed
      player.value.left = player.value.left + player.value.speed
      player.value.imagePath = player.value.imageRightPath
      break
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeyDown)
  window.addEventListener('keyup', onKeyUp)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeyDown)
  window.removeEventListener('keyup', onKeyUp)
})

//#endregion Управление

//#region Инициализация (порядок вызова функций важен)
initPlayer(basicPlayerFish)

launchGame()

addNewFish()
//#endregion Инициализация
</script>

<template>
  <main>
    <div v-html="fishInGameHtml" class="game-window" @keydown="onKeyDown" @keyUp="onKeyUp"></div>
    <Toolbar
      :player-power="playerPower"
      :growth-points="growthPoints"
      :max-growth-points="maxGrowthPoints"
      :is-actions-popup-visible="isActionsPopupVisible"
      @pause="onButton"
    />
    <ActionsPopup
      v-if="isActionsPopupVisible"
      @closePopup="onCloseActionsPopup"
      @resume="onResume"
      class="actionsPopup"
    />
    <GameOverPopup
      v-if="isGameOverPopupVisible"
      @closePopup="onCloseGameOverPopup"
      @resume="onResume"
      class="actionsPopup"
    />
  </main>
</template>

<style scoped>
main {
  display: flex;
  align-items: center;
  position: relative;
}

.game-window {
  background-image: url('@/assets/background.png');
  overflow: hidden;
}

.game-object {
  position: absolute;
}

.toolbar {
  position: absolute;
  top: 5px;
  padding: 0px 10px;
}

.actionsPopup {
  margin: auto;
  height: 400px;
  width: 400px;
}
</style>
