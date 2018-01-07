import mongoose from './config/mongoose'
import express from './config/express'

const db = mongoose.connectMongoDB()
const app = express.setupExpress()

app.listen(8000, () => {
 console.log("Express server listening on port 8000");
})

// app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));