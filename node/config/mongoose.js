import mongoose from 'mongoose'
import autoincrement from 'mongoose-auto-increment'

const schema = mongoose.schema

const connectMongoDB = () => {
    const db = mongoose.connect('mongodb://localhost:27017/todo-quest')
    autoIncrement.initialize(db)

    const todoSchema = new Schema({
        detail: String,
    })

    todoSchema.plugin(autoIncrement.plugin, { model: 'todo', field: 'todoId' })

    return db
}

module.exports = {
    connectMongoDB
}