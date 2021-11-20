import React from "react";
import Header from "./Header";
import {Setting, PasswordSetting} from "./Setting";
import "../styles/Button.css"
import "../styles/RegistrationPage.css"

function RegistrationPage() {
    return <div>
        <Header name={null}/>
        <div className='registration_page'>
            <div className='regtitle'>Регистрация нового пользователя</div>
            <Setting name='Фамилия' filler={null} />
            <Setting name='Имя' filler={null} />
            <Setting name='E-mail' filler={null} />
            <PasswordSetting name='Пароль' />
            <PasswordSetting name='Подтверждение пароля' />
            <div className='button regbutton'>Зарегистрироваться</div>
        </div>
    </div>
}

export default RegistrationPage;