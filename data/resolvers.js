import fetch from 'node-fetch'

const resolvers = {
  Query: {
    variables: () =>
      fetch('http://localhost:8080/services/variables').then(res => res.json()),
    groups: () =>
      fetch('http://localhost:8080/services/groups').then(res => res.json()),
    mining: (root, { variable }) =>
      fetch('http://localhost:8080/services/mining', {
        body: JSON.stringify({
          variables: [{ code: variable }],
          covariables: [],
          grouping: [
            { code: 'dataset' },
            { code: 'gender' },
            { code: 'agegroup' },
          ],
          datasets: [{ code: 'desd-synthdata' }],
          filters: '',
          algorithm: {
            code: 'histograms',
            name: 'Histograms',
            parameters: [],
            validation: false,
          },
        }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      })
        .then(res => res.json())
        .then(json =>
          Object.assign({}, json, { data: JSON.stringify(json.data) })
        )
        .catch(err => console.error(err)),
  },
  Mutation: {
    saveModel: (root, { variables, covariables }) => {
      variables = variables === undefined ?  "" : variables
      covariables = covariables === undefined ? "" : covariables
      
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
