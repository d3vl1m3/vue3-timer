<template>
  <div class="page-container">
    <Header>
      <h1>Vue 3 Timer</h1>
      <div class="menu-actions-box">
        <button class="button">Settings</button>
      </div>
    </Header>
    <div class="timer-box">
      <TimerComponent/>
    </div>
    <Footer>
      <p>A D3VL1M3 Project</p>
    </Footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TimerComponent from './components/timer/TimerComponent.vue'

export default defineComponent({
  name: 'App',
  components: {
    TimerComponent
  }
})
</script>

<style>
@import url('./assets/css/global.css');

.page-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  align-items: center;
  background-color: #f8f9fa;
  display: flex;
  padding: 0.5rem 0.25rem;
}

.menu-actions-box {
  margin-left: auto;
}

.menu-actions-box button {
  margin-left: 0.5rem;
}

.timer-box {
  align-items: center;
  display: flex;
  flex-grow: 1;
  justify-content: center;
}

.timer {
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 2rem 5rem;
}

.timer-counter {
  font-size: 2rem;
  margin-bottom: 1rem;
  margin-top: 0;
}

.timer-box button + button {
  margin-top: 0.5rem;
}

footer {
  background-color: #f8f9fa;
  padding: 0.5rem 0.25rem;
  text-align: center;
}
</style>
