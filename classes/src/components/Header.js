import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Header.css"

function Header({name}) {
    console.log(name)
    if (name === null) {
        return <div className="header">
            <Link className='title' to='/'>Classes</Link>
            <Link className='sign_up header_link' to='/'>Регистрация</Link>
            <Link className='sign_in header_link' to='/'>Вход</Link>
        </div>
    }

    return <div className="header">
        <Link className='title' to='/'>Classes</Link>
        <Link className='header_name header_link' to='/settings'>
            {name}
        </Link>
        <Link className='exit header_link' to='/'>Выйти</Link>
    </div>
}

export default Header;