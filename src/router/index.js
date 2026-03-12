import { createRouter, createWebHistory } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import HomeView from '../views/HomeView.vue'
import PlayView from '../views/PlayView.vue'
import LeaderboardView from '../views/LeaderboardView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/play', name: 'play', component: PlayView },
  { path: '/leaderboard', name: 'leaderboard', component: LeaderboardView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const store = useGameStore()

  if (to.name === 'play' && store.gameState !== 'playing') {
    return { name: 'home' }
  }
})

export default router