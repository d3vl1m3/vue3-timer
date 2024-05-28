<template>
<div class="timer-controls">
    <button class="button" @click="startTimer" :disabled="isRunning">Start</button>
    <button class="button" @click="stopTimer" :disabled="!isRunning">Stop</button>
    <button class="button" @click="resetTimer">Reset</button>
</div>
</template>

<script lang='ts'>
import { timerStore } from '@/store/timerStore'
import { defineComponent, Ref } from 'vue'

export default defineComponent({
  setup () {
    const isRunning: Ref<boolean> = timerStore.state.isRunning

    return {
      startTimer: () => {
        timerStore.dispatch({
          action: 'startTimer'
        })
      },
      stopTimer: () => {
        timerStore.dispatch({
          action: 'stopTimer'
        })
      },
      resetTimer: () => {
        timerStore.dispatch({
          action: 'resetTimer'
        })
      },
      isRunning
    }
  }
})
</script>

<style scoped>
.timer-controls {
    display: flex;
    justify-content: center;
    gap: 1rem;
}
</style>
