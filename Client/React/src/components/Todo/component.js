import React, { Component } from 'react';
import './todo.css';

import TodoItem from '../TodoItem';

class Todo extends Component {

    componentDidMount() {
        this.props.getItems(this.props.token);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.props.token, {title: this.input.value})
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
                <h1>Todo Page</h1>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <input id="input-title" className="input-title" type="text" autoComplete="off" ref={input => {this.input = input}}/>
                    </div>
                    <div className="submit-container">
                        <button className="submit-btn" type="submit">Submit</button>
                    </div>
                </form>
                {this.renderTodos()}
            </div>
        )
    }
}

export default Todo;