import express from 'express'
import { express as voyagerMiddleware } from 'graphql-voyager/middleware'

import cors from 'cors'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'
import schema from './data/schema'

const GRAPHQL_PORT = 3000

const graphQLServer = express()
graphQLServer.use(cors())

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
graphQLServer.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }))

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
)
