import React from "react"
import { Link } from "react-router-dom"
import { logout } from "../../features/logout/logut";

function Navbar(){
    return (
        <div className="navbar bg-neutral text-primary-content">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">MyNotes</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><Link to="/">Notes</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar