<template>
  <div class="question-card">
    <h2 class="question-text">{{ question.question }}</h2>

    <div class="answers">
      <button
        v-for="(answer, index) in question.answers"
        :key="index"
        :disabled="selectedAnswer !== null"
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
    },
    selectedAnswer: {
      type: Number,
      default: null
    }
  },

  methods: {
    selectAnswer(index) {
      if (this.selectedAnswer === null) {
        this.$emit("answer", index)
      }
    },

    buttonClass(index) {
      if (this.selectedAnswer === null) return ""

      if (index === this.question.correct) {
        return "correct"
      }

      if (index === this.selectedAnswer && index !== this.question.correct) {
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

button.correct {
  background-color: #4caf50;
  color: white;
}

button.wrong {
  background-color: #f44336;
  color: white;
}
</style>
