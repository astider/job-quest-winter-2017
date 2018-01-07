import mongoose from 'mongoose'
import autoIncrement from 'mongoose-auto-increment'

autoIncrement.initialize(mongoose.connection)

const Schema = mongoose.Schema
const todoSchema = new Schema({
    todoId: Number,
    text: String,
    done: Boolean
})


todoSchema.plugin(autoIncrement.plugin, { model: 'todoSchema', field: 'todoId'})

module.exports = mongoose.model('todoList', todoSchema)