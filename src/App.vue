<template>
  <div id="app">
    <h1>QuizBlitz</h1>
    <StartScreen v-if="gameState === 'start'" @start="startGame" /> 
    <div v-else-if="gameState === 'playing'">
    <p>Score: {{ score }} / {{ questions.length }}</p>
    <p>Question {{ currentIndex + 1 }} of {{ questions.length }} </p>

    <QuestionCard
    :question="questions[currentIndex]"
    @answer="handleAnswer"
    />
    </div>

    <div v-else-if="gameState === 'end'">
      <h2>Quiz Complete!</h2>
      <p>Your final score: {{ score }} / {{ questions.length }}</p>
      <button @click="startGame">Play Again</button>
    </div>
  </div>
</template>

<script>
import QuestionCard from "./components/QuestionCard.vue"
import StartScreen from "./components/StartScreen.vue"

export default {
  name: 'App', 

  components: {
    QuestionCard,
    StartScreen
  }, 

data() {
    return {
      questions: [ { question: "What does CSS stand for?", answers: [ "Cascading Style Sheets", "Creative Style System", "Computer Style Syntax", "Coloured Screen Sheets" ], correct: 0 },
      { question: "What is the capital of France?", answers: [ "Berlin", "Madrid", "Paris", "Rome" ], correct: 2 },
      { question: "What does HTML stand for?", answers: [ "Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "High-Level Text Markup Language", "Hyper Text Management Language" ], correct: 0 },
      { question: "Which language is used for styling web pages?", answers: [ "HTML", "CSS", "JavaScript", "PHP" ], correct: 1 },
      { question: "Which is not a JavaScript framework?", answers: [ "Vue.js", "React", "Angular", "Django" ], correct: 3 },
      { question: "What does SQL stand for?", answers: [ "Structured Query Language", "Structured Question Language", "Scripting Query Language", "Standard Query Language" ], correct: 0 },
      { question: "What is the main purpose of JavaScript?", answers: [ "To style web pages", "To structure web pages", "To add interactivity to web pages", "To manage databases" ], correct: 2 },
      { question: "Which HTML element is used to define a navigation link?", answers: [ "<link>", "<nav>", "<a>", "<ul>" ], correct: 2 },
      { question: "What does API stand for?", answers: [ "Application Programming Interface", "Application Programming Integration", "Application Program Interaction", "Application Programming Internet" ], correct: 0 },
      { question: "Which of the following is a front-end framework?", answers: [ "Django", "Flask", "React", "Ruby on Rails" ], correct: 2 }],
      currentIndex: 0, 
      score: 0, 
      gameState: "start" 
    }
  },

  methods: {
    startGame(){
      this.gameState = "playing"
      this.currentIndex = 0
      this.score = 0
    },

    handleAnswer(isCorrect) {
      console.log("Was correct?", isCorrect)

      if (isCorrect) {
        this.score++
      }

      this.currentIndex++

      if (this.currentIndex == this.questions.length) {
        this.gameState = "end"
      }
    },

    resetGame(){
      this.gameState = "start" 
    }
  }
}
</script>

