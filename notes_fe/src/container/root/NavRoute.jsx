import React from 'react';
import {
    Routes,
    Route
} from "react-router-dom";
import Navbar from './Navbar';

function NavRoute() {
    return (
            <Routes>
                <Route path="/login"/>
                <Route path="/*" element={<Navbar/>} />
            </Routes>
    )
}

export default NavRoute;