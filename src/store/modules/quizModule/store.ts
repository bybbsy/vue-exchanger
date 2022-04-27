import { Actions, Getters, Module, Mutations } from "vuex-smart-module";
import { Answer, Choice, QuestionModel, QuestionResult, Quiz, QuizModel, QuizResult } from "./types";

class QuizState implements QuizModel {
  isQuiz = false
  currentPage = 0;
  currentQuiz: Quiz | null = null;
  allQuizzes: Quiz[] | null = null;
  quizResult: QuizResult = { name: '', answers: []};
}

class QuizGetters extends Getters<QuizState> {
  get isQuiz(): boolean {
    return this.state.isQuiz;
  }

  get currentPage(): number {
    return this.state.currentPage;
  }

  get currentQuiz(): Quiz | null {
    return this.state.currentQuiz;
  }

  get allQuizzes(): Quiz[] | null {
    return this.state.allQuizzes;
  }

  get getQuestion() {
    return this.state.currentQuiz?.questions[this.state.currentPage];
  }

  get getCountOfQuestions() {
    return this.state.currentQuiz?.questions.length;
  }
}

class QuizMutations extends Mutations<QuizState> {
  setCurrentQuiz(data: Quiz | null) {
    this.state.currentQuiz = data;
  }

  setResultQuiz(data: QuizResult) {
    this.state.quizResult = data
  }

  setAnswer(payload: { question: QuestionModel, result: QuestionResult}) {
    payload.question.result = payload.result;
  }

  setQuizzes(data: Quiz[]) {
    this.state.allQuizzes = data;
  }

  setPage(data: number) {
    this.state.currentPage = data;
  }

  setIsQuiz(data: boolean) {
    this.state.isQuiz = data;
  }

  incrementPage() {
    this.state.currentPage++;
  }
  
  decrementPage() {
    this.state.currentPage--;
  }
}

class QuizActions extends Actions<QuizState, QuizGetters, QuizMutations> {
  fetchQuizzes(): Quiz[] {
    const quizzes = [
      {
        name: 'Test quiz',
        description: 'A smiple quiz for testing as as as as  this components. I used store with vuex-smart-module bla bla bla',
        questions: [
          {
            name: 'Question 1',
            question: "Da f*ck is that?",
            choices: [
              {
                choice: 'Question',
                truthy: false
              },
              {
                choice: 'Dunno',
                truthy: true
              }
            ]
          },
          {
            name: 'Who is that?',
            question: "Da who is that?",
            picture: 'https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5d126b057a7db000b0e80241_5d126b2340b83500afc4dff8/scale_1200',
            choices: [
              {
                choice: 'mr.Simpson',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'Garbage',
                truthy: false
              },
              {
                choice: 'A beer',
                truthy: false
              }
            ]
          }
        ]
      },
      {
        name: 'A vuex quiz',
        description: 'A smiple quiz for testing as as as as  this components. I used store with vuex-smart-module bla bla bla',
        questions: [
          {
            name: 'Vue essentials',
            question: "What's Vuejs?",
            choices: [
              {
                choice: 'A framework',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'A beer',
                truthy: false
              }
            ]
          },
          {
            name: 'Vue logo',
            question: "Da who is that?",
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png',
            choices: [
              {
                choice: 'A Vuejs logo',
                truthy: true
              },
              {
                choice: 'A react logo',
                truthy: false
              },
            ]
          },
          {
            name: 'Vue instance',
            question: "How to create a Vue instance in vuejs 2?",
            picture: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png',
            choices: [
              {
                choice: 'New Vue(options)',
                truthy: true
              },
              {
                choice: 'Vue(options)',
                truthy: false
              },
            ]
          },
          {
            name: 'Why vue',
            question: "Why you should use Vuejs instead of other frameworks?",
            choices: [
              {
                choice: 'Vue is cool',
                truthy: false
              },
              {
                choice: 'Vue is extremely lightweight frameworks which easily allows you to create SPA',
                truthy: true
              },
              {
                choice: 'Cuz you dunno',
                truthy: false
              },
              {
                choice: 'Cuz you dont know anything except Vue',
                truthy: false
              },
            ]
          },
          {
            name: 'When Vuejs was rolled out?',
            question: "When Vuejs was created?",
            choices: [
              {
                choice: '2014',
                truthy: true
              },
              {
                choice: '1978',
                truthy: false
              },
              {
                choice: '2015',
                truthy: false
              },
              {
                choice: '2020',
                truthy: false
              },
            ]
          },
          {
            name: 'Who created ?',
            question: "Some cool guy has been developing Vuejs for a couple of years. Who is that?",
            choices: [
              {
                choice: 'Evan You',
                truthy: true
              },
              {
                choice: 'Marc zuck',
                truthy: false
              },
              {
                choice: 'Vagabound',
                truthy: false
              },
              {
                choice: 'React team',
                truthy: false
              },
            ]
          },
          {
            name: 'Reactivity',
            question: "How you can use reactivity in vue?",
            choices: [
              {
                choice: 'To reactivily update data',
                truthy: true
              },
              {
                choice: 'To buy a beer',
                truthy: false
              },
              {
                choice: 'To create react app',
                truthy: false
              },
              {
                choice: 'React ',
                truthy: false
              },
            ]
          },
          {
            name: 'State manager',
            question: "Which state manager is recommended by Vue team?",
            choices: [
              {
                choice: 'Vuex',
                truthy: false
              },
              {
                choice: 'vuex-smart-module',
                truthy: false
              },
              {
                choice: 'vuex-simple',
                truthy: false
              },
              {
                choice: 'Pinia',
                truthy: true
              },
            ]
          },
          {
            name: 'Type of components',
            question: "What type of ogranisation of components vue offers?",
            choices: [
              {
                choice: 'SFC (Single File Components)',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'I need to ask Evan...',
                truthy: false
              },
              {
                choice: 'Alright, stackoverflow...',
                truthy: false
              },
            ]
          }
        ]
      },
      {
        name: 'Test quiz',
        description: 'A smiple quiz for testing as as as as  this components. I used store with vuex-smart-module bla bla bla',
        questions: [
          {
            name: 'Question 1',
            question: "Da f*ck is that?",
            choices: [
              {
                choice: 'Question',
                truthy: false
              },
              {
                choice: 'Dunno',
                truthy: true
              }
            ]
          },
          {
            name: 'Who is that?',
            question: "Da who is that?",
            picture: 'https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5d126b057a7db000b0e80241_5d126b2340b83500afc4dff8/scale_1200',
            choices: [
              {
                choice: 'mr.Simpson',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'Garbage',
                truthy: false
              },
              {
                choice: 'A beer',
                truthy: false
              }
            ]
          }
        ]
      },
      {
        name: 'Test quiz',
        description: 'A smiple quiz for testing as as as as  this components. I used store with vuex-smart-module bla bla bla',
        questions: [
          {
            name: 'Question 1',
            question: "Da f*ck is that?",
            choices: [
              {
                choice: 'Question',
                truthy: false
              },
              {
                choice: 'Dunno',
                truthy: true
              }
            ]
          },
          {
            name: 'Who is that?',
            question: "Da who is that?",
            picture: 'https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5d126b057a7db000b0e80241_5d126b2340b83500afc4dff8/scale_1200',
            choices: [
              {
                choice: 'mr.Simpson',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'Garbage',
                truthy: false
              },
              {
                choice: 'A beer',
                truthy: false
              }
            ]
          }
        ]
      },
      {
        name: 'Test quiz',
        description: 'A smiple quiz for testing as as as as  this components. I used store with vuex-smart-module bla bla bla',
        questions: [
          {
            name: 'Question 1',
            question: "Da f*ck is that?",
            choices: [
              {
                choice: 'Question',
                truthy: false
              },
              {
                choice: 'Dunno',
                truthy: true
              }
            ]
          },
          {
            name: 'Who is that?',
            question: "Da who is that?",
            picture: 'https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5d126b057a7db000b0e80241_5d126b2340b83500afc4dff8/scale_1200',
            choices: [
              {
                choice: 'mr.Simpson',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'Garbage',
                truthy: false
              },
              {
                choice: 'A beer',
                truthy: false
              }
            ]
          }
        ]
      },{
        name: 'Test quiz',
        description: 'A smiple quiz for testing as as as as  this components. I used store with vuex-smart-module bla bla bla',
        questions: [
          {
            name: 'Question 1',
            question: "Da f*ck is that?",
            choices: [
              {
                choice: 'Question',
                truthy: false
              },
              {
                choice: 'Dunno',
                truthy: true
              }
            ]
          },
          {
            name: 'Who is that?',
            question: "Da who is that?",
            picture: 'https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5d126b057a7db000b0e80241_5d126b2340b83500afc4dff8/scale_1200',
            choices: [
              {
                choice: 'mr.Simpson',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'Garbage',
                truthy: false
              },
              {
                choice: 'A beer',
                truthy: false
              }
            ]
          }
        ]
      },
      {
        name: 'Test quiz',
        description: 'A smiple quiz for testing as as as as  this components. I used store with vuex-smart-module bla bla bla',
        questions: [
          {
            name: 'Question 1',
            question: "Da f*ck is that?",
            choices: [
              {
                choice: 'Question',
                truthy: false
              },
              {
                choice: 'Dunno',
                truthy: true
              }
            ]
          },
          {
            name: 'Who is that?',
            question: "Da who is that?",
            picture: 'https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5d126b057a7db000b0e80241_5d126b2340b83500afc4dff8/scale_1200',
            choices: [
              {
                choice: 'mr.Simpson',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'Garbage',
                truthy: false
              },
              {
                choice: 'A beer',
                truthy: false
              }
            ]
          }
        ]
      },
      {
        name: 'Test quiz',
        description: 'A smiple quiz for testing as as as as  this components. I used store with vuex-smart-module bla bla bla',
        questions: [
          {
            name: 'Question 1',
            question: "Da f*ck is that?",
            choices: [
              {
                choice: 'Question',
                truthy: false
              },
              {
                choice: 'Dunno',
                truthy: true
              }
            ]
          },
          {
            name: 'Who is that?',
            question: "Da who is that?",
            picture: 'https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5d126b057a7db000b0e80241_5d126b2340b83500afc4dff8/scale_1200',
            choices: [
              {
                choice: 'mr.Simpson',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'Garbage',
                truthy: false
              },
              {
                choice: 'A beer',
                truthy: false
              }
            ]
          }
        ]
      },
      {
        name: 'Test quiz',
        description: 'A smiple quiz for testing as as as as  this components. I used store with vuex-smart-module bla bla bla',
        questions: [
          {
            name: 'Question 1',
            question: "Da f*ck is that?",
            choices: [
              {
                choice: 'Question',
                truthy: false
              },
              {
                choice: 'Dunno',
                truthy: true
              }
            ]
          },
          {
            name: 'Who is that?',
            question: "Da who is that?",
            picture: 'https://avatars.mds.yandex.net/get-zen_doc/1538903/pub_5d126b057a7db000b0e80241_5d126b2340b83500afc4dff8/scale_1200',
            choices: [
              {
                choice: 'mr.Simpson',
                truthy: true
              },
              {
                choice: 'Dunno',
                truthy: false
              },
              {
                choice: 'Garbage',
                truthy: false
              },
              {
                choice: 'A beer',
                truthy: false
              }
            ]
          }
        ]
      }
    ]

    this.commit('setQuizzes', quizzes);

    return quizzes;
  }

  openQuiz(data: number): void {
    if(this.state.allQuizzes) {
      const quiz = this.state.allQuizzes[data];

      const resultQuiz: QuizResult = {
        name: quiz.name,
        answers: []
      }
      
      this.commit('setCurrentQuiz', quiz);
      this.commit('setIsQuiz', true);
      this.commit('setPage', 0);
      this.commit('setResultQuiz', resultQuiz)
    }
  }

  closeQuiz() {
    if(this.state.isQuiz) {
      this.commit('setCurrentQuiz', null);
      this.commit('setIsQuiz', false);
      this.commit('setPage', 0);
      this.commit('setResultQuiz', { name: '', answers: [] })
    }
  }

  nextPage() {
    if(this.state.currentQuiz?.questions.length as number > this.state.currentPage + 1) {
      this.commit('incrementPage');
    }
  }

  setAnswer(payload: { question: QuestionModel, choice: Choice}): void {
    const result: QuestionResult = payload.choice.truthy ? 'right' : 'wrong';

    this.commit('setAnswer', { question: payload.question, result })
  }

  prevPage() {
    if(this.state.currentPage + 1 >= 1) {
      this.commit('decrementPage');
    }
  }
}

export const quizModule = new Module({
  state: QuizState,
  getters: QuizGetters,
  actions: QuizActions,
  mutations: QuizMutations
})

