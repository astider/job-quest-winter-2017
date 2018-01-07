import mongoose, { mongo } from 'mongoose'

const connectMongoDB = () => {

    const db = mongoose.connect('mongodb://localhost:27017/todo-quest')    
    return db
}

module.exports = {
    connectMongoDB
}