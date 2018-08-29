const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const TodoSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    completed: Boolean,
    createDate: Date
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = { Todo };