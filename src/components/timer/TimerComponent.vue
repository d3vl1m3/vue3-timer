<template>
    <div class="timer">
        <div class="timer-display">
            {{ formattedTime }}
        </div>
        <TimerActions/>
    </div>
</template>

<script lang='ts'>
import { timerStore } from '@/store/timerStore'
import { computed, defineComponent, Ref } from 'vue'
import TimerActions from '@/components/timer-actions/TimerActions.vue'

export default defineComponent({
  components: {
    TimerActions
  },
  setup () {
    const timer: Ref<number> = timerStore.state.timer

    const formattedTime: Ref<string> = computed(() => {
      const minutes: number = Math.floor(timer.value / 60)
      const seconds: number = timer.value % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })

    return {
      formattedTime
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
