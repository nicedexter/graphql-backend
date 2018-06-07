import fetch from 'node-fetch'

const BACKEND_URL = 'http://localhost:8080/services'
const encode = param =>
  (param &&
    param.split(',').map(v => ({
      code: v,
    }))) ||
  []

const resolvers = {
  Query: {
    variables: () => fetch(`${BACKEND_URL}/variables`).then(res => res.json()),
    groups: () => fetch(`${BACKEND_URL}/groups`).then(res => res.json()),
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
        .then(json =>
          Object.assign({}, json, { data: JSON.stringify(json.data) })
        )
        .catch(err => console.error(err))
    },
    methods: () =>
      fetch('http://localhost:8080/services/methods').then(res => res.json()),
  },
  Mutation: {
    saveModel: (root, { variables, covariables }) => {
      variables = variables === undefined ? '' : variables
      covariables = covariables === undefined ? '' : covariables

      return fetch('http://localhost:8080/services/models', {
        body: JSON.stringify({
          title: 'ts',
          config: {
            type: 'designmatrix',
            height: 480,
            yAxisVariables: [],
            xAxisVariable: null,
            hasXAxis: true,
            title: {
              text: 'ts',
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
            variables: variables.split(',').map(v => ({
              code: v,
            })),
            groupings: [],
            coVariables: covariables.split(',').map(v => ({
              code: v,
            })),
            trainingDatasets: ['desd-synthdata'],
          },
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      }).then(res => res.text())
    },
  },
}

export default resolvers
