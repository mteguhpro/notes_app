import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import alertReducer from '../features/alert/alertSlice'

import { notesApi } from '../services/notes'
import { authApi } from '../services/auth'


export const store = configureStore({
    reducer: {
        alert : alertReducer,
        [notesApi.reducerPath] : notesApi.reducer,
        [authApi.reducerPath] : authApi.reducer,
    },
    middleware : (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(notesApi.middleware),
})

setupListeners(store.dispatch)