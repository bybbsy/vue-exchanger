<template>
  <transition name="infobar">
    <div class="infobar">
      <ul class="currencies-list">
        <li class="currency-block">
          <div class="currency-symbol">USD</div>
          <div class="currency-field currency-field_now">
            <span class="currency-value">{{ USD.today }}</span>
            <chevron-down class="w-4 h-4 text-red-500" v-if="EUR.diff < 0"></chevron-down>
            <chevron-up class="w-4 h-4 text-green-500" v-else></chevron-up>
          </div>
        </li>
        <li class="currency-block">
          <div class="currency-symbol">EUR</div>
          <div class="currency-field currency-field_now">
            <span class="currency-value">{{ EUR.today }}</span>
            <chevron-down class="w-4 h-4 text-red-500" v-if="EUR.diff < 0"></chevron-down>
            <chevron-up class="w-4 h-4 text-green-500" v-else></chevron-up>
          </div>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import chevronUp from '@/components/icons/chevronUp.vue';
import chevronDown from '@/components/icons/chevronDown.vue';
import { fetchPreviousCurrenciesData, fetchTodayCurrenciesData } from '@/data/services/cbrAPI/cbrAPI';

export default defineComponent({
  name: 'the-infobar',
  components: {
    chevronUp,
    chevronDown
  },
 setup() {
    let USD = reactive({
      today: 0,
      diff: 0
    });

    let EUR = reactive({
      today: 0,
      diff: 0
    });

    let setCurrencies = async (USD: { today: number; diff: number; }, EUR: { today: number; diff: number; }) => {
      const prevData = await fetchPreviousCurrenciesData();
      const currData = await fetchTodayCurrenciesData();

      USD.today = +(1 / currData.rates['USD']).toFixed(2);
      USD.diff = prevData.Valute['USD'].Previous - (1 / currData.rates['USD']);
      
      USD.today++;

      EUR.today = +(1 / currData.rates['EUR']).toFixed(2);
      EUR.diff = prevData.Valute['EUR'].Previous - (1 / currData.rates['EUR']);
    }
    
    onMounted(async () => setCurrencies(USD, EUR))

    return {
      USD, EUR
    }
  }
})
</script>

<style>
.infobar {
  margin: 5px 0 -15px;
}

.currencies-list {
  justify-content: center;
  display: flex;
  font-size: 0.9em;
  column-gap: 10px;
}

.currency-block {
  display: flex;
  column-gap: 5x;
  align-items: center;
}

.currency-symbol {
  font-size: 1.1em;
  font-weight: 600;
  margin-right: 5px;
}

.currency-value {
  display: flex;
}

.currency-field {
  display: flex;
  font-size: 1em;
  align-items: center;
  font-weight: 500;
}

.infobar-enter-active,
.infobar-leave-active {
  transition: opacity 0.5s ease;
}

.infobar-enter-from,
.infobar-leave-to {
  opacity: 0;
}
</style>