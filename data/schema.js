import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
type Query {
  variables: [Variable]
  groups: Group
  mining(variable: String!): MiningResponse
  
}

type Mutation {
  saveModel(variables: String, covariables: String): String
}

type MiningResponse {
  jobId: String
  node: String
  function: String
  shape: String
  timestamp: String
  data: String
}

type Code {
  code: String!
}

type Element {
  code: String
  label: String
}

type Variable {
  code: String
  label: String
  type: String
  sql_type: String
  description: String
  methodology: String
  enumerations: [Element]
  group: Element
  isVariable: Boolean
}

type Group {
  code: String
  label: String
  groups: [Group]
}
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
