import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addSuccess } from '../../../features/alert/alertSlice'
import { useLoginMutation } from '../../../services/auth'
import ErrorFetch from '../../../component/ErrorFetch'
import jwt_decode from "jwt-decode"

function Login() {
    if(window.localStorage.getItem("jwtToken")){
        window.location.href = '/' //BELUM MENEMUKAN ALTERNATIF SELAIN window.location. 
    }
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [postLogin, { isLoading, error }] = useLoginMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = await postLogin({ 
            email, 
            password,
        })
        if(post?.data?.token){
            window.localStorage.setItem("jwtToken", post?.data?.token)
            const decoded = jwt_decode(window.localStorage.getItem("jwtToken"))
            dispatch(addSuccess('Selamat Datang, '+decoded.name))
            navigate('/')
        }else{
            console.log(post)
        }
    }
    return (
        <>
            <h1 className='text-4xl font-bold'>Login</h1>
            <form className='mt-4' onSubmit={handleSubmit}>
                {
                    error && <ErrorFetch message={error?.data?.message} />
                }
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Email:</span>
                    </label>
                    <input required type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Password:</span>
                    </label>
                    <input required type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" className="input input-bordered w-full" />
                </div>

                <div className="form-control w-full">
                    {
                        isLoading ? 'Loading..' : <button className="btn btn-sm my-3">Login</button>
                    }
                </div>

            </form>
        </>
    )
}

export default Login