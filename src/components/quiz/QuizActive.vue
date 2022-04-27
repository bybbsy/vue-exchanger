<template>
  <header class="quiz-header quiz-header_stage_active">
      <div class="quiz-group quiz-group_flex">
        <slot name="current-tab" :index="page">
          <div class="counter-current__tab">{{ page + 1 }}</div>
        </slot>
        <div class="counter-divider">
          <slot name="counter-divider">
            <span>/</span>
          </slot>
        </div>
        <div class="counter-total__tabs">
          <slot name="total-tabs" :total="quizLength">
            <p>{{ quizLength }}</p>
          </slot>
        </div>
      </div>
      <div class="quiz-header__title" :title="quiz.name">
        <div class="quiz-group quiz-group_flex">
          <h2>{{ quiz.name }}</h2>
        </div>
      </div>
      <div class="quiz-header__controls">
        <div class="quiz-group quiz-group_flex" @click="finishQuiz">
          <button type="button" class="button-header button-header__close">x</button>
        </div>
      </div>
    </header>
    <main class="quiz-main quiz-main_stage_active">
        <div class="main-question">
          <slot v-if="getQuestion.picture" name="question-picture" :question-picture="getQuestion.picture">
            <div class="question-image">
              <img :src="getQuestion.picture" alt="Image">
            </div>
          </slot>
          <slot v-if="getQuestion.video" name="question-video" :question-video="getQuestion.video">
            <div class="question-video">
              <iframe class="quiz-video" :src="getQuestion.video" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
          </slot>
          <slot name="question-text" :question-text="getQuestion.question">
            <div class="question-text">
              <p>{{ getQuestion.question }}</p>
            </div>
          </slot>
        </div>
        <div class="quiz-main__controls">
          <button class="button-choice button-choice__purple" v-for="(choice, choiceIndex) in getQuestion.choices" :key="choiceIndex" @click="handleQuizAnswer(getQuestion, choice, page)">
            <span class="button-text">{{ choice.choice }}</span>
          </button>
        </div>
    </main>
    <footer class="quiz-footer quiz-footer_stage_active">
      <div class="quiz-footer__result-wrapper">
        <p class="question-result" :class="{ 'question-result__success': result.right, 'question-result__error': !result.right }" v-if="result.message.length">{{ result.message }}</p>
      </div>
      <div class="quiz-footer__controls quiz-footer__controls_finish">
        <div class="footer-navigation">
          <button class="button-footer button-footer__tomato" :disabled="page + 1 === quiz.questions.length" @click="handleNextPage">Prev</button>
          <button class="button-footer button-footer__tomato" @click="handlePrevPage">Next</button>
        </div>
      </div>
    </footer>
</template>

<script lang="ts">
import { Choice, QuestionModel, Quiz } from '@/store/modules/quizModule/types'
import { computed, defineComponent, onBeforeUnmount, PropType, reactive } from 'vue'

export default defineComponent({
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
  emits: ['is-finished'],
  setup(props, { emit }) {
    const quizLength = computed(() => props.quiz.questions.length);
    
    let timeId: any;

    const result = reactive({
      message: '',
      right: null as (boolean | null)
    });

    const resultSucces = () => {
      result.message = props.successMessage;
      result.right = true;
    }

    const resultError = () => {
      result.message = props.errorMessage;
      result.right = false;
    }

    const resultEmpty = () => {
      result.message = "";
      result.right = null;
    }

    function handleIsQuizFinished() {
      console.log(props.page + 1 === props.quiz.questions.length, props.page)
      if(props.page + 1 === props.quiz.questions.length) {
        emit('is-finished', true)
      } else {
        emit('is-finished', false)
      }
    }

    const handleQuizAnswer = (question: QuestionModel, choice: Choice) => {
      clearTimeout(timeId);

      if(choice.truthy === false) {
        resultError()

        timeId = setTimeout(() => {
          props.setAnswer({ question, choice });

          resultEmpty();
          handleIsQuizFinished();
          props.nextPage();
        },2000)

      } else {
        resultSucces();
        
        timeId = setTimeout(() => {
          props.setAnswer({ question, choice });

          handleIsQuizFinished();

          resultEmpty();

          props.nextPage(); 
        }, 2000)
      }
    }
    
    return {
      quizLength,
      handleQuizAnswer,
      result
    }
  },
})
</script>
