import React from "react";
import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import Header from "./Header";
import Post from "./Post";
import "../styles/CoursePage.css"
import axios from "axios";

const prefix='http://localhost:8000'

function CoursePage({info}) {
    /* info = {
        student_name - имя и фамилия пользователя
        img - путь до картинки
        course_name - название курса
        posts - записи (title, body)
    }*/

    const {id} = useParams()
    const [course, setCourse] = useState({})
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/course/?id=" + id
        }).then(response => {
            setCourse(response.data['course'])
            setPosts(response.data['entries'])
            console.log(posts)
        })
    }, [])

    return <div>
        <Header name={info.name}/>
        <div className='course_page'>
            <div className='left_side'>
                <p className='course_name'>{course.title}</p>
                <div className='posts_holder'>
                    {posts.map((item)=><Post info={item} />)}
                </div>
            </div>
            <div className='right_side'>
                <img className='student_img' src={prefix+course.img_url} />
                <p className='student_name'>{info.name}</p>
                <Link to={`/courses/${id}/tasks`} className='right_side_item'>Задания</Link>
                <p className='right_side_item'>Общая таблица</p>
                <p className='right_side_item'>Мои настройки</p>
            </div>
        </div>
    </div>
}

export default CoursePage;