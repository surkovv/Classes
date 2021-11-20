import React from "react";
import "../styles/Header.css"

function Header({name}) {
    console.log(name)
    if (name === null) {
        return <div className="header">
            <p className='title'>Classes</p>
            <p className='sign_up'>Регистрация</p>
            <p className='sign_in'>Вход</p>
        </div>
    }

    return <div className="header">
        <p className='title'>Classes</p>
        <p className='header_name'>{name}</p>
        <p className='exit'>Выйти</p>
    </div>
}

export default Header;