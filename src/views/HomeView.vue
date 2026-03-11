<template>
  <div class="home-view">
    <StartScreen @start="goToPlay" />
  </div>
</template>

<script>
import StartScreen from "../components/StartScreen.vue"
import { useGameStore } from "../stores/gameStore"

export default {
  name: "HomeView",

  components: {
    StartScreen
  },

  created() {
    // instantiate the store so it appears in DevTools
    this.gameStore = useGameStore()
    window.gameStore = this.gameStore
  },

  methods: {
    goToPlay() {
      this.gameStore.startGame()
      sessionStorage.setItem('gameStarted', 'true')
      this.$router.push({ name: 'play' })
    }
  }
}
</script>
