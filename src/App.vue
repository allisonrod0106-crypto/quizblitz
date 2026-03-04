<template>
  <div id="app">
    <h1>QuizBlitz</h1>

    <QuestionCard
    :question="testQuestion"
    @answer="handleAnswer"
    />
  </div>
</template>

<script>
import QuestionCard from "./components/QuestionCard.vue"
export default {
  name: 'App', 

  components: {
    QuestionCard
  }, 

data() {
    return {
      testQuestion: {
        question: "What does CSS stand for?",
        answers: [
          "Cascading Style Sheets",
          "Creative Style System",
          "Computer Style Syntax",
          "Coloured Screen Sheets"
        ],
        correct: 0
      }
    }
  },

  methods: {
    handleAnswer(isCorrect) {
      console.log("Was correct?", isCorrect)
      alert(isCorrect ? "Correct!" : "Wrong!")
    }
  }
}
</script>

