<template>
    <div class="timer">
        <div class="timer-display">
            {{ formattedTime }}
        </div>
        <div class="timer-controls">
            <button @click="startTimer" :disabled="isRunning">Start</button>
            <button @click="stopTimer" :disabled="!isRunning">Stop</button>
            <button @click="resetTimer">Reset</button>
        </div>
    </div>
</template>

<script lang='ts'>
import useTimer from '@/store'
import { computed, defineComponent, Ref } from 'vue'

export default defineComponent({
  setup () {
    const store = useTimer()
    const timer: Ref<number> = store.state.timer
    const isRunning: Ref<boolean> = store.state.isRunning

    const formattedTime: Ref<string> = computed(() => {
      const minutes: number = Math.floor(timer.value / 60)
      const seconds: number = timer.value % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })

    return {
      formattedTime,
      startTimer: () => {
        store.dispatch({
          action: 'startTimer'
        })
      },
      stopTimer: () => {
        store.dispatch({
          action: 'stopTimer'
        })
      },
      resetTimer: () => {
        store.dispatch({
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
    font-size: 48px;
    margin-bottom: 20px;
}

.timer-controls {
    display: flex;
    justify-content: center;
}

.timer-controls button {
    margin: 0 10px;
}
</style>
