import express from 'express'
import bodyParser from 'body-parser'
import schema from './scoreSchema.js'
import graphqlHTTP from 'express-graphql'

import { graphql } from 'graphql'

// const schema = buildSchema(`
//     type Query {
//         hello: String
//     }
// `)


const setupExpress = () => {

    const app = express()

    app.use(express.static(__dirname + '/public'))
    app.use(bodyParser.urlencoded({'extended':'true'}))
    app.use(bodyParser.json())
    app.use(bodyParser.text({ type: 'application/graphql' }))

    app.use('/graphql', graphqlHTTP({
         schema: schema,
    //     rootValue: root,
        graphiql: true,
    }))

    app.post('/graphql', (req, res) => {
        graphql(schema, req.body)
        .then((result) => {
            res.send(JSON.stringify(result, null, 2))
        })
    })


    return app

}

module.exports = {
    setupExpress
}

