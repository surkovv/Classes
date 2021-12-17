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
import {backend} from "../config"


function App(){
    const [name, setName] = useState(null)

    useEffect(() => {
        if (!window.localStorage.getItem('ACCESS')) {
            return;
        }
        axios.get(backend + "api/current_user/", {
            "headers": {
                "Authorization": `Bearer ${window.localStorage.getItem('ACCESS')}`
            }
        }).then(response => {
            if (response.data.id !== null)
                setName(response.data.first_name + " " + response.data.last_name)
        }).catch(error => {})
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