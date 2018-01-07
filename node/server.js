import express from './config/express'
import mongoose from './config/mongoose'

const app = express.setupExpress()
const db = mongoose.connectMongoDB()

app.listen(8000, () => {
 console.log("Express server listening on port 8000");
})