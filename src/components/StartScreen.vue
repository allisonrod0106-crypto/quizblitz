<template>
  <div class="start-screen">
    <h1>QuizBlitz</h1>
    <p>Your quick and fun quiz challenge!</p>
    <button @click="startQuiz">Play</button>
  </div>
</template>

<script>
export default {
  name: 'StartScreen',
  methods: {
    startQuiz() {
      this.$emit('start');
    }
  }
};
</script>

<style scoped>
.start-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Full height to center the content */
  background-color: purple; /* Light background color */
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 24px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: pink; /* Blue background color */
  color: black; 
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3; /* Darker blue on hover */
}
</style>