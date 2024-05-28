import { reactive, toRefs } from 'vue'

type ConfigState = {
  pomodoroLength: number;
  shortBreakLength: number;
  longBreakLength: number;
  goalLength: number;
}

type Dispatches = {
  action: 'setPomodoroLength',
  payload: number
} | {
  action: 'setShortBreakLength',
payload: number
} | {
  action: 'setLongBreakLength',
    payload: number
} | {
  action: 'setGoalLength',
  payload: number
}

type Dispatch = (payload: Dispatches) => void

// State
const state: ConfigState = reactive({
  pomodoroLength: 25,
  shortBreakLength: 5,
  longBreakLength: 15,
  goalLength: 4
})

// Actions
const setPomodoroLength = (length: number) => {
  state.pomodoroLength = length
}

const setShortBreakLength = (length: number) => {
  state.shortBreakLength = length
}

const setLongBreakLength = (length: number) => {
  state.longBreakLength = length
}

const setGoalLength = (length: number) => {
  state.goalLength = length
}

// Dispatch
const dispatch: Dispatch = ({ action, payload }) => {
  switch (action) {
    case 'setPomodoroLength':
      setPomodoroLength(payload)
      break
    case 'setShortBreakLength':
      setShortBreakLength(payload)
      break
    case 'setLongBreakLength':
      setLongBreakLength(payload)
      break
    case 'setGoalLength':
      setGoalLength(payload)
      break
    default:
      break
  }
}

export const configStore = {
  state: toRefs(state),
  dispatch
}
