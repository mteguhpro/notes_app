import axios from 'axios'

/**
 * axiosBaseQuery digunakan sebagai alternatif dari:
 * import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
 * referensi => https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#axios-basequery
 */

const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
    async ({ url, method, data, params }) => {
      try {
        const result = await axios({ url: baseUrl + url, method, data, params })
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

export default axiosBaseQuery