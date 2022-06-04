import { createApi } from '@reduxjs/toolkit/query/react'
import axiosBaseQuery from '../axios/axiosBaseQuery'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  keepUnusedDataFor: 2, 
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({ url: 'login', method: 'post', data:data }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useLoginMutation, 
} = authApi