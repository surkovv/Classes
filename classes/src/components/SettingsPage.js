import React from "react";
import Header from "./Header";
import {Setting, PasswordSetting} from "./Setting";
import "../styles/SettingsPage.css"
import "../styles/Button.css"

function SettingsPage({info}) {
    /* info = {
        name,
        first_name,
        last_name,
        e_mail,
        cf
    }
    */
    return <div>
        <Header name={info.name}/>
        <div className='settings_page'>
            <div className='left_side_settings'>
                <div className='settings_holder'>
                    <Setting name='Фамилия' filler={info.last_name}/>
                    <Setting name='Имя' filler={info.first_name}/>
                    <Setting name='E-mail' filler={info.e_mail}/>
                    <Setting name='Codeforces handle' filler={info.cf}/>
                    <PasswordSetting name='Пароль'/>
                    <p className='button button_left'>Сохранить</p>
                </div>
            </div>
            <div className='right_side_settings'>
                <img className='setting_img' src={info.img} alt={info.name}/>
                <div className='button_right button'>Изменить фото</div>
            </div>
        </div>
    </div>
    
}

export default SettingsPage;