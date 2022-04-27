import { AxiosClient } from "../axios";

const KEY = 'TXxovDoEZGoRwmXPYulMpEVekzUUX8hk';

const axiosClient = new AxiosClient('https://api.coincap.io')

export const fetchGroupedDaily = async (): Promise<any[]> => {
  return await axiosClient.get('v2/assets');
}