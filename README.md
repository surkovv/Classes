# Classes

Веселый аналог moodle. Сайт с курсами и студентами. [Ссылка](http://62.84.119.48/). 

[Админка](http://62.84.119.48:8000). Логин: BigAdmin. Пароль: FullStack21.

## Курсы.

Список курсов появляется на главной странице в виде плиточек. Их можно добавлять, удалять, менять через админку. На страницу курса можно попасть, будучи авторизованным и записанным на курс. Можно записать себя на курс через админку, добавив запись StudentInCourse. Посты и задания можно также добавлять через админку.

## Студенты.

Студенты могут просматривать посты и задания, менять имена, ники, аватарку. Регистрация свободная.

## Deploy.

И фронт, и бек выложены на Яндекс.Облаке. Фронт запущен на nginx, бек привязан к gunicorn. Ввиду того, что я Яндексу не дал много денег😅, иногда обращение к беку может происходить несколько секунд.

