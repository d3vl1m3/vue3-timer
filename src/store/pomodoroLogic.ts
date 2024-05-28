import { pomodoroStore } from './pomodoroStore'
import { timerStore } from './timerStore'
import { configStore } from './configStore'
import { computed, watch } from 'vue'

type Dispatches = {
  action: 'startSession'
} | {
  action: 'nextStage'
} | {
  action: 'completeGoal'
}

// Actions
const startSession = () => {
  timerStore.dispatch({ action: 'startTimer' })
  pomodoroStore.dispatch({ action: 'nextStage' })
}

const nextStage = () => {
  pomodoroStore.dispatch({ action: 'nextStage' })
}

const completeGoal = () => {
  // Reset timer and pomodoro position
  timerStore.dispatch({ action: 'stopTimer' })
  timerStore.dispatch({ action: 'resetTimer' })
  pomodoroStore.dispatch({ action: 'resetPosition' })
}

const dispatch = ({ action }: Dispatches) => {
  switch (action) {
    case 'startSession':
      startSession()
      break
    case 'nextStage':
      nextStage()
      break
    case 'completeGoal':
      completeGoal()
      break
  }
}

// Utils
const isPomodoroIntervalComplete = pomodoroStore.state.stage.value === 'pomodoro' && configStore.state.pomodoroLength.value <= timerStore.state.timer.value
const isShortBreakIntervalComplete = pomodoroStore.state.stage.value === 'short_break' && configStore.state.shortBreakLength.value <= timerStore.state.timer.value
const isLongBreakIntervalComplete = pomodoroStore.state.stage.value === 'long_break' && configStore.state.longBreakLength.value <= timerStore.state.timer.value

const isCurrentIntervalComplete = isPomodoroIntervalComplete || isShortBreakIntervalComplete || isLongBreakIntervalComplete
const isGoalComplete = pomodoroStore.state.pomodoroCounter.value === configStore.state.goalLength.value

const checkIntervalAndGoalComplete = () => {
  if (isGoalComplete) {
    dispatch({ action: 'completeGoal' })
  }

  if (isCurrentIntervalComplete) {
    dispatch({ action: 'nextStage' })
  }
}

// Watchers
watch(timerStore.state.timer, checkIntervalAndGoalComplete)

export const pomodoroLogic = {
  dispatch
}
