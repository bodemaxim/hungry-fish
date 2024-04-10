<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Game from '@/views/Game.vue'
</script>

<template>
  <div class="main-page">
    <h1 class="game-title">Hungry Fish</h1>
    <Game class="game-window" />
  </div>
</template>

<style scoped>
.main-page {
  height: 100vh;
  width: 100vw;
  padding: 5px;
  background-color: black;
  color: white;
  overflow: visible;
}

.game-window {
  position: relative;
  height: 603px;
  width: 1072px;
  margin: auto;
  overflow: hidden;
}

.game-title {
  text-align: center;
  margin: 10px;
}
</style>
