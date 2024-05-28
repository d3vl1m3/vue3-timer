import { reactive, toRefs } from 'vue'

// Types
type PomodoroStages = 'work' | 'short_break' | 'long_break';

type PomodoroState = {
    stage: PomodoroStages;
    intervalCounter: number;
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
  stage: 'work',
  intervalCounter: 0,
  longBreakInterval: 4
})

// Actions
const incrementInterval = () => {
  state.intervalCounter++
}

const nextStage = () => {
  if (state.stage === 'work') {
    if (state.intervalCounter % state.longBreakInterval === 0) {
      state.stage = 'long_break'
    } else {
      state.stage = 'short_break'
    }
  } else {
    state.stage = 'work'
  }

  incrementInterval()
}

const resetPosition = () => {
  state.intervalCounter = 0
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
