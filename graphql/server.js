import fs from 'fs'
import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import cors from 'cors'
import resolvers from './resolvers'
const typeDefs = fs.readFileSync('./schema.gql', 'utf8')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const app = express()
app.use('*', cors({ origin: 'http://localhost:3000' }));
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
app.use('/graphiql', graphiqlExpress({ 
  endpointURL: '/graphql',
}))

const PORT = 5000
app.listen(PORT, () => {
  console.log(`graphql listen http://localhost:${PORT}`)
})