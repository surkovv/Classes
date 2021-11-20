import React from "react";
import Header from "./Header";
import "../styles/MainPage.css"
import CourseCard from "./CourseCard";

const courses = [
    {name: 'Школа 100500. Олимпиадная информатика', description: 'Описание'},
    {name: 'Кружок в Белгороде', description: 'Описание'},
    {name: 'PlaceHolder 1', description: 'Описание'},
    {name: 'PlaceHolder 2', description: 'Описание'}
]

function MainPage({info}) {
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