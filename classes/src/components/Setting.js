import React from "react";
import "../styles/Setting.css"

function Setting({name, filler}) {
    return <div className='setting'>
        <p className='setting_name'>{name}</p>
        <input type='text' className='setting_input' value={filler}/>
    </div>
}

function PasswordSetting({name}) {
    return <div className='setting'>
        <p className='setting_name'>{name}</p>
        <input type='password' className='setting_input'/>
    </div>
}

export {Setting, PasswordSetting};