## Phase 2 AI Log 

[ChatGPT] Where can I find the Pinia section of the Vue DevTool?

[Claude Opus 4.1] Rewrite my QuestionCard.vue for a Vue 3 quiz game using the Options API. It receives two props: question (object with question, answers, correct) and selectedAnswer (Number or null, default null). When a button is clicked and selectedAnswer is null, emit 'answer' with the button's index number. Use a buttonClass(index) method to return 'correct' on the correct answer and 'wrong' on the clicked wrong answer, only after selectedAnswer is not null. Disable all buttons once selectedAnswer is not null. No setTimeout inside the component — timing is handled by the parent. 