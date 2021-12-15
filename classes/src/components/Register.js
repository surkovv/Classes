import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate()

    const initialFormData = Object.freeze({
        username: '',
        email: '',
        first_name: '',
        last_name: '',
        password: '',
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

        axios.post('http://localhost:8000/api/register/', formData).then(response => {
            navigate("/", {replace: true});
            window.location.reload();
        })
    }

    return <div>
        <input id="username" type="text" onChange={handleChange} name="username"/>
        <input id="email" type="text" onChange={handleChange} name="email"/>
        <input id="first_name" type="text" onChange={handleChange} name="first_name"/>
        <input id="last_name" type="text" onChange={handleChange} name="last_name"/>
        <input id="password" type="password" onChange={handleChange} name="password"/>
        <input id="submit" type="submit" value="Войти" onClick={handleClick}/>
    </div>
}

export default Register;