import { reactive, toRefs } from 'vue'

type Dispatches = {
  action: 'startTimer'
} | {
  action: 'stopTimer'
} | {
  action: 'resetTimer'
}

type Dispatch = (payload: Dispatches) => void

type State = {
  timer: number
  isRunning: boolean
  intervalId: number | null
}

const state: State = reactive({
  timer: 0,
  isRunning: false,
  intervalId: null
})

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

const mutations = {
  setTimer (value: number) {
    state.timer = value
  },
  setIsRunning (value: boolean) {
    state.isRunning = value
  },
  setIntervalId (value: number) {
    state.intervalId = value
  }
}

export const timerStore = {
  state: toRefs(state),
  dispatch,
  mutations
}
