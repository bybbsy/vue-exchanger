<template>
  <main-layout>
    <transition name="quiz-appear-animation" appear >
      <div class="quiz-wrapper" v-if="isQuiz" >
        <quiz-form
        :quiz="quiz"
        :page="page"
        :finishQuiz="handleFinishQuiz"
        :getQuestion="getQuestion"
        :nextPage="handleNextPage"
        :setAnswer="handleSetAnswer"
        :errorMessage="'Thats wrong, try again.'"
        >
        </quiz-form>
      </div>
    </transition>
    <ul class="quiz-list">
      <li class="quiz-item" v-for="(q, i) in allQuizzes" :key="i">
        <div class="top">
          <p class="quiz-item__title">Quiz: {{ q.name }}</p>
        </div>
        <div class="main">
          <p>{{ q.description }}</p>
        </div>
        <div class="foot">
          <button class="quiz-item__button" type="button" @click="handleStartQuiz(i)">Start quiz</button>
        </div>
      </li>
    </ul>
  </main-layout>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeUnmount } from 'vue'
import QuizForm from '@/components/quiz/QuizForm.vue';
import { quizModule } from '@/store/modules/quizModule/store';
import { useStore } from 'vuex';
import { Choice, QuestionModel } from '@/store/modules/quizModule/types';
import mainLayout from '@/layouts/mainLayout.vue';

export default defineComponent({
  name: 'quiz-page',
  components: {
    QuizForm,
    mainLayout
  },
  setup() {
    const quizContext = quizModule.context(useStore());

    quizContext.actions.fetchQuizzes();
    
    let quiz = computed(() => quizContext.getters.currentQuiz);
    let allQuizzes = computed(() => quizContext.getters.allQuizzes);
    
    const handleStartQuiz = (i: number) => quizContext.actions.openQuiz(i);
    const handleFinishQuiz = () => quizContext.actions.closeQuiz();
    const handleNextPage = () => quizContext.actions.nextPage();

    const handleSetAnswer = (payload: { question: QuestionModel, choice: Choice }) => quizContext.actions.setAnswer(payload);

    
    let getQuestion = computed(() => quizContext.getters.getQuestion);

    let isQuiz = computed(() => quizContext.getters.isQuiz);
    
    let page = computed(() => quizContext.getters.currentPage);
    
    return {
      quiz,
      page,
      allQuizzes,
      handleStartQuiz,
      handleFinishQuiz,
      handleNextPage,
      handleSetAnswer,
      getQuestion,
      isQuiz
    }
  },
  
})
</script>

<style>
.quiz-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(87, 32, 32, 0.5);
  padding: 15px;
  z-index: 1;
}

.quiz-appear-animation-enter-active,
.quiz-appear-animation-leave-active {
  transition: all 0.5s ease;
}

.quiz-appear-animation-enter-from,
.quiz-appear-animation-leave-to {
  opacity: 0;
  transform: scale(0) rotateZ(-180deg);
}

.quiz-appear-animation-enter-to,
.quiz-appear-animation-leave-from {
  opacity: 1;
  transform: scale(1) rotateZ(0);
}

.quiz-list {
  width: 100%;
  padding: 7px 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px 15px;
}

.quiz-item {
  max-width: 350px;
  /* height: 120px; */
  background-color: tomato;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* padding: 7px 15px; */
  transition: 0.5s all ease;
  box-shadow: 0px 0px 10px 5px rgba(134, 134, 134, 0.315);
}

.quiz-item:hover {
  /* transform: perspective(500px) scaleZ(2) rotateX(-15deg); */
  /* box-shadow: 0px 0px 10px 5px rgba(134, 134, 134, 0.9); */
}

.quiz-item .top {
  background-color: #fff;
  display: flex;
  border-radius: 5px 5px 0 0;
  padding: 3px;
  width: 100%;
  transition: 0.5s all ease;
}

.quiz-item .foot {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 0 0 5px 5px;
  padding: 5px;
  width: 100%;
  transition: 0.5s all ease;
}

.quiz-item .main {
  overflow: hidden;
  max-height: 0;
  transition: 1s all ease;
}

.quiz-item:hover .top {
  box-shadow: 0px 0px 10px 5px rgba(134, 134, 134, 0.315);
  transform: perspective(500px) scaleZ(2) scale(1.05) rotateX(-15deg);
}

.quiz-item:hover .foot {
  box-shadow: 0px 0px 10px 5px rgba(134, 134, 134, 0.315);
  transform: perspective(500px) scaleZ(2) scale(1.05) rotateX(15deg);
}

.quiz-item:hover .main { 
  max-height: 100px;
}

.quiz-item__title {
  font-weight: 600;
}

.quiz-item__button {
  max-width: 250px;
  border-radius: 7px;
  padding: 7px 15px;
  color: white;
  background-color: teal;
}

</style>