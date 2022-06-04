import React from 'react'
import { useEffect } from 'react'
import {useDispatch } from "react-redux"
import { reset } from '../features/alert/alertSlice'


function Alert({success}) {
    if(!success){
        return null
    }
    const dispatch = useDispatch()
    useEffect(() => {
        return () => dispatch(reset())
    },[])
    
    return (
        <div className="alert alert-success shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current flex-shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>{success}</span>
            </div>
        </div>
    )
}

export default Alert