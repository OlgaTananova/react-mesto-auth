# Проект: Фронтэнд проекта Mesto на React c регистрацией и аутентификацией

Это проектная работа в рамках учебного курса веб-разработки Яндекс.Практикума.
Цель проекта - освоить и отработать на практике основные концепции фреймворка React.

В данной работе использованы следующие технологии:

1. CSS:
    - Flexbox и Gridlayout для построения адаптивной сетки страницы.
    - Относительные размеры блоков и встроенные функции CSS для расчета "резиновых" размеров блоков.
    - Медиазапросы для более точной адаптации страницы под различные размеры экранов.

2. HTML:
    - Различные сематические теги для улучшения доступности страницы для пользователей.

3. React:
   - структура проекта создана на основе Create React App;
   - основные блоки проекта организованы с помощью функциональных компонентов;
   - в компонентах используются хуки для отслеживания стейтов и жизненного цикла компонента;
   - страница интерактивна за счет декларативного подхода к изменению компонентов и их разметки:
   через изменение стейта компонентов, передачу стейта от одного компонента к другому, 
   использование подписки на контекст итд.
   - для валидации форм используется кастомный хук;
   - роутинг приложения осуществляется через React-router v6, для защиты приватных страниц, доступных только зарегистри
      рованным пользователям, используются защищенные пути.
   
4. Проект подключен к удаленному серверу:
   - запросы к серверу на изменение профиля пользователя, добавления новых карточек осуществляет классовый компонент Api;
   - запросы к серверу на регистрацию пользователя, его аутентификацию осуществляются через фунциональный компонент authApi;
   - для взаимодействия между клиентом и сервером используется REST API запросы;

5. Файловая структура CSS фалов сделана по БЭМ.

Проект на gh-pages: [React-mesto-auth]:(https://olgatananova.github.io/react-mesto-auth/)



Ольга Тананова