import { createStore, Module } from 'vuex-smart-module';
import { cryptoCurrenciesModule } from './modules/cryptoCurrencies/store';
import { quizModule } from './modules/quizModule/store';

const root = new Module({
  modules: {
    cryptoCurrenciesModule,
    quizModule
  }
})

const store = createStore(root);

export default store;