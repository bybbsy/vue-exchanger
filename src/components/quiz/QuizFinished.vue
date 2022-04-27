<template>
  <header class="quiz-header quiz-header_stage_finish">
    <transition appear>
      <div class="quiz-group quiz-group_flex">
          <h2>Results of completing the quiz: "{{ results.name }}"</h2>
        </div>
    </transition>
  </header>
  <main class="quiz-main quiz-main_stage_finish">
    <ul class="list answers__list"> 
        <li class="list__item" v-for="(answer, i) in results.answers" :key="i">
          <transition appear @before-appear="beforeAppear">
            <div class="list-item__inner">
              <h4 class="list-item__content">Question: {{ answer?.question }}</h4>
              <p class="list-item__content">Your answer: 'answer'</p>
              <p class="list-item__content list-item__content_answer" :class="getAnswerColor(answer.result)">{{ answer?.result }}</p>
            </div>
          </transition>
        </li> 
    </ul>
    <div class="answers-chart">
      <canvas ref="answersCanvas" id="asaa" class="quiz-canvas"></canvas>
    </div>
  </main>
  <footer class="quiz-footer quiz-footer_stage_finish">
    <div class="quiz-footer__result-wrapper quiz-footer__result-wrapper-finish">
      <p >Your result is <span :class="[ rightPC >= 50 ? 'text__success' : 'text__error']">{{ rightPC }}%</span></p>
    </div>
    <div class="quiz-footer__controls quiz-footer__controls_finish">
      <div class="footer-buttons">
        <button class="button-footer button-footer_finish" @click="finishQuiz">Finish quiz</button>
        <router-link class="button-footer button-footer_finish" to="/quiz">Pick another quiz</router-link>
        <router-link class="button-footer button-footer_finish" to="/">Home page</router-link>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { QuizResult } from '@/store/modules/quizModule/types'
import Chart, { ChartItem, TooltipItem } from 'chart.js/auto';
import { defineComponent, onMounted, PropType, ref } from 'vue'

import { RendererElement } from 'vue'

export default defineComponent({
  name: 'quiz-finished',
  props: {
    results: {
      type: Object as PropType<QuizResult>
    },
    finishQuiz: {
      type: Function,
      required: true
    },
  },
  setup(props) {

    let answersCanvas = ref<HTMLCanvasElement | null>(null);
    let ctx = ref<CanvasRenderingContext2D | null>(null); 

    const totalAnswers = props.results?.answers.length as number;

    let right = props.results?.answers.reduce((acc, el) => {
      if(el.result ==='right') {
        acc++;  
        return acc; 
      }
      return acc;
    }, 0) as number

    let rightPC = ((right / totalAnswers) * 100).toFixed(1);

    let wrongPC = (((totalAnswers - right) / totalAnswers) * 100).toFixed(1); 
    
    
    const results: string[] = [];
    const labels: string[] = [];
    const colors: string[] = [];
    const hoverColors: string[] = [];

    if(Number(rightPC) !== 0) {
      results.push(rightPC);
      labels.push('Right');
      colors.push('#42b983');
      hoverColors.push('#55c08f');
    }
     
    if(Number(wrongPC) !== 0) {
      results.push(wrongPC);
      labels.push('Wrong');
      colors.push('#EF5350');
      hoverColors.push('#f16462');
    }

    console.log(results);

    onMounted(() => {
      if(answersCanvas.value) {
        ctx.value = answersCanvas.value.getContext('2d');
        
        new Chart(ctx.value as ChartItem, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [
              { 
                data: results,
                backgroundColor: colors,
                borderWidth: 1.5,
                offset: 8,
                hoverOffset: 2,
                hoverBackgroundColor: hoverColors
              }
            ] 
          },
          options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins:{
              title: {
                display: true,
                text: 'Your scores',
                color: 'white',
                font: {
                  size: 16,
                  weight: '600'
                }
              },
              tooltip: {
                callbacks: {
                  beforeBody: (items: TooltipItem<'line'>[] ): string => {
                    let str = '';
                    
                    items.forEach((item) => {
                      str += 'Result: ' + (item.dataset.data[item.dataIndex]) + '%';
                    })

                    return str
                  } 
                }
              }
            }
          }
        })
      }
    })

        
    let step = 1;
    
    function beforeAppear(el: RendererElement) {
      setTimeout(() => {
        el.classList.add('tg') 
      }, 500 * step)

      step += 1; 
    }  

    function getAnswerColor(answer: string) {
      
      return answer === 'right' ? 'list-item__content_succes' : 'list-item__content_error'
    }

    return {
      answersCanvas,
      beforeAppear,
      getAnswerColor,
      rightPC
    }
  },
})
</script>

<style>
.header-title {
  font-size: 1.4em;
  font-weight: 600;
}

.quiz-header_stage_finish {
  justify-content: center;
}

.answers__list {
  display: flex;
  flex-direction: column;
}

.list-item__inner {
  position: relative;
  display: flex;
  width: 100%;
  visibility: hidden;
  transition: all 0.5s ease;
  align-items: center;
  margin: 5px 0;
}

.list-item__inner::before {
  content: '';
  position: absolute;
  top: 2px;
  left: -3px;
  height: 100%;
  width: 30px;
  border-left: 1px solid salmon;
  border-bottom: 1px solid salmon;;
}

.list-item__content {
  display: block;
  margin: 0 5px;
}

.list-item__content_answer:hover::before {
  top: 0;
  left: 0;
  transform: translate(0, 0);
}

.list-item__content:last-child {
  margin: 0 0 0 auto;
}

.list-item__content_answer {
  position: relative;
  padding: 5px 7px;
  width: 58px;
  border-radius: 2px;
  text-align: center;
  cursor: pointer;
}

.list-item__content_answer::before {
  content: '';
  position: absolute;
  display: block;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-45%, -45%);
  z-index: -1;
  transition: all 0.2s ease;
}

.list-item__content_error {
  background-color: #EF5350;
}

.list-item__content_error::before {
  background-color: #ee8b89;
}

.list-item__content_succes {
  background-color: #42b983;
}

.list-item__content_succes::before {
  background-color: #94bdab;
}

.text__success {
  color: #42b983;
}

.text__error {
  color: #ee8b89;
}

.tg {
  visibility: visible;
  transform: translateX(30px);
}

.quiz-main_stage_finish {
  display: grid;
  background-color: transparent;
  padding: 0;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  align-items: center;
  height: 70%;
}

.quiz-footer__controls_finish {
  justify-content: center;
}

.footer-buttons {
  display: flex;
  column-gap: 15px;
}

.quiz-footer__result-wrapper-finish {
  font-size: 2em;
}

.quiz-canvas {
  /* overflow: visible; */
  /* border: 1px solid tomato; */
  display: flex; 
  min-width: 576px;
  max-height: 550px;
}

.button-footer_finish {
  background-color: tomato;
  padding: 20px 15px;
  font-weight: 500;
  transition: 0.5s all ease;
}

.button-footer_finish:hover {
  background-color: rgb(248, 149, 132);
}
</style>