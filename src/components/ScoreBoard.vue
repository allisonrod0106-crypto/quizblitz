 <template>
  <div class="score-board">
    <h1>Game Over</h1>
    <p>Your Score: {{ score }} / 10</p>
    <button @click="playAgain">Play Again</button>
  </div>
</template>

<script>
export default {
  name: 'ScoreBoard',
  props: {
    score: {
      type: Number,
      required: true
    }
  },
  methods: {
    playAgain() {
      this.$emit('restart');
    }
  }
};
</script>

<style scoped>
.score-board {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height to center the content */
  background-color: #f0f0f0; /* Light background color */
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

p {
  font-size: 1.5rem;
  margin-bottom: 24px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #28a745; /* Green background color */
  color: white; /* White text color */
  transition: background-color 0.3s;
}

button:hover {
  background-color: #218838; /* Darker green on hover */
}
</style>