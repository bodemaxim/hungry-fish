<script setup lang="ts">
import { defineProps } from 'vue'

//#region Props и Emits
interface IProps {
  /**
   * Мощь игрока.
   * @type {number}
   */
  playerPower: number
}

const props = defineProps<IProps>()

const emits = defineEmits<{
  startAgain: []
  goToMainMenu: []
}>()
//#endregion Props и Emits

/**
 * Возобновить игру.
 */
const onStartAgain = () => {
  emits('startAgain')
  console.log('resume in toolbar hit')
}

/**
 * Перейти в главное меню.
 */
const onGoToMainMenu = () => {
  emits('goToMainMenu')
}

/**
 * Сохранить игру без возможности вернуться в случае продолжения партии.
 */
const save = () => {
  console.log('save')
}

/**
 * Загрузить игру.
 */
const load = () => {
  console.log('load')
}
</script>

<template>
  <div class="popup">
    <h2 class="title">Game over!</h2>
    <ul class="optionsList">
      <li class="flex-container">
        <img src="/images/raised-fist.svg" alt="Your power" width="24" height="24" />
        <p class="value">Максимальная мощь: {{ playerPower }}</p>
      </li>
      <li><button @click="onStartAgain" class="optionsButton">Start new game</button></li>
      <li><button @click="onGoToMainMenu" class="optionsButton">Exit to Menu</button></li>
    </ul>
  </div>
</template>

<style scoped>
.popup {
  height: 400px;
  width: 400px;
  color: black;
  background-color: rgb(255, 98, 0);
  border: solid;
  border-color: #a6489a;
  border-width: 10px;
  z-index: 100;
  padding: 5px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.title {
  margin: 3px auto;
}

.optionsList {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.optionsList li {
  margin: 5px;
}

.flex-container {
  display: flex;
}

button.optionsButton {
  background-color: #4caf50;
  border: white;
  color: white;
  padding: 15px 32px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 150px;
  margin: 3px;
}

button.optionsButton:hover {
  background-color: black;
}
</style>
