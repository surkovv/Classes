import React from "react";
import Header from "./Header";
import Post from "./Post";
import "../styles/CoursePage.css"

function CoursePage({info}) {
    /* info = {
        student_name - имя и фамилия пользователя
        img - путь до картинки
        course_name - название курса
        posts - записи (title, body)
    }*/

    return <div>
        <Header name={info.student_name}/>
        <div className='course_page'>
            <div className='left_side'>
                <p className='course_name'>{info.course_name}</p>
                <div className='posts_holder'>
                    {info.posts.map((item)=><Post info={item} />)}
                </div>
            </div>
            <div className='right_side'>
                <img className='student_img' src={info.img} />
                <p className='student_name'>{info.student_name}</p>
                <p className='right_side_item'>Задания</p>
                <p className='right_side_item'>Общая таблица</p>
                <p className='right_side_item'>Мои настройки</p>
            </div>
        </div>
    </div>
}

export default CoursePage;