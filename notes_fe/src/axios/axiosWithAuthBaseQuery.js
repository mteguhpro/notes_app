import axios from 'axios'

const instanceAxios = axios.create();

// Add a request interceptor
instanceAxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(window.localStorage.getItem("jwtToken")){
    config.headers.Authorization = 'Bearer '+window.localStorage.getItem("jwtToken");
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instanceAxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  if (error.response.status === 401) {
    window.localStorage.removeItem("jwtToken");
    window.location.href = '/login' //BELUM MENEMUKAN ALTERNATIF SELAIN window.location. 
  }
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


/**
 * axiosWithAuthBaseQuery digunakan sebagai alternatif dari:
 * import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
 * referensi => https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#axios-basequery
 */
const axiosWithAuthBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params, headers }) => {
      try {
        const result = await instanceAxios({ url: baseUrl + url, method, data, params, headers })
        return { data: result.data }
      } catch (axiosError) {
        let err = axiosError
        return {
          error: {
            status: err.response?.status,
            data: err.response?.data || err.message,
          },
        }
      }
    }

export default axiosWithAuthBaseQuery