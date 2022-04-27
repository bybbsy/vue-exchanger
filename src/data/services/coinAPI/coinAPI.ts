import { CryptoCurrencyCoinAPI, FindCryptoPayload } from "@/store/modules/cryptoCurrencies/types";
import { AxiosClient } from "../axios";


const axiosClient = new AxiosClient('https://rest.coinapi.io');

const KEY_1 = 'CFFE1735-ACA2-4224-AD5D-6D32E51410A5'
const KEY_2 = '0AFBC54A-4F1C-46C0-90EF-746FB0F772D4'
const options = {
  hostname: "rest.coinapi.io",
  headers: { 'X-CoinAPI-Key': KEY_2 },
  onUploadProgress: (progressEvent: ProgressEvent) => console.log(progressEvent.loaded)
}

export const fetchCurrencyCoinAPI = async (
  payload: FindCryptoPayload
  ): Promise<CryptoCurrencyCoinAPI[]> => {
    const data = await axiosClient.get<CryptoCurrencyCoinAPI[]>(
      `/v1/trades/${payload.symbol_id}/history?time_start=${payload.curFrom}&time_end=${payload.curTo}&limit=${payload.limit}`,
      options
      );

    return data;
}