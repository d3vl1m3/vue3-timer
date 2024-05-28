import { reactive, toRefs } from 'vue'

// Types
type PomodoroStages = 'pomodoro' | 'short_break' | 'long_break' | null

type PomodoroState = {
    stage: PomodoroStages;
    pomodoroCounter: number;
    longBreakInterval: number;
}

type Dispatches = {
    action: 'nextStage'
} | {
    action: 'incrementInterval'
} | {
    action: 'resetPosition'
}

type Dispatch = (payload: Dispatches) => void

// State
const state: PomodoroState = reactive({
  stage: null,
  pomodoroCounter: 0,
  longBreakInterval: 4
})

// Actions
const incrementPomodoro = () => {
  state.pomodoroCounter++
}

const nextStage = () => {
  if (state.stage === 'pomodoro') {
    if (state.pomodoroCounter % state.longBreakInterval === 0) {
      state.stage = 'long_break'
    } else {
      state.stage = 'short_break'
    }
  } else {
    state.stage = 'pomodoro'
  }

  incrementPomodoro()
}

const resetPosition = () => {
  state.pomodoroCounter = 0
}

// Dispatch
const dispatch: Dispatch = ({ action }) => {
  switch (action) {
    case 'nextStage':
      nextStage()
      break
    case 'resetPosition':
      resetPosition()
      break
    default:
      break
  }
}

// Store
export const pomodoroStore = {
  state: toRefs(state),
  dispatch
}
