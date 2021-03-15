import React from 'react'
import {Link} from 'react-router-dom'

const Nav = ({setIsLogin}) => {

    const onLogout = () => {
        localStorage.clear()
        setIsLogin(false)
    }

    return (
        <header>
            <div className="logo">
                <h1><Link to="/">Ishan Notes</Link></h1>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/create">Create</Link></li>
                <li><Link to="/" onClick={onLogout}>Logout</Link></li>
            </ul>
        </header>
    )
}

export default Nav
