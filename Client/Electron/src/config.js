export const AUTH0_DOMAIN = process.env.REACT_APP_AUTH0_DOMAIN || 'react-todo-universal.auth0.com';
export const AUTH0_CLIENT_ID = process.env.REACT_APP_AUTH0_CLIENT_ID || 'tBLDtlPmAIQTKk9MO1gIbZ5ibLfs85ZL';
export const AUTH0_CLIENT_SECRET = process.env.REACT_APP_AUTH0_CLIENT_SECRET || 'c5OEcxsL6Vj9KuuWTrvGfvqZmg3NW1ejQFsP7VjvJSgvew2IGv8OOGO0ydCGmknz';
export const AUTH0_API_AUDIENCE = process.env.REACT_APP_AUTH0_API_AUDIENCE || 'https://api.react-todo-universal.com';
export const AUTH0_LOGIN_REDIRECT_URL = process.env.REACT_APP_AUTH0_LOGIN_REDIRECT_URL || 'http://localhost:3000/callback';
export const AUTH0_LOGOUT_REDIRECT_URL = process.env.REACT_APP_AUTH0_LOGOUT_REDIRECT_URL || 'http://localhost:3000/';

//App server
export const APP_SERVER_URL = process.env.REACT_APP_APP_SERVER_URL || 'https://react-todo-server.herokuapp.com' || 'http://localhost:8080';