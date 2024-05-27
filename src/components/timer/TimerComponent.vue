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
import { computed, defineComponent, Ref } from 'vue'
import { key } from '@/store'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore(key)
    const time: Ref<number> = computed(() => store.getters.getTimer ?? 0)
    const isRunning: Ref<boolean> = computed(() => store.state.isRunning)

    const formattedTime: Ref<string> = computed(() => {
      const minutes: number = Math.floor(time.value / 60)
      const seconds: number = time.value % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })

    const startTimer: () => void = () => {
      store.dispatch('startTimer')
    }

    const stopTimer: () => void = () => {
      store.dispatch('stopTimer')
    }

    const resetTimer: () => void = () => {
      store.dispatch('resetTimer')
    }

    return {
      formattedTime,
      startTimer,
      stopTimer,
      resetTimer,
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
