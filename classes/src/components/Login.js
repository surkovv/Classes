import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Setting, PasswordSetting} from "./Setting"
import "../styles/Button.css"
import "../styles/MainPage.css"
import "../styles/Forms.css"
import {backend} from "../config";

function Login() {
    const navigate = useNavigate()

    const initialFormData = Object.freeze({
        username: '',
        password: ''
    })

    const [formData, updateFormData] = useState(initialFormData)
    const [errorMessage, updateErrorMessage] = useState("");

    const handleChange = (e) => {
        console.log(e.target.name)
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        console.log(formData)

        axios.post(backend + 'api/token/', {
            username: formData.username,
            password: formData.password
        }).then(response => {
            if (response.status !== 200) {
                console.log(response.data)
                return
            }

            navigate("/", {replace: true});
            window.location.reload();

            window.localStorage.setItem('ACCESS', response.data.access);
            window.localStorage.setItem('REFRESH', response.data.refresh);
        }).catch(error => {
            if (error.response.statusText === 'Unauthorized') {
                updateErrorMessage('Неправильный логин или пароль')
            }
        })
    }

    return (<div className="form_page">
        <div className="form">
            <p className="mp_title">Авторизация</p>
            <Setting name="Логин" onChange={handleChange} id="username"/>
            <PasswordSetting name="Пароль" id="password" onChange={handleChange}/>
            <p className="error">{errorMessage}</p>
            <div className="button" onClick={handleClick}>Войти</div>
        </div>
    </div>)
}

export default Login;