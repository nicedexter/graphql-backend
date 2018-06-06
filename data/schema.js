import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `
type Query {
  variables: [Variable]
  groups: Group
  histogram(variable: String!): MiningResponse
  summary(variables: String, grouping: String, covariables: String) : MiningResponse
  methods: Methods
}

type Mutation {
  saveModel(variables: String, covariables: String): String
}

type ConstraintProp {
  min_count: Int
  binominal: Boolean
  integer: Boolean
  polynominal: Boolean
  real: Boolean
}

type Constraint {
  covariables: ConstraintProp
  grouping: ConstraintProp
  mixed: Boolean
  variable: ConstraintProp
}

type Algorithm {
  code: String!
  label: String
  description: String
  type: [String]
  constraints: Constraint
}

type Methods {
  algorithms: [Algorithm]
#metrics: String
#validations: String
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
