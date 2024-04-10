<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { IFishObject } from '@/interfaces/IFishObject'
import { fishDictionary } from '@/components/FishObjects'

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
//#endregion Данные

//#region Методы
/**
 * Сформировать html игрового окна (кадр).
 */
const formfishInGameHtml = () => {
  deleteOldFish()

  if (isNewFishAllowed) addNewFish()

  let txt = ''

  if (fishInGame.value.length > 0) {
    for (const item of fishInGame.value) {
      if (item.goesRight) item.left = item.left + item.speed
      else item.left = item.left - item.speed

      txt += formFishHtml(item)
    }
  }

  fishInGameHtml.value = txt
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
 * Разрешить появление новой рыбы через N секунд. Сейчас N между 0 и 3 сек.
 */
const setTimerForAddNewFish = () => {
  isNewFishAllowed = false

  const timerForAddNewFish = generateRandomNumber(0, 3000)

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
    console.log('удалил')
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

//#endregion Методы

//#region Инициализация
setInterval(() => {
  formfishInGameHtml()
}, 40)

addNewFish()
//#endregion Инициализация

/* background: linear-gradient(rgb(77, 77, 255), blue); */
</script>

<template>
  <main v-html="fishInGameHtml" class="game-window"></main>
</template>

<style scoped>
.game-window {
  background-image: url('images/background.png');
  overflow: hidden;
}

.game-object {
  position: absolute;
}
</style>
