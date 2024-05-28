import { pomodoroStore } from './pomodoroStore'
import { timerStore } from './timerStore'
import { configStore } from './configStore'
import { computed } from 'vue'

type Dispatches = {
  action: 'startSession'
} | {
  action: 'skipInterval'
} | {
  action: 'completedGoal'
}

// Actions
const startSession = () => {
  timerStore.dispatch({ action: 'startTimer' })
  pomodoroStore.dispatch({ action: 'nextStage' })
}

const skipInterval = () => {
  pomodoroStore.dispatch({ action: 'nextStage' })
}

const completedGoal = () => {
  timerStore.dispatch({ action: 'stopTimer' })
  timerStore.dispatch({ action: 'resetTimer' })
  pomodoroStore.dispatch({ action: 'resetPosition' })
}

const dispatch = ({ action }: Dispatches) => {
  switch (action) {
    case 'startSession':
      startSession()
      break
    case 'skipInterval':
      skipInterval()
      break
    case 'completedGoal':
      completedGoal()
      break
  }

}

// Watchers
const isCurrentIntervalComplete = computed(() => {
  const isPomodoroIntervalComplete = pomodoroStore.state.stage.value === 'pomodoro' && configStore.state.pomodoroLength.value <= timerStore.state.timer.value

  const isShortBreakIntervalComplete = pomodoroStore.state.stage.value === 'short_break' && configStore.state.shortBreakLength.value <= timerStore.state.timer.value

  const isLongBreakIntervalComplete = pomodoroStore.state.stage.value === 'long_break' && configStore.state.longBreakLength.value <= timerStore.state.timer.value

  return isPomodoroIntervalComplete || isShortBreakIntervalComplete || isLongBreakIntervalComplete
})

const isGoalComplete = computed(() => {
  return pomodoroStore.state.intervalCounter.value === configStore.state.goalLength.value
})

export const logicStore = {
  dispatch,
  computed: {
    isCurrentIntervalComplete,
    isGoalComplete
  }
}
