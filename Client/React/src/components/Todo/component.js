import React, { Component } from 'react';
import './todo.css';
import { REACT_UNIVERSAL_REPO_URL } from '../../config';

import TodoItem from '../TodoItem';

class Todo extends Component {

    componentDidMount() {
        this.props.getItems(this.props.token);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.props.token, {title: this.input.value.trim()});
        this.input.value = ''
    }

    renderTodos = () => {
        const items = this.props.items.map(item => (
            <div key={item._id}>
                <TodoItem id={item._id} title={item.title} completed={item.completed} />
            </div>
        ))
        return items;
    }

    render() {
        return (
            <div>
                <h1 class="site-header">Todos</h1>
                <p className="app-description">
                    Universal, cross platform todos app built from <a href={REACT_UNIVERSAL_REPO_URL} target="_blank">React Universal</a> starter kit
                </p>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                            id="input-title"
                            className="input-title"
                            type="text"
                            autoComplete="off"
                            ref={input => {this.input = input}}/>
                    </div>
                </form>
                <div className="todo-container">
                    {this.renderTodos()}
                </div>
            </div>
        )
    }
}

export default Todo;