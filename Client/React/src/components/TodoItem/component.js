import React, { Component } from 'react';
import './todoItem.css';

class TodoItem extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
        }
    }

    handleEditTitle = () => {
        this.setState({
            isEdit: true
        })
    }

    handleSubmitTitle = () => {
        this.props.updateItem(
            this.props.token, 
            {
                _id: this.props.id,
                title: this.input.value
            }
        )

        this.setState({
            isEdit: false
        })
    }

    handleCheck = () => {
        this.props.updateItem(
            this.props.token, 
            {
                _id: this.props.id,
                completed: !this.props.completed
            }
        )

        this.setState({
            isEdit: false
        })
    }

    handleDelete = () => {
        this.props.deleteItem(this.props.token, {_id: this.props.id})
    }

    renderTitle = () => {
        return this.state.isEdit
            ?   <input
                    ref={input => this.input = input}
                    className="edit-title"
                    type="text"
                    defaultValue={this.props.title}
                    onBlur={this.handleSubmitTitle}
                    autoFocus
                />
            :   <p 
                    className={this.props.completed ? "title-crossed" : "title"}
                    onDoubleClick={this.props.completed ? null : this.handleEditTitle}>
                        {this.props.title}
                </p>
    }

    renderCheckIcon = () => {
        return this.props.completed
            ? <i className="fas fa-check check-icon"></i>
            : null
    }

    render() {
        return (
            <div className="item-container">
                <div className="completed-check-box" onClick={this.handleCheck}>
                    {this.renderCheckIcon()}
                </div>
                <div className="title-container">
                    {this.renderTitle()}
                </div>
                <div className="delete-btn" onClick={this.handleDelete}>
                    <i className="fas fa-times delete-icon"></i>
                </div>
            </div>
        )
    }
}

export default TodoItem;