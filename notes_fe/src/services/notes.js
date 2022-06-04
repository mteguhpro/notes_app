import { createApi } from '@reduxjs/toolkit/query/react'
import axiosWithAuthBaseQuery from '../axios/axiosWithAuthBaseQuery'

// Define a service using a base URL and expected endpoints
export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: axiosWithAuthBaseQuery({ baseUrl: 'http://localhost:8000/api/' }),
  keepUnusedDataFor: 2, 
  endpoints: (builder) => ({
    allNotes: builder.query({
      query: ({perPage = 20, page = 1}) => ({
        url : 'notes/', 
        params : {perPage, page}
      })
    }),
    detailNotes: builder.query({
      query: (id) => ({ url: 'notes/' + id, method: 'get' }),
    }),
    createNotes: builder.mutation({
      query: (data) => ({ url: 'notes', method: 'post', data:data }),
    }),
    putNotes: builder.mutation({
      query: ({id, data}) => ({ url: 'notes/' + id, method: 'post', data:data }),
    }),
    deleteNotes: builder.mutation({
      query: (id) => ({ url: 'notes/' + id, method: 'delete'}),
    }),
    allCategories: builder.query({
      query: () => ({
        url : 'categories/', 
      })
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useAllNotesQuery, 
  useDetailNotesQuery, 
  useCreateNotesMutation, 
  usePutNotesMutation, 
  useDeleteNotesMutation, 
  useAllCategoriesQuery, 
} = notesApi