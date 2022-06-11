import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDetailNotesQuery, useAllCategoriesQuery, usePutNotesMutation } from '../../../services/notes';
import BackButton from '../../../component/BackButton'
import ErrorFetch from "../../../component/ErrorFetch";
import LoadingFetch from "../../../component/LoadingFetch";
import { addSuccess } from '../../../features/alert/alertSlice';

function EditNote() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState();
  const [category, setCategory] = useState("");
  const [body, setBody] = useState();
  
  const { data, error, isLoading } = useDetailNotesQuery(id)
  const [putNote, { isLoading:isLoadingPut, error:errorPut }] = usePutNotesMutation()
  const { data:dataCategory, error:errorCategory, isLoading:isLoadingCategory } = useAllCategoriesQuery()

  
  useEffect(()=>{
    if(!isLoading){
      setTitle(data?.data?.title)
      setCategory(data?.data?.category?.id)
      setBody(data?.data?.body)
    }
  }, [useDetailNotesQuery, data, isLoading])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({title, slug, body})
    const post = await putNote({ 
        id,
        data: {
          _method: 'PUT',
          title, 
          body,
          category_id : category,
        }
    })
    if(! post.error){
        dispatch(addSuccess('Berhasil Edit Catatan'))
        navigate('/')
    }
  }

  return (
    <div>
      <div className="my-2 py-2">
        <BackButton />
      </div>
      <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">Edit</h1>
      {error ? (
        <>{<ErrorFetch message={error} />}</>
      ) : isLoading ? (
        <LoadingFetch />
      ) : data ? (
        <>
          <form className='mt-4' onSubmit={handleSubmit}>
            {
              errorPut && <ErrorFetch message={errorPut?.data?.message}/>
            }
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Title:</span>
              </label>
              <input required type="text" value={title || ''} onChange={(e) => { setTitle(e.target.value) }} placeholder="Title here" className="input input-bordered w-full" />
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
              <textarea required onChange={e => setBody(e.target.value)} value={body || ''} className="textarea textarea-bordered h-24" placeholder="Body"></textarea>
            </div>

            <div className="form-control w-full">
              {
                isLoadingPut ? <LoadingFetch/> : <button className="btn btn-sm my-3">Update</button>
              }
            </div>

          </form>
        </>
      ) : null}
    </div>
  )
}

export default EditNote