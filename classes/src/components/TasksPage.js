import React, {useEffect, useState} from "react";
import Header from "./Header";
import Task from "./Task";
import "../styles/TasksPage.css"
import "../styles/MainPage.css"
import {useParams} from "react-router-dom";
import axios from "axios";
import {backend} from "../config";

function TasksPage({info}) {
    /* info = {
        student_name - имя и фамилия пользователя
        current_tasks - список текущих заданий
        expired_tasks - список прошедших заданий
    }
    Задание = {
        title=Название
        description=Описание
        result=Строка результат
    }
    */

    const {id} = useParams()
    const [course, setCourse] = useState({})
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: backend+"api/course/tasks/?id=" + id
        }).then(response => {
            setCourse(response.data['course'])
            setTasks(response.data['tasks'])
            console.log(tasks)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (<div>
        <Header name={info.name}/>
        <div className='tasks_page'>
            <p className='mp_title'>{course.name}</p>
            <p className='block_title'>Текущие задания</p>
            <div className='tasks_holder'>
                {tasks.map((item)=><Task key={item.toString()} info={item} />)}
            </div>
            <p className='block_title'>Прошедшие задания</p>
            <div className='tasks_holder'>

            </div>
        </div>
    </div>)
    
}

export default TasksPage;