import mongoose from './config/mongoose'
import express from './config/express'

const db = mongoose.connectMongoDB()
const app = express.setupExpress()

app.listen(8000, () => {
 console.log("Express server listening on port 8000");
})