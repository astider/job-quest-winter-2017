import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import todoList from '../model/todo.model'


const setupExpress = () => {

    const app = express()

    app.use(bodyParser.urlencoded({'extended':'true'}))
    app.use(bodyParser.json())
    app.use(bodyParser.text({ type: 'application/graphql' }))

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
            done: false,
            createdAt: new Date(),
            updatedAt: new Date()
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
    
            if (deletedTodo) {
                res.json({
                    error: null,
                    deletedTodo: deletedTodo
                })
            }
            else {
                res.json({
                    error: null,
                    message: 'Cannot find Todo id ' + targetId
                })
            }            

        })
        .catch(error => {
            res.status(500).json({
                error: error,
                message: 'error while deleting todo id: ' + targetId
            })
        })

    })

    // Toggle todo status
    app.post('/:id/toggle', (req, res) => {
        
        let targetId = req.params.id

        todoList.findOne({ todoId: targetId })
        .then(target => {
    
            let done = target.done
            return todoList.update(
                { todoId: targetId },
                { done: !done, updatedAt: new Date() }
            )
            
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

