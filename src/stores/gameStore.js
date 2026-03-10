import { defineStore } from 'pinia'
import { questions as questionBank } from '../data/questions.js'

export const useGameStore = defineStore('game', {

  state: () => ({
    questions: [],
    currentIndex: 0,
    score: 0,
    gameState: 'start',    // 'start' | 'playing' | 'end'
    selectedAnswer: null,  // index of the button the player clicked, or null
    timeLeft: 15,
    _timerInterval: null   // internal — managed by the store only
  }),

  getters: {

    // The question the player is currently looking at
    currentQuestion: (state) => state.questions[state.currentIndex],

    // True when the current question is the last one
    isLastQuestion: (state) => state.currentIndex >= state.questions.length - 1,

    // Progress info for the "Question X of Y" display
    progress: (state) => ({
      current: state.currentIndex + 1,
      total: state.questions.length
    })

  },

  actions: {
    // Actions are added in the next milestone
  }

})