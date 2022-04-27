import { data } from "autoprefixer";
import { AxiosClient } from "../axios";

const axiosClient = new AxiosClient('https://61fc82df3f1e34001792c8cf.mockapi.io');

export interface MockOffer {
  title: string,
  description: string,
  cost: string,
  currency: string,
  email: string,
  username: string,
  avatar: string,
  id: string
}

export const getMockOffers = (): Promise<MockOffer[]> => {
  return axiosClient.get<MockOffer[]>('/offers');
}

export const updateMockOffer = (offer: MockOffer) => {
  return axiosClient.put(`/offers/${offer.id}`, offer);
}

export const deleteMockOffer = (offer: MockOffer) => {
  return axiosClient.delete(`/offers/${offer.id}`);
}

export const createMockOffer = (offer: Omit<MockOffer, 'id'>) => {
  return axiosClient.post(`/offers/`, offer);
}
