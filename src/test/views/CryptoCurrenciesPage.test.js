import { render } from "@testing-library/vue";
import CryptoCurrenciesPage from '@/views/CryptoCurrenciesPage.vue';

import { inject } from "vuex-smart-module";

import { cryptoCurrenciesModule } from '@/store/modules/cryptoCurrencies/store';
import { useStore } from 'vuex';
import store from '@/store/index.ts';

test('Test render', () => { 
  
  const { getByText} = render(CryptoCurrenciesPage, {
    data() {
      return {
        cryptoContext: store,
        currencies: [],
        enabled: true
      }
    },
    computed: {
      isDataLoading() {
        return this.ctx;
      }
    }
  });

  // const title = getByText('Cryptocurrencies:');

  // expect(title).toBeTruthy();
})