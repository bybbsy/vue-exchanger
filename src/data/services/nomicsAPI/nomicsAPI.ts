import { CryptoCurrency } from "@/store/modules/cryptoCurrencies/types";
import { AxiosClient } from "../axios";

const axiosClient = new AxiosClient('https://api.nomics.com');

const KEY = '9265a68bcac273cf5dedaf69b2f14e3a4722229b';

export const fetchAllCurrenciesNomicsAPI = async (): Promise<CryptoCurrency[]> => {
  const data = await axiosClient.get<CryptoCurrency[]>(`/v1/currencies/ticker?key=${KEY}`);

  return data;
}