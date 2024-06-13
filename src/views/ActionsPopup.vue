<script setup lang="ts">
const emits = defineEmits<{
  closePopup: []
  resume: []
  goToMainMenu: []
}>()

const onResume = () => {
  emits('closePopup')
  emits('resume')
  emits('goToMainMenu')
}

/**
 * Перейти в главное меню.
 */
const onGoToMainMenu = () => {
  emits('goToMainMenu')
}
</script>
<template>
  <main>
    <div class="popup">
      <h2 class="title">What would you like to do?</h2>
      <ul class="actionsList">
        <li><button @click="onResume" class="optionsButton">Resume</button></li>
        <li><button class="optionsButton">Save game</button></li>
        <li><button @click="onGoToMainMenu" class="optionsButton">Exit to Menu</button></li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.popup {
  height: 400px;
  width: 400px;
  color: black;
  background-color: rgb(255, 221, 0);
  border: solid;
  border-color: #4caf50;
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

.actionsList {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.actionsList li {
  margin: 5px;
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
