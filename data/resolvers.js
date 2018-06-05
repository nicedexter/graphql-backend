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
        .then(json => Object.assign(
          {},
          json,
          { data: JSON.stringify(json.data) }
        ))
        .catch(err => console.error(err)),
  },
}

export default resolvers
