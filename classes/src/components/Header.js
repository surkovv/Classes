import React from "react";
import { Link } from 'react-router-dom';
import "../styles/Header.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {backend} from "../config";

function Header({name}) {
    const navigate = useNavigate()
    function Logout() {
        if (!window.localStorage.getItem('ACCESS')) {
            return;
        }
        axios.post(backend + "api/logout/", {
            "headers": {
                "Authorization": `Bearer ${window.localStorage.getItem('ACCESS')}`
            },
            "refresh_token": window.localStorage.getItem('REFRESH')
        }).then(response => {
            window.localStorage.setItem('ACCESS', null);
            window.localStorage.setItem('REFRESH', null);

            navigate('/')
            window.location.reload()
        }).catch(error => {
            console.log(error.response)
        })
    }

    if (name === null) {
        return (<div className="header">
            <Link className='title' to='/'>Classes</Link>
            <Link className='sign_up header_link' to='/register'>Регистрация</Link>
            <Link className='sign_in header_link' to='/login'>Вход</Link>
        </div>)
    }

    return (<div className="header">
        <Link className='title' to='/'>Classes</Link>
        <Link className='header_name header_link' to='/settings'>
            {name}
        </Link>
        <Link className='exit header_link' to='/'>
            <span onClick={Logout}>
                Выйти
            </span>
        </Link>
    </div>)
}

export default Header;