import React, { Suspense } from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import LoadingFetch from '../../component/LoadingFetch';

const Login = React.lazy( () => import('../page/Login/Login'))

const ListNote = React.lazy( () => import('../page/ListNote/ListNote'))
const DetailNote = React.lazy( () => import('../page/DetailNote/DetailNote'))
const NewNote = React.lazy( () => import('../page/NewNote/NewNote'))
const EditNote = React.lazy( () => import('../page/EditNote/EditNote'))

function ContentRoute() {
    return (
            <div className="px-6">
                <Suspense fallback={<LoadingFetch/>} >
                    <Routes>
                        <Route path="/" element={<ListNote/>} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/new" element={<NewNote/>} />
                        <Route path="/detailnote/:id" element={<DetailNote/>} />
                        <Route path="/editnote/:id" element={<EditNote/>} />
                    </Routes>
                </Suspense>
            </div>
    )
}

export default ContentRoute;