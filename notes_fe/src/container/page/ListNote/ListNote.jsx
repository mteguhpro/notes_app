import React, { useState } from "react"
import { useAllNotesQuery } from '../../../services/notes'
import { Link, useNavigate } from "react-router-dom"
import {useSelector } from "react-redux"
import Alert from "../../../component/Alert"
import TableInstant from "../../../component/TableInstant"
import ErrorFetch from "../../../component/ErrorFetch"
import LoadingFetch from "../../../component/LoadingFetch"


function ListNote(){
    const alertSuccess = useSelector((state) => state.alert.success)

    return (
        <div>
          <h3 className="text-5xl my-4">All Notes</h3>

          <Alert success={ alertSuccess }/>

          <Link to="new" className="btn gap-2 btn-sm my-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
          </svg>
            New Note
          </Link>

          <br/>
          <ChildList/>

          <div className="mb-7"></div>
        </div>
    )
}

function ChildList(){

  const navigate = useNavigate()

  // We'll start our table without any data  
  const [pageSize, setPageSize] = useState(5)
  const [pageIndex, setPageIndex] = useState(1)
  
  const columns = React.useMemo(
    () => [
    {
      Header: 'Title',
      accessor: 'title', // accessor is the "key" in the data
    },
    {
      Header: 'Category',
      accessor: 'category',
    },
    {
      Header: 'Author',
      accessor: 'author',
    },
    {
      Header: '*',
      accessor: 'action',
    },
  ], [])
  
  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
      setPageSize(pageSize)
      setPageIndex(pageIndex + 1)
      console.log({pageSize, pageIndex})
  }, [])

  const { data, error, isLoading, isFetching } = useAllNotesQuery({perPage : pageSize, page : pageIndex})

  if(isLoading){
    return <LoadingFetch/>
  }else if(error){
    return <ErrorFetch message={error} />
  }
  else if(data){
    const dataList = data.data.map(function(d){
      return ({
        title : d.title,
        category : d.category?.name,
        author : d.user?.name,
        action : <button onClick={() => navigate('/detailnote/'+d.id)} className="btn btn-sm">Show</button>
      })
    })

    return <TableInstant
    columns={columns}
    data={dataList}
    fetchData={fetchData}
    loading={isFetching}
    pageCount={Math.ceil(data.total / pageSize)}
    pageSize = {pageSize}
    totalData = {data.total}
  />
  }

}

export default ListNote