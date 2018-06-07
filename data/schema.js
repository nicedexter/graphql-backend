import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `

# GraphQL root type

type Query {
  variables: [Variable]
  groups: Group
  mining(variables: String, covariables: String, grouping: String, datasets: String, algorithm: String) : MiningResponse
  methods: Methods
 }

type Mutation {
  saveModel(variables: String, covariables: String): String
}

type AlgorithmConstraintProp {
  min_count: Int
  binominal: Boolean
  integer: Boolean
  polynominal: Boolean
  real: Boolean
}

type AlgorithmConstraint {
  covariables: AlgorithmConstraintProp
  grouping: AlgorithmConstraintProp
  variable: AlgorithmConstraintProp #FIXME variables ?
  mixed: Boolean
}

type Algorithm {
  code: String!
  label: String
  description: String
  type: [String]
  docker_image: String
  environment: String
  constraints: AlgorithmConstraint
  parameters: [Parameter]
}

type Metric {
  code: String
  label: String
  tooltip: String
  type: String
}

type Metrics {
  binominal_classification: [Metric]
  classification: [Metric]
  regression: [Metric]
}

type Constraint {
  min: String
  max: String
}

type Parameter {
  code: String
  label: String
  description: String
  default_value: String
  type: String
  constraints: Constraint
}

type Validation {
  code: String
  label: String
  parameters: [Parameter]
}

type Methods {
  algorithms: [Algorithm]
  metrics: Metrics
  validations: [Validation]
}

type MiningResponse {
  jobId: String
  node: String
  function: String
  shape: String
  timestamp: String
  data: String # FIXME or not, stringified json for now
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
