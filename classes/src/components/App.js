import React from 'react';
import CoursePage from './CoursePage';
import MainPage from './MainPage';
import TasksPage from './TasksPage';
import SettingsPage from './SettingsPage';
import RegistrationPage from './RegistrationPage';

const cp_info = {
    student_name: 'Вася Пупкин', 
    img: 'https://image.newsru.com/pict/id/large/1411555_20110923150259.gif',
    course_name: 'Курс',
    posts: [
        {title: 'Запись 1', body: 'asdg asdgsd sagasdg asfbsdb asdgsadbsda asfbdsb asdbsadbas jljkl asbdb sadasdg asdbdsbasdbas asdg sd '},
        {title: 'Запись 2', body: 'Запись 2'}
    ]
}

const tp_info = {
    student_name: 'Вася Пупкин',
    current_tasks: [
    {
        title: 'Нетематический контест',
        description: 'Личная тренировка от 9 декабря 2222 года. Дорешать до 6 задач. Ссылка на контест.',
        result: '6/10'
    },
    {
        title: 'Командный контест',
        description: 'Дата: 21.09.2001',
        result: '9/9'
    },
    {
        title: 'Алгоритм Диница',
        description: 'Описание',
        result: '6/10'
    },
    {
        title: 'Командный контест',
        description: 'Дата: 21.09.2001',
        result: '9/9'
    },
    ],
    
    expired_tasks: [{
        title: 'Алгоритм Диница',
        description: 'Описание',
        result: '6/10'
    }]
}

const settings_info = {
    name: 'Вася Пупкин',
    first_name: 'Вася',
    last_name: 'Пупкин',
    e_mail: 'vasya.pupkin@gmail.com',
    cf: 'vpupkin',
    img: 'https://image.newsru.com/pict/id/large/1411555_20110923150259.gif',
}

function App(){
    return (
        <div>
        <RegistrationPage></RegistrationPage>
        </div>
    )
}

export default App;