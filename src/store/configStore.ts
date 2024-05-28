import { reactive, toRefs } from 'vue'

type ConfigState = {
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  goalLength: number;
}

type Dispatches = {
  action: 'setPomodoroLength',
  payload: {
    minutes: number
  }
} | {
  action: 'setShortBreakLength',
  payload: {
    minutes: number
  }
} | {
  action: 'setLongBreakLength',
    payload: {
      minutes: number
    }
} | {
  action: 'setGoalLength',
  payload: {
    pomodoros: number

  }
}

type Dispatch = (payload: Dispatches) => void

// State
const state: ConfigState = reactive({
  // All lengths are in minutes
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  goalLength: 4
})

// Actions
const setPomodoroLength = (minutes: number) => {
  state.pomodoroLength = minutes
}

const setShortBreakLength = (minutes: number) => {
  state.shortBreakLength = minutes
}

const setLongBreakLength = (minutes: number) => {
  state.longBreakLength = minutes
}

const setGoalLength = (pomodoros: number) => {
  state.goalLength = pomodoros
}

// Dispatch
const dispatch: Dispatch = ({ action, payload }) => {
  switch (action) {
    case 'setPomodoroLength':
      setPomodoroLength(payload.minutes)
      break
    case 'setShortBreakLength':
      setShortBreakLength(payload.minutes)
      break
    case 'setLongBreakLength':
      setLongBreakLength(payload.minutes)
      break
    case 'setGoalLength':
      setGoalLength(payload.pomodoros)
      break
    default:
      break
  }
}

export const configStore = {
  state: toRefs(state),
  dispatch
}
