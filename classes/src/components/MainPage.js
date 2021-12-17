import React, {useEffect, useState} from "react";
import Header from "./Header";
import "../styles/MainPage.css"
import CourseCard from "./CourseCard";
import axios from "axios";

function MainPage({info}) {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios({
            method: "GET",
            url: "http://localhost:8000/api/courses/"
        }).then(response => {
            setCourses(response.data.courses)
        })
    }, [])

    return <div>
        <Header name={info.name}/>
        <div className="main_page">
            <p className='mp_title'>Курсы</p>
            <div className='courses_holder'>
                {courses.map((item)=><CourseCard key={item.id} info={item} />)}
            </div>
            <p className='mp_title'>Дополнительная информация</p>
        </div>
    </div>
}

export default MainPage;