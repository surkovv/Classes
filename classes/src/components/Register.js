import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Setting, PasswordSetting} from "./Setting"
import "../styles/Button.css"
import "../styles/MainPage.css"
import "../styles/Forms.css"

function Register() {
    const navigate = useNavigate()
    const [errorMessage, updateErrorMessage] = useState("")


    const initialFormData = Object.freeze({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
    })

    const [formData, updateFormData] = useState(initialFormData)
    const [password_repeat, update_password_repeat] = useState("")

    const handleChange = (e) => {
        console.log(e.target.name)
        if (e.target.name === 'password_repeat') {
            update_password_repeat(e.target.value.trim())
            return
        }
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        })
    }

    const handleClick = (e) => {
        e.preventDefault()
        console.log(formData)
        console.log(password_repeat)
        if (formData.password !== password_repeat) {
            updateErrorMessage("Пароли не совпадают")
            return
        }

        if (!formData.username || !formData.email || !formData.first_name || !formData.last_name || !formData.password) {
            updateErrorMessage('Заполните все поля')
            return
        }

        axios.post('http://localhost:8000/api/register/', formData).then(response => {
            navigate("/", {replace: true});
            window.location.reload();
        }).catch(error => {
            if (error.response.data === 'User with the same username already exists') {
                updateErrorMessage('Пользователь с таким именем уже существует')
            }
        })
    }

    return <div className="form_page">
            <div className="form">
                <p className="mp_title">Регистрация</p>
                <Setting name="Логин" id="username" onChange={handleChange}/>
                <Setting name="Email" id="email" onChange={handleChange}/>
                <Setting name="Имя" id="first_name" onChange={handleChange}/>
                <Setting name="Фамилия" id="last_name" onChange={handleChange}/>
                <PasswordSetting name="Пароль" id="password" onChange={handleChange}/>
                <PasswordSetting name="Повторите пароль" id="password_repeat" onChange={handleChange}/>
                <p className="error">{errorMessage}</p>
                <div className="button" onClick={handleClick}>Register!</div>
            </div>
        </div>
}

export default Register;