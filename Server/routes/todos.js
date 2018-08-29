const express = require('express');

const { Todo } = require('../models/todo');
const { checkJwt } = require('../middlewares/auth');

const router = express.Router();

router.get('/', checkJwt, async function(req, res){

    const user_id = req.user.sub;

    try {
        const todos = await Todo.find({user_id});
        res.status(200).json(todos);
    }
    catch(e)
    {
      console.error(e);
      res.status(500).json('Internal server error.');
    }

})

router.post('/', checkJwt, async function(req, res){

    const user_id = req.user.sub;

    if (!req.body.title) {
        res.status(400).json({error: 'Title is required.'});
    }

    const todo = {
        user_id: user_id,
        title: req.body.title,
        completed: false,
        createDate: new Date()
    }

    try {
        const todo_db = await Todo.create(todo);
        res.status(201).json(todo_db);
    }
    catch(e)
    {
      console.error(e);
      res.status(500).json('Internal server error.');
    }

})

router.put('/:id', checkJwt, async function(req, res){

    const id = req.params.id;

    if (!id) {
        res.status(400).json({error: 'Id is required.'});
    }

    const todo_db = await Todo.findById(id);

    if (!todo_db) {
        res.status(400).json({error: `Cannot find todo with id: ${id}`});
    }

    if (req.body.title) {
        todo_db.title = req.body.title;
    }

    if (req.body.completed !== null) {
        todo_db.completed = req.body.completed;
    }

    try {
        const todo_updated = await todo_db.save();
        res.status(200).json(todo_updated);
    }
    catch(e)
    {
      console.error(e);
      res.status(500).json('Internal server error.');
    }

})

router.delete('/:id', checkJwt, async function(req, res){

    const id = req.params.id;

    if (!id) {
        res.status(400).json({error: 'Id is required.'});
    }

    const todo_db = await Todo.findById(id);

    if (!todo_db) {
        res.status(400).json({error: `Cannot find todo with id: ${id}`});
    }

    try {
        await todo_db.remove();
        res.status(200).end();
    }
    catch(e)
    {
      console.error(e);
      res.status(500).json('Internal server error.');
    }

})

module.exports = router;
