<template>
  <main-layout>
    <div class="detail__wrapper">
      <div class="">
        <div class="chart-wrapper flex">
          <div class="chart-view">
            <canvas ref="mainChart" class="main-chart"></canvas>
          </div>
          <div class="chart-controls px-5">
            <div class="controls-field">
              <div class="field-input">
                <input type="text" v-model="curId" class="appearance-none rounded-none  flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Currency id" id="currencyId">
              </div>

              <div class="field-group flex my-5 gap-2">
                <div class="field-input flex items-baseline">
                  <label for="dateFrom" class="text-left block text-sm font-medium text-gray-700 mr-1">From</label>
                  <input type="datetime-local" v-model="curFrom" class="appearance-none rounded-none flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" id="dateFrom">
                </div>
                <div class="field-input flex items-baseline">
                  <label for="dateTo" class="block text-left mr-1">To</label>
                  <input type="datetime-local" v-model="curTo" id="dateTo" class="appearance-none rounded-none  flex w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
                </div>
              </div>

              <div class="field-input">
                <range-slider v-model:curLimit="curLimit"></range-slider>
              </div>
              <div class="field-button flex">
                <button @click="findData" type="button" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                  </span>
                  Find
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  </main-layout>
</template>

<style scoped>
  .main-chart {
    width: 500px;
    height: 500px;
  }
</style>

<script lang="ts">
import { defineComponent, ref, shallowRef } from 'vue'

import Chart, { ChartType, TooltipItem, TooltipLabelStyle, TooltipModel } from 'chart.js/auto';

import { cryptoCurrenciesModule } from '@/store/modules/cryptoCurrencies/store';
import { useStore } from 'vuex';
import { format } from 'date-fns';
import { CryptoCurrencyCoinAPI, FindCryptoPayload } from '@/store/modules/cryptoCurrencies/types';
import RangeSlider from '@/components/RangeSlider.vue';
import { formatDateForChart } from '@/utils/formatters/dateFormatter';
import { fetchGroupedDaily } from '@/data/services/polygonAPI/polygonAPI';

import coinData from '@/data/coinPriceChange.json';
import mainLayout from '@/layouts/mainLayout.vue';

interface Data {
  canvas: HTMLCanvasElement,
  chart: any,
  chartData: any,
  curLimit: number,
  curId: string,
  curFrom: string,
  curTo: string
  cryptoContext: any
}

interface ChartDataModel {
  x: string,
  y: number | string,
  taker: string
}

export default defineComponent({
  name: 'detail-info',
  data(): Data {
    return {
      canvas: this.$refs.mainChart as HTMLCanvasElement,
      chart: {} as any,
      chartData: {} as any,
      curLimit: 100,
      curId: 'BITSTAMP_SPOT_BTC_USD',
      curFrom: '2016-01-01T00:00:00Z',
      curTo: '2017-01-01T00:00:00Z',
      cryptoContext: cryptoCurrenciesModule.context(useStore()),
    }
  },
  computed: {
    getChartData(): CryptoCurrencyCoinAPI[] {
      return this.cryptoContext.getters.getChartData;
    }
  },
  methods: {
    async findData() {
      const payload: FindCryptoPayload  = {
        symbol_id: this.curId,
        curFrom: format(new Date(this.curFrom), "yyyy-MM-dd'T'HH:mm:ss"),
        curTo: format(new Date(this.curTo), "yyyy-MM-dd'T'HH:mm:ss"),
        limit: this.curLimit.toString()
      } 

      await this.cryptoContext.actions.fetchCurrency(payload);

      // const ctx = this.$refs.mainChart as HTMLCanvasElement;

      // console.log(this.cryptoContext.getters.getChartData)

      this.chart.data.datasets.pop();
      this.chart.data.datasets.push({
        label: `${this.curId} price change`,
        borderColor: 'red',
        backgroundColor: '#bad4fc',
        data: this.getData(this.cryptoContext.getters.getChartData),
        fill: true
      });
      
      this.chart.update();

      // const chart = new Chart(ctx, {
      //   type: 'line',
      //   data: {
      //     datasets: [{
      //       label: 'Bitcoin price change',
      //       data: this.chartData,
      //       cubicInterpolationMode: 'monotone',
      //       borderColor: '#9dc1fb'
      //     },
      //     ]
      //   }
      // })


    },
    getData(raw: CryptoCurrencyCoinAPI[]): ChartDataModel[] {
      console.log('raw:', raw)
      return raw.map(el => { 
        return { x: formatDateForChart(el.time_exchange), y: el.price, taker: el.taker_side }
      })
    },
    // getSizeChange(raw: any[]): any[] {
    //   return raw.map(el => {
    //     return { x: format(new Date(el.time_exchange), 'hh:mm:ss/MMMM:yyyy'), y: el.size * 1000 }
    //   })
    // }
  },
  async mounted() {
    const ctx = (this.$refs.mainChart as HTMLCanvasElement);
    type CT = keyof ChartType;

    this.chart = shallowRef(new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: '',
          data: [],
          cubicInterpolationMode: 'monotone',
          borderColor: '#9680cf',
          backgroundColor: 'rgba(216, 230, 253, 0.6)',
          fill: true,
          tension: 0,
          pointBorderWidth: 0.5,
          pointRadius: 2,
          pointBackgroundColor: 'rgb(59 130 246 / 0.5)',
          borderWidth: 1.2
        }]
      },
      options: {
        plugins: {
          tooltip: {
            usePointStyle: true,
            callbacks: {
              beforeFooter: (items: TooltipItem<'line'>[] ): string => {
                return 'Hola';
              },
              footer: (items: TooltipItem<'line'>[] ): string  => {
                let sum = 'Taker: ';

                items.forEach(item => {
                  console.log(item)
                  sum += (item.dataset.data[item.dataIndex] as unknown as ChartDataModel).taker;
                })

                return sum;
              }
            }
          },
        }
      }
    }))

    const payload: FindCryptoPayload  = {
        symbol_id: this.curId,
        curFrom: format(new Date(this.curFrom), "yyyy-MM-dd'T'HH:mm:ss"),
        curTo: format(new Date(this.curTo), "yyyy-MM-dd'T'HH:mm:ss"),
        limit: this.curLimit.toString()
      }


    // await this.cryptoContext.actions.fetchCurrency(payload);
    
    // const currencies = this.cryptoContext.getters.getChartData;

    // this.chartData = this.getData(currencies);
    this.chartData = coinData;
    // const sizeHistory = this.getSizeChange(currencies);
    console.log(this.chartData)
    this.chart.data.datasets.pop();
    this.chart.data.datasets.push({
        label: `${this.curId} price change`,
        data: this.chartData,
        cubicInterpolationMode: 'monotone',
        borderColor: '#9680cf',
        backgroundColor: 'rgba(216, 230, 253, 0.6)',
        fill: true,
        tension: 0,
        pointBorderWidth: 0.5,
        pointRadius: 2,
        pointBackgroundColor: 'rgb(59 130 246 / 0.5)',
        borderWidth: 1.2
    })

    this.chart.update();

    const a = await fetchGroupedDaily();
    console.log(a)
  },
  components: {
    RangeSlider, mainLayout
  }
})
</script>

<style scoped>
.main-chart {
  display: flex;
  min-width: 876px;
}

.chart-wrapper {
  width: 1400px;
  margin: 0 auto;
  /* background-color: #111; */
  /* padding: 0 15px; */
}

@media screen and (max-width: 1520px) {
  .main-chart {
    display: flex;
    min-width: 676px;
  }
  .chart-wrapper {
    width: 1200px;
  }
}

@media screen and (max-width: 1250px) {

  .chart-wrapper {
    width: 1200px;
    flex-direction: column;
  }
}
</style>
