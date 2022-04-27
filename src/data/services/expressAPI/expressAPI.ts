import { AxiosClient } from "../axios";

const axCl = new AxiosClient('http://localhost:8000/api');

export const getOffers = () => {
  return axCl.get<any>('/offers');
}