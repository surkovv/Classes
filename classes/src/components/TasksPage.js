import React from "react";
import Header from "./Header";
import Task from "./Task";
import "../styles/TasksPage.css"

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
    return <div>
        <Header name={info.student_name}/>
        <div className='tasks_page'>
            <p className='block_title'>Текущие задания</p>
            <div className='tasks_holder'>
                {info.current_tasks.map((item)=><Task info={item} />)}
            </div>
            <p className='block_title'>Прошедшие задания</p>
            <div className='tasks_holder'>
                {info.expired_tasks.map((item)=><Task info={item} />)}
            </div>
        </div>
    </div>
    
}

export default TasksPage;