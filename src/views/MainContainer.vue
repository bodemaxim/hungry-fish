<script setup lang="ts">
import { ref } from 'vue'
import GameWindow from '@/views/GameWindow.vue'
import GameMenu from '@/views/GameMenu.vue'

/**
 * Флаг нахождения на странице главного меню.
 */
const isOnMenuPage = ref(true)

const onStartNewGame = () => {
  isOnMenuPage.value = false
}

const onGoToMainMenu = () => {
  isOnMenuPage.value = true
}
</script>

<template>
  <div class="main-component">
    <GameMenu v-if="isOnMenuPage" class="menu-window" @new-game="onStartNewGame" />
    <GameWindow v-else class="game-window" @on-go-to-main-menu="onGoToMainMenu" />
  </div>
</template>

<style scoped>
.main-component {
  height: 100vh;
  width: 100vw;
  margin: 0px;
  padding: 0px;
  background: linear-gradient(45deg, rgb(0, 0, 50), rgb(47, 0, 0));
  color: white;
  overflow: hidden;
  position: relative;
}

.game-window {
  height: 603px;
  width: 1072px;
  margin: auto;
  overflow: hidden;
  position: absolute;
  top: calc(50% - 301px);
  left: calc(50% - 536px);
}

.menu-window {
  height: 100%;
  width: 100%;
}

.game-title {
  text-align: center;
  margin: 10px;
}
</style>
