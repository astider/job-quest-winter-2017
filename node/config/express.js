import express from 'express'
import bodyParser from 'body-parser'


const setupExpress = () => {

    const app = express()
    app.use(express.static(__dirname + '/public'))
    app.use(bodyParser.urlencoded({'extended':'true'}))
    app.use(bodyParser.json());                                  
    
    app.get('/', (req, res) => {
        res.send('you sent GET request to ./')
    })

    app.post('/', (req, res) => {
        res.send('you sent POST request to ./')
    })

    app.delete('/:id', (req, res) => {
        res.send('you sent DELETE request to ./' + req.params.id)
    })

    app.post('/:id/toggle', (req, res) => {
        res.send('you sent POST request to ./' + req.params.id + '/toggle')
    })

    return app

}

module.exports = {
    setupExpress
}

