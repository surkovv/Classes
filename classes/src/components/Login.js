import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate()

    const initialFormData = Object.freeze({
        username: '',
        password: ''
    })

    const [formData, updateFormData] = useState(initialFormData)

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

        axios.post('http://localhost:8000/api/token/', {
            username: formData.username,
            password: formData.password
        }).then(response => {
            console.log(response)
            if (response.status !== 200) {
                console.log(response.data)
                return
            }
            window.localStorage.setItem('ACCESS', response.data.access);
            window.localStorage.setItem('REFRESH', response.data.refresh);

            navigate("/", {replace: true});
            window.location.reload();
        })
    }

    return <div>
        <input id="username" type="text" onChange={handleChange} name="username"/>
        <input id="password" type="password" onChange={handleChange} name="password"/>
        <input id="submit" type="submit" value="Войти" onClick={handleClick}/>
    </div>
}

export default Login;