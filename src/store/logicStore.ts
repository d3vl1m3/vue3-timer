import { pomodoroStore } from './pomodoroStore'
import { timerStore } from './timerStore'
import { configStore } from './configStore'

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

// Watchers
const isCurrentIntervalComplete = () => {
  const isWorkIntervalComplete = pomodoroStore.state.stage.value === 'work' && configStore.state.pomodoroLength.value <= timerStore.state.timer.value

  const isShortBreakIntervalComplete = pomodoroStore.state.stage.value === 'short_break' && configStore.state.shortBreakLength.value <= timerStore.state.timer.value

  const isLongBreakIntervalComplete = pomodoroStore.state.stage.value === 'long_break' && configStore.state.longBreakLength.value <= timerStore.state.timer.value

  return isWorkIntervalComplete || isShortBreakIntervalComplete || isLongBreakIntervalComplete
}

const isGoalComplete = () => {
  return pomodoroStore.state.intervalCounter.value === configStore.state.goalLength.value
} 