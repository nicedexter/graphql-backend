import fetch from 'node-fetch'
import { GraphQLScalarType } from 'graphql'

const JSONType = new GraphQLScalarType({
  name: 'JSON',
  serialize(value){
      return value;
  }
});

const BACKEND_URL = 'http://155.105.202.23:8080/services'
const encode = (
  param // FIXME:
) =>
  (param &&
    param.split(',').map(v => ({
      code: v,
    }))) ||
  []

const resolvers = {
  JSON: JSONType,
  Query: {
    variables: () => fetch(`${BACKEND_URL}/variables`).then(res => res.json()),
    groups: () => fetch(`${BACKEND_URL}/groups`).then(res => res.json()),
    datasets: () => fetch(`${BACKEND_URL}/datasets`).then(res => res.json()),
    mining: (
      root,
      { variables, covariables, grouping, datasets, algorithm }
    ) => {
      const body = {
        variables: encode(variables),
        covariables: encode(covariables),
        grouping: encode(grouping),
        datasets: encode(datasets),
        filters: '',
        algorithm: {
          code: algorithm,
          name: algorithm,
          parameters: [],
          validation: false,
        },
      }

      return fetch(`${BACKEND_URL}/mining`, {
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
        .then(res => res.json())

        .catch(err => console.error(err))
    },
    methods: () => fetch(`${BACKEND_URL}/methods`).then(res => res.json()),
    experiments: () =>
      fetch(`${BACKEND_URL}/experiments?mine=true`).then(res => res.json()),
    experiment: (_, { uuid }) =>
      fetch(`${BACKEND_URL}/experiments/${uuid}`)
        .then(res => res.json())
        .catch(err => console.error(err)),
    models: () => fetch(`${BACKEND_URL}/models`).then(res => res.json()),
  },
  Mutation: {
    saveModel: (
      root,
      {
        title,
        variables,
        covariables,
        groupings,
        trainingDatasets,
        testingDatasets,
        validationDatasets,
      }
    ) => {
      return fetch(`${BACKEND_URL}/models`, {
        body: JSON.stringify({
          title: 'test',
          config: {
            type: 'designmatrix',
            height: 480,
            yAxisVariables: [],
            xAxisVariable: null,
            hasXAxis: true,
            title: {
              text: title,
            },
          },
          dataset: {
            code: 'DS1528208604241',
            date: 1528208604241,
            variable: ['leftacgganteriorcingulategyrus'],
            grouping: [],
            header: [],
            data: {
              leftacgganteriorcingulategyrus: [],
            },
          },
          query: {
            variables,
            groupings,
            coVariables: covariables,
            trainingDatasets,
            testingDatasets,
            validationDatasets,
          },
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }).then(res => res.json())
    },
    runExperiment: (root, { name, model, algorithms, datasets }) => {
      const body = {
        model,
        validations: [],
        datasets: encode(datasets),
        filters: '',
        name,
        algorithms: algorithms.split(',').map(a => ({
          code: a,
          name: a,
          parameters: [],
          validation: false,
        })),
      }

      return fetch(`${BACKEND_URL}/experiments`, {
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
        .then(res => res.json())
        .catch(err => console.error(err))
    },
  },
}

export default resolvers
