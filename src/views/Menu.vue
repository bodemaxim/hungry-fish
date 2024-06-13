<script setup lang="ts">
const emits = defineEmits<{
  newGame: []
}>()

const onNewGame = () => {
  emits('newGame')
}
</script>

<template>
  <main class="menu-background-image">
    <div class="content">
      <img src="@/assets/hungry-fish-text.png" alt="Hungry Fish" height="200" />
      <ul class="optionsList">
        <li><button @click="onNewGame" class="optionsButton">New Game</button></li>
        <li>
          <p class="help">Use arrow keys to control</p>
          <p class="help">and space key to pause</p>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.menu-background-image {
  margin: 0px;
  padding: 0px;
  background-image: url('@/assets/menu-background.jpeg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.content {
  position: absolute;
  top: 20%;
  left: 30px;
  display: flex;
  flex-direction: column;
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

button.optionsButton {
  background-color: #000000;
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
  background-color: rgba(255, 149, 0, 0.806);
}

.help {
  text-align: center;
}
</style>
