<template>
    <div class="quiz-form">
      <quiz-active
        ref="quiz"
        v-if="!quizState"
        :quiz="quiz"
        :page="page"
        :finishQuiz="finishQuiz"
        :getQuestion="getQuestion"
        :nextPage="nextPage"
        :setAnswer="setAnswer"
        :errorMessage="errorMessage"
        @is-finished="checkQuiz">
      </quiz-active>
      <quiz-finished
        v-else
        :results="results"
        :finishQuiz="finishQuiz"
      ></quiz-finished>
    </div> 
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onUnmounted, PropType, ref} from "@vue/runtime-core";
import { Quiz } from '@/store/modules/quizModule/types';
import QuizActive from './QuizActive.vue';
import { computed } from "vue";

export default defineComponent({
  name: 'quiz-form',
  components: {
    QuizActive,
    QuizFinished: defineAsyncComponent(() => import('@/components/quiz/QuizFinished.vue'))
  },
  props: {
    quiz: {
      type: Object as PropType<Quiz>,
      required: true
    },
    page: {
      type: Number,
      required: true
    },
    finishQuiz: {
      type: Function,
      required: true
    },
    getQuestion: {
      type: Object,
      required: true
    },
    nextPage: {
      type: Function,
      required: true
    },
    setAnswer: {
      type: Function,
      required: true
    },
    successMessage: {
      type: String,
      default: "You're right!"
    },
    errorMessage: {
      type: String,
      default: "You're wrong :c"
    }
  }, 
  setup(props) {
    let quizState = ref(false);
    const checkQuiz = (value: boolean) => quizState.value = value;

    const results =  computed(() => {
      return {
        name: props.quiz.name,
        answers: props.quiz.questions.map((el) => {
          return {
            question: el.name,
            result: el.result
          }
        })
      }
    })

    onUnmounted(() => {
      props.finishQuiz();
    })

    return {
      checkQuiz,
      quizState,
      results
    }
  }
})
</script>

<style>
.quiz-form {
  display: flex;
  flex-direction: column;
  background-color: #292929;
  color: #ffff;
  padding: 10px 15px 25px;
  border-radius: 5px;
  width: 100%;
  height: 100%; 
  min-height: 30rem;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.2em;
}

.quiz-group_flex {
  display: flex;
  gap: 2px;
  padding: 3px 15px;
  border-radius: 5px;
  align-items: center;
  background: linear-gradient(0deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.3)), #121212;
}

.quiz-group_center {
  text-align: center;
}

.counter-current__tab {
  font-size: 1.1em;
  font-weight: 600;
}

.counter-divider {
  font-size: 0.9em;
}

.counter-total__tabs {
  font-size: 0.8em;
}

.quiz-main {
  display: flex;
  flex-direction: column;
  /* background-color: #BB86FC; */
  background-color: rgba(255, 255, 255, 0.2);
  padding: 8px;
  border-radius: inherit;
  height: calc(100% - 150px);
  justify-content: space-between;
}


.main-question {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 45%;
}

.question-image,
.question-audio,
.question-video {
  position: relative;
  display: flex;
  width: 50%;
  justify-content: center;
  align-items: center;
}

.question-image img,
.question-video .quiz-video,
.question-audio audio {
  display: flex;
  height: 100%;
  border-radius: 5px;
}

.quiz-video {
  width: 100%;
}

.question-image img {
  object-fit: contain;
}

.question-text {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 1.8em;
}

.quiz-main__controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  column-gap: 5px;
  height: 45%;
}

.button-choice {
  display: flex;
  flex: 1 1 33.333%;
  height: 100%;
  align-items: center;
  border-radius: 5px;
}

.button-text {
  font-size: 2em;
  width: 100%;
  display: block;
  text-align: center;
}

.button-choice__yellow {
  background-color: #f7eab1;
  color: #292929;
  transition: 0.5s all ease;
}

.button-choice__yellow:hover {
  background-color: rgb(255, 199, 94);
}

.button-choice__purple {
  background-color: #BB86FC;
}

.button-choice__purple:hover {
  background-color: #d0b1f7;
}

.question-result {
  padding: 7px 15px;
}

.question-result__success {
  background-color: #6aeb70;
}

.question-result__error {
  background-color: tomato;
}

.quiz-footer__controls {
  width: 100%;
  margin-top: 15px;
  display: flex;
  align-content: center; 
  justify-content: flex-end;
}

.quiz-footer__result-wrapper {
  height: 45px;
}

.footer-navigation {
  display: flex;
  column-gap: 15px;
}

.button-footer {
  display: flex;
  padding: 7px 15px;
  border-radius: 5px;
}

.button-footer__tomato {
  background-color: tomato;
}
</style>