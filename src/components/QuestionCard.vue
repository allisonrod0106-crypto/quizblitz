<template>
  <div class="question-card">
    <h2 class="question-text">{{ question.question }}</h2>

    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :disabled="answered"
        :class="buttonClass(index)"
        @click="selectAnswer(index)"
      >
        {{ answer }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",

  props: {
    question: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      answered: false,
      selectedIndex: null
    }
  },

  methods: {
    selectAnswer(index) {
      if (this.answered) return

      this.answered = true
      this.selectedIndex = index

      const isCorrect = index === this.question.correct

      setTimeout(() => {
        this.$emit("answer", isCorrect)

        // reset state
        this.answered = false
        this.selectedIndex = null
      }, 1000)
    },

    buttonClass(index) {
      if (!this.answered) return ""

      if (index === this.question.correct) {
        return "correct"
      }

      if (index === this.selectedIndex && index !== this.question.correct) {
        return "wrong"
      }

      return ""
    }
  }
}
</script>

<style scoped>
.question-card {
  text-align: center;
}

.answers {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.correct {
  background-color: #4caf50;
  color: white;
}

.wrong {
  background-color: #f44336;
  color: white;
}
</style>