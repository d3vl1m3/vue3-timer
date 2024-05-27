import { InjectionKey } from 'vue'
import { Store, createStore } from 'vuex'

type TimerState = {
  timer: number,
  isRunning: boolean,
  intervalId: number | null
}

export const key: InjectionKey<Store<TimerState>> = Symbol('TimerState')

export default createStore<TimerState>({
  state: {
    timer: 0,
    isRunning: false,
    intervalId: null
  },
  getters: {
    getTimer: state => state.timer,
    getIsRunning: state => state.isRunning
  },
  mutations: {
    setTimer (state, value: number) {
      state.timer = value
    },
    setIsRunning (state, value: boolean) {
      state.isRunning = value
    },
    setIntervalId (state, value: number | null) {
      state.intervalId = value
    }
  },
  actions: {
    startTimer ({ commit, state }) {
      commit('setIsRunning', true)
      const intervalId = setInterval(() => {
        commit('setTimer', state.timer + 1)
      }, 1000)
      commit('setIntervalId', intervalId)
    },
    stopTimer ({ commit, state }) {
      commit('setIsRunning', false)
      if (state.intervalId) {
        clearInterval(state.intervalId)
      }
    },
    resetTimer ({ state, commit, dispatch }) {
      commit('setTimer', 0)
      if (state.isRunning) {
        dispatch('stopTimer')
        dispatch('startTimer')
      }
    }
  }
})
