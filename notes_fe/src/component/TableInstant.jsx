import React, { useEffect } from 'react'
import { useTable, usePagination } from 'react-table'
import LoadingFetch from './LoadingFetch'

// table serverside pagination
// referensi: https://github.com/TanStack/react-table/blob/v7/examples/pagination-controlled/src/App.js




// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function TableInstant({
    columns,
    data,
    fetchData,
    loading,
    pageCount: controlledPageCount,
    pageSize: controlledPageSize,
    totalData,
}) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        // Get the state from the instance
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0, pageSize : controlledPageSize }, // Pass our hoisted table state
            manualPagination: true, // Tell the usePagination
            // hook that we'll handle our own data fetching
            // This means we'll also have to provide our own
            // pageCount.
            pageCount: controlledPageCount,
        },
        usePagination
    )

    // Listen for changes in pagination and use the state to fetch our new data
    useEffect(() => {
        fetchData({ pageIndex, pageSize })
    }, [fetchData, pageIndex, pageSize])

    // Render the UI for your table
    return (
        <>
            {/* <pre>
                <code>
                    {JSON.stringify(
                        {
                            pageIndex,
                            pageSize,
                            pageCount,
                            canNextPage,
                            canPreviousPage,
                        },
                        null,
                        2
                    )}
                </code>
            </pre> */}
            <div className='overflow-x-auto'>
                <div className='ml-4'>
                    { loading ? <LoadingFetch /> : 
                        <>Showing {page.length} of {totalData}{' '} results</>
                    }
                </div>
                <table {...getTableProps()} className="table w-full">
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' _za'
                                                    : ' _az'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map(row => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()} className="hover">
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps()} >
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                        <tr>
                            {loading ? (
                                // Use our custom loading state to show a loading indicator
                                <td colSpan="10000"><LoadingFetch/></td>
                            ) : (
                                <td colSpan="10000">
                                    Showing {page.length} of {totalData}{' '}
                                    results
                                </td>
                            )}
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
            <div className="pagination">
                <button className='btn btn-sm' onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button className='btn btn-sm' onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button className='btn btn-sm' onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button className='btn btn-sm' onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                        className='input input-bordered input-sm '
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                    className='select select-bordered select-sm'
                >
                    {[5, 10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default TableInstant