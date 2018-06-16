import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools'
import resolvers from './resolvers'

const typeDefs = `

# GraphQL MIP backend implementation

# GraphQL root type

type Query {
  variables: [Variable]
  groups: Group
  datasets: [Dataset]
  mining(variables: String, covariables: String, grouping: String, datasets: String, algorithm: String) : Mining
  methods: Methods
  experiments: [Experiment]
  experiment(uuid: String): Experiment 
  models: [Model]
 }

type Mutation {
  saveModel(
    title: String
    variables: [VariableInput!]!
    coVariables: [VariableInput]
    groupings: [VariableInput]
    trainingDatasets: [VariableInput]
    testingDatasets: [VariableInput]
    validationDatasets: [VariableInput]
  ): Model
  runExperiment(name: String, model: String, algorithms: String, datasets: String): Experiment
}

# Types

type Variable {
  code: String!
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
  code: String!
  label: String
  groups: [Group]
}

type Dataset {
  code: String!
  label: String
  description: String
  anonymisationLevel: String
}

type Mining {
  jobId: String
  node: String
  function: String
  shape: String
  timestamp: String
  data: String # FIXME: or not, stringified json for now
}

type Methods {
  algorithms: [Algorithm]
  metrics: Metrics
  validations: [Validation]
}

type Experiment {
  uuid: String
  name: String
  result: String
  hasError: Boolean
  hasServerError: Boolean
  shared: Boolean
  resultsViewed: Boolean
#  algorithms: [Algorithm]
#  validations: [String]
  model: Model
  created: String
  finished: String
}

type Model {
  query: ModelQuery
  createdAt: String
  updatedAt: String
  description: String
  slug: String
  title: String
  valid: Boolean
}

type Algorithm {
  code: String!
  label: String
  name: String
  description: String
  type: [String]
  docker_image: String
  environment: String
  constraints: AlgorithmConstraint
  parameters: [Parameter]
  validation: [Validation]
}

type Parameter {
  code: String!
  label: String
  value: String
  description: String
  default_value: String
  type: String
  constraints: Constraint
}

type ModelQuery {
  variables: [Variable]
  coVariables: [Variable] # FIXME: covariables
  filters: String # FIXME: as JSON?
  groupings: [Variable] # FIXME: as covariable
  testingDatasets: [Variable]
  trainingDatasets: [Variable]
  validationDatasets: [Variable]
}

type ExperimentParameter {
  code: String
  value: String
}

type MethodParameter {
  code: String!
  label: String
  description: String
  default_value: String
  type: String
  constraints: Constraint
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
  variable: AlgorithmConstraintProp #FIXME: variables ?
  mixed: Boolean
}

type Metric {
  code: String!
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

type Element {
  code: String
  label: String
}

type Validation {
  code: String
  label: String
  parameters: [Parameter]
}

# Input types

input VariableInput {
  code: String
}

`

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
