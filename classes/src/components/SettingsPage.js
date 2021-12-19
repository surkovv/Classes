import React, {useEffect, useState} from "react";
import Header from "./Header";
import {Setting, PasswordSetting, SettingAndValue} from "./Setting";
import "../styles/SettingsPage.css"
import "../styles/Button.css"
import {useNavigate} from "react-router-dom";
import {backend} from "../config";
import axios from "axios";

function SettingsPage({info}) {
    /* info = {
        name,
        first_name,
        last_name,
        e_mail,
        cf
    }
    */

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
    const [photoUrl, setPhotoUrl] = useState("/media/resources/blank.png")

    useEffect(() => {
        axios.get(backend + "api/current_user",
            {
                "headers": {"Authorization": `Bearer ${window.localStorage.getItem('ACCESS')}`}
            }
        ).then(response => {
            if (response.data.id !== null) {
                updateFormData({
                    username: response.data.username,
                    email: response.data.email,
                    first_name: response.data.first_name,
                    last_name: response.data.last_name,
                    password: ""
                })
            }
        })
    }, [])

    useEffect(() => {
        axios.get(backend + "api/photo/",
        {
            "headers": {"Authorization": `Bearer ${window.localStorage.getItem('ACCESS')}`}
        }).then(response => {
            setPhotoUrl(response.data.img_url)
        })
    })

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

        if (formData.password !== password_repeat) {
            updateErrorMessage("Пароли не совпадают")
            return
        }

        if (!formData.username || !formData.email || !formData.first_name || !formData.last_name) {
            updateErrorMessage('Заполните все поля')
            return
        }

        axios.post(backend+'api/change/', formData,{
            "headers": {"Authorization": `Bearer ${window.localStorage.getItem('ACCESS')}`},
        }).then(response => {
            window.location.reload();
        }).catch(error => {
            if (error.response.data === 'User with the same username already exists') {
                updateErrorMessage('Пользователь с таким именем уже существует')
            }
        })
    }

    const [selectedFile, setSelectedFile] = useState(null);

    const photoClick = (e) => {
        let form_data = new FormData();
        form_data.append('image', selectedFile);

        console.log(form_data)
        axios.post(backend+"api/changephoto/", form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                "Authorization": `Bearer ${window.localStorage.getItem('ACCESS')}`
            }
            })
            .then(res => {
              console.log(res.data);
              window.location.update()
            })
            .catch(err => console.log(err))
    }

    return (<div>
        <Header name={info.name}/>
        <div className='settings_page'>
            <div className='left_side_settings'>
                <div className='settings_holder'>
                    <Setting name="Логин" id="username" onChange={handleChange} filler={formData.username}/>
                    <Setting name="Email" id="email" onChange={handleChange} filler={formData.email}/>
                    <Setting name="Имя" id="first_name" onChange={handleChange} filler={formData.first_name}/>
                    <Setting name="Фамилия" id="last_name" onChange={handleChange} filler={formData.last_name}/>
                    <PasswordSetting name="Пароль" id="password" onChange={handleChange}/>
                    <PasswordSetting name="Повторите пароль" id="password_repeat" onChange={handleChange}/>
                    <p className="error">{errorMessage}</p>
                    <p className='button button_left' onClick={handleClick}>Сохранить</p>
                </div>
            </div>
            <div className='right_side_settings'>
                <img className='setting_img' src={backend.slice(0, -1) + photoUrl} alt={info.name}/>
                <input
                  type="file"
                  id="file"
                  name="file"
                  placeholder="Загрузите изображение"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
                <div className='button_right button' onClick={photoClick}>Изменить фото</div>
            </div>
        </div>
    </div>)
    
}

export default SettingsPage;