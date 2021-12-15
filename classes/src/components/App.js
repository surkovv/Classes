import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import axios from 'axios';
import '../styles/App.css'
import CoursePage from './CoursePage';
import MainPage from './MainPage';
import TasksPage from './TasksPage';
import SettingsPage from './SettingsPage';
import Login from './Login'
import Register from "./Register";

function App(){
    const [name, setName] = useState(null)

    useEffect(() => {
        console.log(window.location.access)
        if (!window.localStorage.ACCESS) {
            return;
        }
        axios.get("http://localhost:8000/api/current_user/", {
            "headers": {
                "Authorization": `Bearer ${window.localStorage.getItem('ACCESS')}`
            }
        }).then(response => {
            console.log(response)
            if (response.data.id !== null)
                setName(response.data.first_name + " " + response.data.last_name)
        })
    }, [])
    return (

        <Routes>
            <Route path='/' element={<MainPage info={{name:name}}/>} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/settings' element={<SettingsPage info={{name:name}}/>}/>
            <Route path='/courses/:id' element={<CoursePage info={{name:name}}/>}/>
            <Route path='/courses/:id/tasks' element={<TasksPage info={{name:name}}/>}/>
        </Routes>
    )
}

export default App;