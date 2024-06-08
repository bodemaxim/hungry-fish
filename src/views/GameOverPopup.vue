<script setup lang="ts">
import { defineProps } from 'vue'

interface IProps {
  /**
   * Мощь игрока.
   * @type {number}
   */
  playerPower: number
  /**
   * Накапливаемые очки, чтобы увеличить размер Игрока.
   * @type {number}
   */
  growthPoints: number
  /**
   * @type {number}
   * Очки, которые надо накопить, чтобы увеличить размер Игрока.
   */
  maxGrowthPoints: number
  /**
   * @type {boolean}
   * Флаг открытия попапа действий.
   */
  isActionsPopupVisible: boolean
}

const props = defineProps<IProps>()

const emits = defineEmits<{
  pause: [value: boolean]
}>()

/**
 * Поставить игру на паузу.
 */
const onPause = () => {
  emits('pause', true)
  console.log('pause')
}

/**
 * Возобновить игру.
 */
const onResume = () => {
  emits('pause', false)
  console.log('resume in toolbar hit')
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
  <section class="toolbar flex-container">
    <div class="flex-container">
      <img src="/images/raised-fist.svg" alt="Your power" width="24" height="24" />
      <p class="value">{{ playerPower }}</p>
    </div>
    <div class="flex-container">
      <img src="/images/skeleton.svg" alt="Your power" width="24" height="24" />
      <p class="value">{{ growthPoints }}/{{ maxGrowthPoints }}</p>
    </div>
    <button @click="onPause" v-if="!isActionsPopupVisible" class="button">
      <img src="/images/pause.svg" alt="Your power" width="24" height="24" />
    </button>
    <button @click="onResume" v-else class="button">Вернуться</button>
  </section>
</template>

<style scoped>
.toolbar {
  width: 300px;
  margin: 2px 10px;
}

.toolbar * {
  opacity: 0.9;
}

.flex-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button {
  cursor: pointer;
  background: none;
  border: none;
}

.button img {
  display: block;
}

.button:hover {
  background-color: #f5f5f5;
  background: none;
  border: none;
}

.value {
  margin-left: 10px;
}
</style>
