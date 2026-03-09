<template>
  <div class="home-view">
    <StartScreen @start="goToPlay" />
  </div>
</template>

<script>
import StartScreen from "../components/StartScreen.vue"

export default {
  name: "HomeView",

  components: {
    StartScreen
  },

  methods: {
    goToPlay() {
      this.$router.push({ name: "play" })
    }
  }
}
</script>
