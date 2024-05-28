import { reactive, toRefs } from 'vue'

// Types
type Dispatches = {
  action: 'startTimer'
} | {
  action: 'stopTimer'
} | {
  action: 'resetTimer'
}

type Dispatch = (payload: Dispatches) => void

type TimerState = {
  timer: number
  isRunning: boolean
  intervalId: number | null
}

// State
const state: TimerState = reactive({
  timer: 0,
  isRunning: false,
  intervalId: null
})

// Actions
function startTimer () {
  state.isRunning = true
  state.intervalId = setInterval(() => {
    state.timer++
  }, 1000)
}

function stopTimer () {
  state.isRunning = false
  if (state.intervalId) {
    clearInterval(state.intervalId)
    state.intervalId = null
  }
}

function resetTimer () {
  state.timer = 0
  if (state.isRunning) {
    stopTimer()
    startTimer()
  }
}

// Dispatch
const dispatch: Dispatch = ({ action }) => {
  switch (action) {
    case 'startTimer':
      startTimer()
      break
    case 'stopTimer':
      stopTimer()
      break
    case 'resetTimer':
      resetTimer()
      break
    default:
      break
  }
}

// Store
export const timerStore = {
  state: toRefs(state),
  dispatch
}
