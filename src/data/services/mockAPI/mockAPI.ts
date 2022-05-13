import { data } from "autoprefixer";
import axios from "axios";
import { AxiosClient } from "../axios";

const axiosClient = new AxiosClient('https://61fc82df3f1e34001792c8cf.mockapi.io');

const requestInterceptor = axiosClient.client.interceptors.request.use((config) => {
  config.headers = {
    'Accept': 'application/json',
    'Accept-Language': 'en-US'
  }
  return config;
});

const responseInterceptor = axiosClient.client.interceptors.response.use((config) => {
  if(config.status === 403) {
    alert("You're not allowed, please log in");
  }

  alert(`Status code: ${config.status}`)

  return config;
})

 

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
  axiosClient.client.interceptors.request.eject(requestInterceptor);
  axiosClient.client.interceptors.response.eject(responseInterceptor);
  return axiosClient.delete(`/offers/${offer.id}`);
}

export const createMockOffer = (offer: Omit<MockOffer, 'id'>) => {
  return axiosClient.post(`/offers/`, offer);
}
