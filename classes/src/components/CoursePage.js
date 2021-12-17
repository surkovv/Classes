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

    console.log(window.localStorage.getItem('ACCESS'))
    const no_authorization = window.localStorage.getItem('ACCESS') === null ||
            window.localStorage.getItem('ACCESS') === 'null' || window.localStorage.getItem('ACCESS') === undefined

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/course/?id=" + id,
            headers:
            !no_authorization ? {
                "Authorization": `Bearer ${window.localStorage.getItem('ACCESS')}`
            } : {}
        }).then(response => {
            setCourse(response.data['course'])
            setPosts(response.data['entries'])
            console.log(response)
        }).catch(error => {
            axios({
                method: "GET",
                url: "http://localhost:8000/api/course/?id=" + id,
            }).then(response => {
                setCourse(response.data['course'])
                setPosts(response.data['entries'])
                console.log(response)
            })
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const authorized_leftside =
        <div className='left_side'>
            <p className='course_name'>{course.title}</p>
            <div className='posts_holder'>
            {posts.map((item) => <Post key={item.toString()} info={item}/>)}
            </div>
        </div>

    const unauthorized_leftside =
        <div className='left_side'>
            <p className='course_name'>Войдите, чтобы увидеть содержимое курса</p>
        </div>

    const no_access_leftside =
        <div className='left_side'>
            <p className='course_name'>Вы не записаны на этот курс. Обратитесь к Славе за доступом.</p>
        </div>

    const unauthorized = (posts[0] === 'Unauthorized')
    const no_access = (posts[0] === 'No access')

    return <div>
        <Header name={info.name}/>
        <div className='course_page'>
            {unauthorized ? unauthorized_leftside : no_access ? no_access_leftside : authorized_leftside}
            {
                !unauthorized && !no_access ?
                <div className='right_side'>
                    <img className='student_img' src={prefix+course.img_url} alt={course.name}/>
                    <p className='student_name'>{info.name}</p>
                    <Link to={`/courses/${id}/tasks`} className='right_side_item'>Задания</Link>
                    <p className='right_side_item'>Общая таблица</p>
                    <p className='right_side_item'>Мои настройки</p>
                </div> :
                <div className='right_side'>
                    <img className='student_img' src={prefix+course.img_url} alt={course.name}/>
                    <p className='student_name'>{course.name}</p>
                </div>
            }
        </div>
    </div>
}

export default CoursePage;