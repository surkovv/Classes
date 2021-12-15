import React from "react";
import "../styles/Task.css"

function Task({info}) {
    return <div className='task'>
        <p className='task_title'>{info.title}</p>
        <p className='task_description'>{info.description}</p>
        <div className='task_result'>
        <p className='task_result_text'>100%</p>
        </div>
    </div>
}

export default Task;