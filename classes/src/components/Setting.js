import React from "react";
import "../styles/Setting.css"

function Setting({name, filler=null, id, onChange}) {
    return <div className='setting'>
        <p className='setting_name'>{name}</p>
        <input type='text' id={id} name={id} className='setting_input' value={filler} onChange={onChange}/>
    </div>
}

function PasswordSetting({name, id, onChange}) {
    return <div className='setting'>
        <p className='setting_name'>{name}</p>
        <input type='password' id={id} name={id} className='setting_input' onChange={onChange}/>
    </div>
}

export {Setting, PasswordSetting};