export interface CryptoCurrency {
  currency: string,
  logo_url: string,
  name: string,
  price_date: string,
  price: string,
  market_cap: string,
  id: string,
  ytd: {
    price_change: string,
    price_change_pct: string,
    volume: string,
    volume_change: string
  }
}

export interface CryptoCurrenciesModel {
  data: CryptoCurrency[]
  chartData: CryptoCurrencyCoinAPI[]
  isLoading: boolean 
}

export interface CryptoCurrencyCoinAPI {
  symbol_id: string,
  time_exchange: string,
  time_coinapi: string,
  uuid: string,
  price: string,
  size: string,
  taker_side: string
}

export type FindCryptoPayload = Pick<CryptoCurrencyCoinAPI, 'symbol_id'> & {
  curFrom: string,
  curTo: string,
  limit: string
}