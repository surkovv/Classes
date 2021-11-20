import React from "react";
import "../styles/CourseCard.css"

function CourseCard({info}) {
    return <div className='course_card'>
        <img className='course_symbol' src='https://idproctor.mipt.ru/public/event/90/b3/08/8a2e5_0dfd.png?t=14909' />
        <div className='name_description_holder'>
            <p className='course_card_name'>{info.name}</p>
            <p className='course_card_description'>{info.description}</p>
        </div>
    </div>
}

export default CourseCard;