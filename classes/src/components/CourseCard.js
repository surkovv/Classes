import React from "react";
import {Link} from 'react-router-dom'
import "../styles/CourseCard.css"
import {backend} from "../config";

function CourseCard({info}) {
    return <Link to={`/courses/${info.id}`}>
    <div className='course_card'>
        <img className='course_symbol' src={backend + info.img_url} alt={info.name}/>
        <div className='name_description_holder'>
            <p className='course_card_name'>{info.name}</p>
            <p className='course_card_description'>{info.description}</p>
        </div>
    </div>
    </Link>
}

export default CourseCard;