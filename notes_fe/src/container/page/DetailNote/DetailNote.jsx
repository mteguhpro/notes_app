import React, {useState} from "react";
import { useDetailNotesQuery, useDeleteNotesMutation } from '../../../services/notes';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../component/BackButton'
import ModalWithCancel from "../../../component/ModalWithCancel";
import LoadingFetch from "../../../component/LoadingFetch";
import ErrorFetch from "../../../component/ErrorFetch";
import { useDispatch } from "react-redux";
import { addSuccess } from '../../../features/alert/alertSlice';

function DetailNote(){
    const navigate = useNavigate()
    const { id } = useParams();
    const dispatch = useDispatch()
    const [toggleHapus, setToggleHapus] = useState(false)

    const { data, error, isLoading } = useDetailNotesQuery(id)
    const [deleteNote, { isLoading:isLoadingDelete, error:errorDelete }] = useDeleteNotesMutation()
    
    const handlePopupHapus = () => {
      setToggleHapus(!toggleHapus)
    }

    const handleSubmitDelete = async (e) => {
      e.preventDefault();
      const del = await deleteNote(id)
      if(! del.error){
          dispatch(addSuccess(del?.data?.message))
          navigate('/')
      }
    }

    return (
        <div>
          <div className="my-2 py-2">
            <BackButton/>
          </div>
          {error ? (
            <>{error.originalStatus +' - '+ error.error}</>
          ) : isLoading ? (
            <LoadingFetch/>
          ) : data ? (
                <>
                  <div>
                    <button onClick={() => navigate('/editnote/'+data.data.id)} className="btn btn-sm mx-2 my-0">Edit</button>
                    <button onClick={ ()=>handlePopupHapus() } className="btn btn-sm mx-2 my-0">Hapus</button>
                    <ModalWithCancel 
                      show={toggleHapus}
                      handleClose = {handlePopupHapus} 
                      modalContent={
                        <>
                          { errorDelete && <ErrorFetch message={errorDelete?.data?.message}/> } 
                          <h3>Hapus Note <b>{data?.data?.title}</b>?</h3>
                        </>
                      }
                      modalAction={
                        <>
                          {isLoadingDelete ? <LoadingFetch/> : 
                            <button onClick={ handleSubmitDelete } className="btn btn-error text-white btn-sm mx-2 my-0">Hapus</button>
                          }
                          <button onClick={ ()=>handlePopupHapus() } className="btn btn-sm mx-2 my-0">Cancel</button>
                        </>
                      }
                    />
                  </div>
                  <h1 className="font-medium leading-tight text-5xl mt-0 mb-2">{data?.data?.title}</h1>
                  <b>{data?.data?.user?.name}</b> {' - '} {data?.data?.category?.name}
                  <div>
                    {data?.data?.picture && <img className="w-4/5 mx-auto" alt='picture' src={data?.data?.picture}/>}
                  </div>
                  <p>{data?.data?.body}</p>
                </>
          ) : null}
        </div>
    )
}


export default DetailNote