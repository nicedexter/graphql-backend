import { Variables, Groups, Hierarchy } from './connectors'

const resolvers = {
  Query: {
    variables: () => Variables,
    groups: () => Groups,
    hierarchy: () => Hierarchy,
  },
}

export default resolvers
