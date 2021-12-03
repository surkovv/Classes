import React, {useEffect, useState} from "react";
import Header from "./Header";
import "../styles/MainPage.css"
import CourseCard from "./CourseCard";
import axios from "axios";

const courses = [
    {name: 'Школа 100500. Олимпиадная информатика', description: 'Описание'},
    {name: 'Кружок в Белгороде', description: 'Описание'},
    {name: 'PlaceHolder 1', description: 'Описание'},
    {name: 'PlaceHolder 2', description: 'Описание'}
]

function MainPage({info}) {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/courses/"
        }).then(response => {
            console.log(response)
            setCourses(response.data.courses)
        })
    }, [])

    return <div>
        <Header name={info.name}/>
        <div className="main_page">
            <p className='mp_title'>Курсы</p>
            <div className='courses_holder'>
                {courses.map((item)=><CourseCard info={item} />)}
            </div>
            <p className='mp_title'>Дополнительная информация</p>
        </div>
    </div>
}

export default MainPage;