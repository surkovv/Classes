import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Header.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useForceUpdate from "./ApiQuery"

function Header({name}) {
    const navigate = useNavigate()
    const forceUpdate = useForceUpdate()
    function Logout() {
        if (!window.localStorage.ACCESS) {
            return;
        }
        window.localStorage.setItem('ACCESS', null);
        window.localStorage.setItem('REFRESH', null);
        navigate('/')
        window.location.reload();
    }

    console.log(name)
    if (name === null) {
        return <div className="header">
            <Link className='title' to='/'>Classes</Link>
            <Link className='sign_up header_link' to='/register'>Регистрация</Link>
            <Link className='sign_in header_link' to='/login'>Вход</Link>
        </div>
    }

    return <div className="header">
        <Link className='title' to='/'>Classes</Link>
        <Link className='header_name header_link' to='/settings'>
            {name}
        </Link>
        <Link className='exit header_link' to='/'>
            <span onClick={Logout}>
                Выйти
            </span>
        </Link>
    </div>
}

export default Header;