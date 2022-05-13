import axios, { AxiosInstance, AxiosInterceptorManager, AxiosRequestConfig } from "axios";
import { MockOffer } from "./mockAPI/mockAPI";




export class AxiosClient {
  client: AxiosInstance

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl
    })
  }


  async get<T>(url: string, params?: AxiosRequestConfig): Promise<T> {
    /* eslint-disable no-useless-catch*/
    try {  

      const res = await this.client.get(url, params);

      console.log('Status', res.status, 'URL: ', url)
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async put<T>(url: string, data?: MockOffer, params?: AxiosRequestConfig): Promise<T> {
    /* eslint-disable no-useless-catch*/
    try {
      const res = await this.client.put(url, data, params);
      return res.data;
    } catch (e) {
      throw e;
    }   
  }

  async delete<T>(url: string, params?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await this.client.delete(url, params);
      return res.data;
    } catch (e) {
      throw e;
    }
  }

  async post<T>(url: string, data?: Omit<MockOffer, 'id'> , params?: AxiosRequestConfig): Promise<T> {
    try {
      const res = await this.client.post(url, data, params);
      return res.data;
    } catch (e) {
      throw e;
    }
  }
}