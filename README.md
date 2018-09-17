# Todos React Universal

A simple todos app demo that showcases the features of using [React Universal](https://github.com/by12380/react-universal) starter kit

## Demo

* [Live Demo](https://react-todo-universal.herokuapp.com/)

<br />
<img src="https://raw.githubusercontent.com/by12380/react-todo-universal/master/todos-demo.gif" width="1000px"/>
<br />

## Documentation

#### GET /todos
Returns all todos that belongs to the authenticated user
##### Authentication Required
##### Request Header

```
{
    Content-Type: 'application/json',
    Authorization: 'Bearer [YOUR ACCESS TOKEN]',
}
```

##### Response Body

```
[{
    _id: string
    user_id: String,
    title: String,
    completed: Boolean,
    createDate: Date
}]
```
| Property Name | Description |
| --- | --- |
| id | ID of the todo item |
| user_id | ID of the user   |
| title | The description for the todo item |
| completed | The status of whether the todo item has been completed |
| createDate | The date of which the todo item is created |
---

#### POST /todos
Create a todo item
##### Authentication Required

##### Request Header

Same as GET `/todos` request header.

##### Request Body
```
{
    title: String (required)
}
```

| Property Name | Description |
| --- | --- |
| title | The description for the todo item. (Required)|

##### Response Body

```
{
    _id: string
    user_id: String,
    title: String,
    completed: Boolean,
    createDate: Date
}
```
Desciption: Same as GET `/todos` response body.

---

#### PUT /todos/{id}
Update a reminder
##### Authentication Required

##### Route Parameter

| Field | Description |
| --- | --- |
| id | The ID of the todo item to be updated (Required)|

##### Request Header

Same as GET `/todos` request header.

##### Request Body
```
{
    title: String,
    completed: Boolean,
}
(All fields are optional)
```
| Property Name | Description |
| --- | --- |
| title | The description for the todo item. (If included, title cannot be null)|
| completed | The status of whether the todo item has been completed |

##### Response Body

```
{
    _id: string
    user_id: String,
    title: String,
    completed: Boolean,
    createDate: Date
}
```
Desciption: Same as GET `/todos` response body.

---

#### DELETE /todos/{id}
Delete a reminder
##### Authentication Required

##### Route Parameter
| Field | Description |
| --- | --- |
| id | The ID of the todo item to be deleted (Required)|

##### Request Header

Same as GET `/todos` request header.

##### Request Body

None

##### Response Body
None

Status code 204 if success.




## Built With
### Front-End (React + Redux)

React-Native + Expo (mobile) / Electron.js (Desktop) / socket.io

### Back-End (Node.js + MongoDb)

Express.js / Socket.io


## Powered By

* Auth0 API