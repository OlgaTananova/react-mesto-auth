# Project: Mesto (front-end part)

This is a pet-project within the web development course at Practicum. 
The goal of the project is to learn and practice the basic concepts of the React framework.

The following technologies were used in this project:

CSS:

- Flexbox and Gridlayout for building an adaptive page grid.
- Relative block sizes and CSS built-in functions for calculating "elastic" block sizes.
- Media queries for more accurate adaptation of the page to different screen sizes.
- The CSS file structure is made according to BEM.
HTML:

- Various semantic tags to improve page accessibility for users.

React:

- The project structure is created based on Create React App;
- The main blocks of the project are organized using functional components;
- Hooks are used in components to track component states and life cycles;
- The page is interactive due to the declarative approach to changing components and their markup:
  by changing the state of components, passing state from one component to another,
  using context subscription, etc.
- A custom hook is used for form validation;
- Application routing is done through React-router v6, and protected paths are used to protect private pages accessible
  only to registered users.


The project is connected to a remote server:

- Api class component handles requests to the server to change user profile and add new cards;
- authApi functional component handles requests to the server for user registration and authentication;
- REST API requests are used for communication between the client and server;

Link to the back-end part of the project: [Back-end](https://github.com/OlgaTananova/react-mesto-api-full)

Project on GithubPages: [React-mesto-auth](https://olgatananova.github.io/react-mesto-auth)

See demo how to use Mesto: [Demo](https://scribehow.com/shared/MESTO__vOv-bXDwTyGBziV8yY5aGg)

Olga Tananova
