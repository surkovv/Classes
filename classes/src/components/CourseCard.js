import React from "react";
import {Link} from 'react-router-dom'
import "../styles/CourseCard.css"

const prefix='http://localhost:8000'

function CourseCard({info}) {
    console.log(info)
    return <Link to={`/courses/${info.id}`}>
    <div className='course_card'>
        <img className='course_symbol' src={prefix + info.img_url} />
        <div className='name_description_holder'>
            <p className='course_card_name'>{info.name}</p>
            <p className='course_card_description'>{info.description}</p>
        </div>
    </div>
    </Link>
}

export default CourseCard;