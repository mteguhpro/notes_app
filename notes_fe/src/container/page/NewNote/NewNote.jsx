import React, { useState, useRef } from 'react'
import BackButton from '../../../component/BackButton'
import { useCreateNotesMutation, useAllCategoriesQuery } from '../../../services/notes';
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { addSuccess } from '../../../features/alert/alertSlice'
import ErrorFetch from '../../../component/ErrorFetch';

function NewNote() {

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [body, setBody] = useState("");
    const picture = useRef();
    
    const [postNote, { isLoading, error }] = useCreateNotesMutation()
    const { data:dataCategory, error:errorCategory, isLoading:isLoadingCategory } = useAllCategoriesQuery()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const post = await postNote({ 
            title, 
            picture : picture.current?.files[0],
            body,
            category_id : category,
        })
        if(! post.error){
            dispatch(addSuccess('Berhasil Membuat Catatan Baru'))
            navigate('/')
        }
        // console.log(post)
    }

    return (
        <div>
            <h1 className="text-3xl">Create New Note</h1>

            <div className='mt-4'>
                <BackButton/>
            </div>

            <form className='mt-4' onSubmit={handleSubmit}>
                {
                    error && <ErrorFetch message={error?.data?.message} />
                }
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Title:</span>
                    </label>
                    <input required type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Title here" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Picture:</span>
                    </label>
                    <input type="file" ref={picture} placeholder="Picture here" className="input input-bordered w-full" />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Category:</span>
                    </label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="select select-bordered w-full">
                        <option value="">{isLoadingCategory ? 'Loading..' : 'Pilih..'}</option>
                        {dataCategory ? dataCategory.data.map((d) =>{
                            return (<option key={d.id} value={d.id}>{d.name}</option>)
                        }) : ''}
                    </select>
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Body:</span>
                    </label>
                    <textarea required onChange={ e => setBody(e.target.value) } value={body} className="textarea textarea-bordered h-24" placeholder="Body"></textarea>
                </div>

                <div className="form-control w-full">
                    {
                        isLoading ? 'Loading..' : <button className="btn btn-sm my-3">Save</button> 
                    }
                </div>

            </form>
        </div>
    )
}

export default NewNote