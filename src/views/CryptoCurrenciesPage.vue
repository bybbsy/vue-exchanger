<template> 
  <main-layout>
    <div class="py-5" v-if="!isDataLoading">
      <h1>Cryptocurrencies: </h1>
        <div class="table-container">
          <table class="currencies-table">
            <thead>
              <tr>
                <th>Icon</th>
                <th>Price</th>
                <th>24h, %</th>
                <th>Market stock</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(cur, index) in currencies"
                  :key="index"
                  class="table-border-bottom divide-gray-500">
                <td class="flex my-2">
                  <div class="currency-name flex items-center">
                    <div class="currency__image mr-5">
                      <img :src="cur.logo_url" class="object-contain w-8 h-8" alt="">
                    </div>
                    <div class="currency__name">{{ cur.name }} </div>
                    <div class="currency__id ml-1 text-gray-500 text-xs">{{ cur.id }}</div>
                  </div>
                </td>
                <td>
                  <div class="currency__price-change flex justify-between">
                    <div class="block mx-2 text-right" >${{ round(+cur.price) }}</div>
                  </div>
                </td>
                <td class="px-5">
                  <div class="currency__price-change flex justify-between">
                    <div class="block mx-2 text-right" :class="getPriceChangeColor(cur)">{{ round(+cur.ytd.price_change_pct, 1) }}%</div>
                    <chevron-up
                      v-if="+cur.ytd.price_change > 0"
                      class="w-4 h-4"
                      :class="getPriceChangeColor(cur)"
                      ></chevron-up>
                    <chevron-down
                      v-if="+cur.ytd.price_change < 0"
                      class="w-4 h-4"
                      :class="getPriceChangeColor(cur)"
                      ></chevron-down>
                  </div>
                </td>
                <td>
                  <div class="currency__market-stock text-right">${{ cur.market_cap }}</div>
                </td>
                <td>
                  <div class="currency__market-volume text-right flex flex-col">
                    <div class="block">{{ round(+cur.ytd.volume) }}</div>
                    <div class="block text-xs text-gray-400">{{ round(+cur.ytd.volume + +cur.ytd.volume_change) }} {{ cur.id }}</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    <!-- <Loader v-else/> -->
  </main-layout>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';
import chevronUp from '@/components/icons/chevronUp.vue';
import chevronDown from '@/components/icons/chevronDown.vue';
import { CryptoCurrency } from '@/store/modules/cryptoCurrencies/types';
import { cryptoCurrenciesModule } from '@/store/modules/cryptoCurrencies/store';

import { useStore } from 'vuex';
import mainLayout from '@/layouts/mainLayout.vue';

export default defineComponent({
  name: 'crypto-currencies',
  data() {
    return {
      cryptoContext: cryptoCurrenciesModule.context(useStore()),
      currencies: [] as CryptoCurrency[],
      enabled: true
    }
  },
  computed: {
    isDataLoading(): boolean {
      return this.cryptoContext.getters.getState;
    }
  },
  methods: {
    round(price: number, fractionDigits = 3) {
      return price.toFixed(fractionDigits);
    },
    getPriceChangeColor(cur: CryptoCurrency) {
      return +cur.ytd.price_change > 0 ? 'text-green-500' : 'text-red-500'
    }
  },
  async mounted() {
    await this.cryptoContext.actions.fetchAllCurrencies()
    this.currencies = this.cryptoContext.getters.getData;

  },
  components: {
    mainLayout, chevronUp, chevronDown,  
  }
})
</script>
<style>

</style>