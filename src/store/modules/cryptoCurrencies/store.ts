import { Actions, createMapper, Getters, Module, Mutations } from "vuex-smart-module";
import { CryptoCurrenciesModel, CryptoCurrencyCoinAPI, CryptoCurrency, FindCryptoPayload } from "./types";
import bitcoinHistoryData from '@/data/bitcoinHistoryData.json';
import { fetchCurrencyCoinAPI } from "@/data/services/coinAPI/coinAPI";
import { fetchAllCurrenciesNomicsAPI } from "@/data/services/nomicsAPI/nomicsAPI";



class CryptoCurrenciesState implements CryptoCurrenciesModel {
  data: CryptoCurrency[] = [];
  chartData: CryptoCurrencyCoinAPI[] = [];
  isLoading = false;
}

export class CryptoCurrenciesGetters extends Getters<CryptoCurrenciesState> {
  get getData(): CryptoCurrency[] {
    return this.state.data;
  }

  get getState(): boolean {
    return this.state.isLoading;
  }

  get getChartData(): CryptoCurrencyCoinAPI[] {
    return this.state.chartData;
  }
}

class CryptoCurrenciesActions extends Actions<CryptoCurrenciesState, CryptoCurrenciesGetters, CryptoCurrenciesMutations> {
  async fetchCurrency(payload: FindCryptoPayload) {
    const data = await fetchCurrencyCoinAPI(payload);

    this.commit('setChartData', data);
    
  }
  
  async fetchAllCurrencies() {
    this.state.isLoading = true;
      
    const data = await fetchAllCurrenciesNomicsAPI();

    this.state.isLoading = false;

    this.commit('setData', data);
  }
}



class CryptoCurrenciesMutations extends Mutations<CryptoCurrenciesState> {
  setData(data: CryptoCurrency[]): void {
    this.state.data = data;
  }
  setChartData(data: CryptoCurrencyCoinAPI[]): void {
    this.state.chartData = data;
  }
}

const cryptoCurrenciesModule = new Module({
  state: CryptoCurrenciesState,
  getters: CryptoCurrenciesGetters,
  actions: CryptoCurrenciesActions,
  mutations: CryptoCurrenciesMutations
})

// const cryptoCurrenciesMapper = createMapper(cryptoCurrenciesModule);

export {
  cryptoCurrenciesModule,
  // cryptoCurrenciesMapper
}
