import { AxiosClient } from "../axios";

const axiosClient = new AxiosClient('https://www.cbr-xml-daily.ru');

export const fetchPreviousCurrenciesData = async (): Promise<PreviousCurrenciesDataModel> => {
  return await axiosClient.get<PreviousCurrenciesDataModel>('/daily_json.js')
}

export const fetchTodayCurrenciesData = async (): Promise<TodayCurrenciesDataModel> => {
  return await axiosClient.get<TodayCurrenciesDataModel>('/latest.js')
}

interface PreviousCurrenciesDataModel {
  Date: string,
  PreviousDate: string,
  PreviousURL: string,
  Timestamp: string,
  Valute: PreviousValuteModel
}

interface PreviousValuteModel {
  [name: string]: {
    ID: string,
    numCode: string,
    CharCode: string,
    Nominal: number,
    Name: string,
    Previous: number,
    Value: number
  }
}

interface TodayCurrenciesDataModel {
  disclaimer: string,
  date: string,
  timestamp: number,
  base: string,
  rates: TodayRateModel
}

interface TodayRateModel {
  [name: string]: number
}