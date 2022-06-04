import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    warning : '',
    error : '',
    success : '',
}

export const alertSlice = createSlice({
    name: 'alert',
    initialState : initialState,
    reducers:{
        addWarning: (state, param) => {
            state.warning = param.payload
        },
        addError: (state, param) => {
            state.error = param.payload
        },
        addSuccess: (state, param) => {
            state.success = param.payload
        },
        reset: () => initialState
    }
})

export const { reset, addWarning, addError, addSuccess } = alertSlice.actions
export default alertSlice.reducer