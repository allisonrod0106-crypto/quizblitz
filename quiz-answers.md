# Quiz 2 Answers
**Name:** Allison Rodriguez
**Date:** 29 March 2026



## Q1

D. The component should emit an event to the parent requesting the change, and the parent should update its own data in response. 


## Q2

```js
//add reactive flag for lastAnswerCorrect
state: {
  questions: [],
  currentIndex: 0,
  score: 0,
  lastAnswerCorrect: null
},
//set flag during submission
actions: {
  submitAnswer(index) {
    const correct = index === this.questions[this.currentIndex].correct;
    this.lastAnswerCorrect = correct;

    if (correct) {
      this.score++;
    }

    this.nextQuestion();
  }
}
```
 `QuestionCard.vue` depends on game state that already lives centrally. Reading `lastAnswerCorrect` directly from the store keeps a single source of truth and avoids unnecessary drilling through App.vue. It also ensures all components stay in sync automatically when the state updates, making the UI easier to maintain.


## Q3

C. All component instances that call `useGameStore()` share the same state object in memory, meaning a state change in one component affects all others simultaneously.

## Q4

    Part A: 

The issue is that `App.vue` is not using Vue Router to render routes. Instead of relying on routing, it conditionally renders `<GameView>`` with `v-if``. When navigating to `/play`, Vue Router successfully updates the URL, but there is no `<router-view>` placeholder, so it has nowhere to inject the matched component. As a result, nothing appears and the screen looks blank.

    Part B: 

```html
<template>
    <div>
        <h1>QuizBlitz</h1>
        <router-view />
    </div>
</template>
```

`<router-view>` is a built-in component that acts as a dynamic outlet. Vue Router renders the component that matches the current URL inside this slot. This keeps routing logic separate from UI conditions and ensures navigation works correctly.

## Q5

B. Approach B, because ScoreBoard only displays data it receives — keeping it decoupled from the store makes it easier to reuse or test in isolation.

## Q6

The error occur becuase arrays are 0-indexed and the last valid index is length - 1. Accessing length returns undefined, so `currentQuestion.text` throws an error because you're trying to read `.text` of something undefined.
FIX: 
```js
//add fix in the getter
getters: {
  currentQuestion: (state) => {
    if (state.currentIndex >= state.questions.length) {
      return null;
    }
    return state.questions[state.currentIndex];
  }
}
```
The getter was the better place for the fix as it centralizes the guard in one place which makes all components safe from out of bounds access. It is more efficient than relying on every action to perfectly manage the indices. 
## Q7

B. Using index as :key is acceptable here because the answers array for a given question does not change while the component is mounted; the risk of key-related bugs only arises when the list can be reordered or items deleted.

## Q8

Local file approach

Advantage:
Loading from a local `questions.js` file is instant and reliable. `startGame()` can synchronously populate `this.questions` with no network delay or failure risk. This keeps transitions into `gameState = 'playing'` smooth and predictable.
Disadvantage:
The questions are static. Updating or expanding content requires redeploying the app, and all users see the same fixed set, limiting replayability.

Remote API approach

Advantage:
Fetching from an API allows for dynamic, up-to-date questions. You can randomize or expand the pool without changing the frontend, improving variety and scalability.
Disadvantage:
It introduces latency and failure states. `startGame()` becomes asynchronous, so you must handle loading/error states. If the request fails, questions may remain empty and break the flow.

My choice and reasoning:

I would choose the local file approach. It keeps `startGame()` simple and ensures questions is always populated before `currentIndex` is used. Since the app’s core logic depends on consistent data, avoiding async complexity makes development and debugging much easier early on.

## Q9

B. v-show hides elements with display: none but keeps them mounted, so startGame() would need to defend against being called while a game is already in progress, and the game state could persist unexpectedly between screen transitions.

## Q10

`useGameStore.js` changes: 

```js
//add timer state and interval tracking
state: () => ({
  questions: [],
  currentIndex: 0,
  score: 0,
  gameState: 'start',
  timeLeft: 15,
  timerId: null
})

//add timer actions
actions: {
  startTimer() {
    this.clearTimer();
    this.timeLeft = 15;

    this.timerId = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 0) {
        this.clearTimer();
        this.nextQuestion(); // no points awarded
      }
    }, 1000);
  },

  clearTimer() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  },

  nextQuestion() {
    this.clearTimer();
    this.currentIndex++;

    if (this.currentIndex < this.questions.length) {
      this.startTimer();
    } else {
      this.gameState = 'score';
    }
  },

  startGame() {
    this.currentIndex = 0;
    this.score = 0;
    this.gameState = 'playing';
    this.startTimer();
  },

  submitAnswer(index) {
    if (index === this.questions[this.currentIndex].correct) {
      this.score++;
    }
    this.nextQuestion();
  }
}
```

`QuestionCard.vue` changes:

```html
<div class="timer">
  Time left: {{ store.timeLeft }}s
</div>
```

Why the timer logic belongs in the store, not the component:

The timer is part of the core game state, not just UI. It directly controls progression with `nextQuestion()` and interacts with `score`, `currentIndex`, and `gameState`. Keeping it in the store ensures a single source of truth and guarantees consistent behavior regardless of which component is rendered. If placed in `QuestionCard.vue`, the timer could reset or break when the component is unmounted, leading to desynchronization between UI and game logic.

