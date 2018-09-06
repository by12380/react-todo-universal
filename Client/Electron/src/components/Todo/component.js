import React, { Component } from 'react';
import './todo.css';

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