import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import todoList from '../model/todo.model'

const setupExpress = () => {

    const app = express()

    app.use(express.static(__dirname + '/public'))
    app.use(bodyParser.urlencoded({'extended':'true'}))
    app.use(bodyParser.json());                                  
    
    // Get Todo List
    app.get('/', (req, res) => {
        
        todoList.find()
        .then(todoLists => {
            res.json({
                error: null,
                todoLists: todoLists
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error,
                message: 'error while finding todo list'
            })
        })

    })

    // Create new Todo
    app.post('/', (req, res) => {

        let inputText = req.body.inputText

        todoList.create({
            text: inputText,
            done: false
        })
        .then(() => {
            res.json({
                error: null
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error,
                message: 'error while creating todo list'
            })
        })

    })

    // Delete Todo
    app.delete('/:id', (req, res) => {
        
        let targetId = req.params.id

        todoList.findOneAndRemove({ todoId: targetId })
        .then(deletedTodo => {
    
            res.json({
                error: null,
                deletedTodo: deletedTodo
            })

        })
        .catch(error => {
            res.status(500).json({
                error: error,
                message: 'error while deleting todo id: ' + targetId
            })
        })

    })

    app.post('/:id/toggle', (req, res) => {
        
        let targetId = req.params.id

        todoList.findOne({ todoId: targetId })
        .then(target => {
    
            let done = target.done
            return todoList.update({ todoId: targetId }, { done: !done })
            
        })
        .then(updatedTodo => {
            res.json({
                error: null,
                updatedTodo: updatedTodo
            })
        })
        .catch(error => {
            res.status(500).json({
                error: error,
                message: 'error while updating todo id: ' + targetId
            })
        })

    })

    return app

}

module.exports = {
    setupExpress
}

