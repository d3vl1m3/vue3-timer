<template>
    <div class="timer">
        <div class="timer-display">
            {{ formattedTime }}
        </div>
        <div class="timer-controls">
            <button class="button" @click="startTimer" :disabled="isRunning">Start</button>
            <button class="button" @click="stopTimer" :disabled="!isRunning">Stop</button>
            <button class="button" @click="resetTimer">Reset</button>
        </div>
    </div>
</template>

<script lang='ts'>
import { timerStore } from '@/store/timerStore'
import { computed, defineComponent, Ref } from 'vue'

export default defineComponent({
  setup () {
    const timer: Ref<number> = timerStore.state.timer
    const isRunning: Ref<boolean> = timerStore.state.isRunning

    const formattedTime: Ref<string> = computed(() => {
      const minutes: number = Math.floor(timer.value / 60)
      const seconds: number = timer.value % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })

    return {
      formattedTime,
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
.timer {
    text-align: center;
}

.timer-display {
    font-size: 4rem;
    margin-bottom: 1.5rem;
}

.timer-controls {
    display: flex;
    justify-content: center;
}

.timer-controls button {
    margin: 0 10px;
}
</style>
