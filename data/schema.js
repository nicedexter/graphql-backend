import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import resolvers from "./resolvers";

const typeDefs = `
type Query {
  variables: [Variable] @cacheControl(maxAge: 5000)
  groups: Group @cacheControl(maxAge: 5000)
  hierarchy: Hierarchy @cacheControl(maxAge: 5000)
}

type Element {
  code: String,
  label: String
}

type Variable {
  code: String
  label: String
  type: String
  sql_type: String
  description: String
  methodology: String,
  enumerations: [Element]
}

type Group {
  code: String
  label: String
  variables: [Variable]
  groups: [Group]
}

type Hierarchy {
   groups: [Group]
   variables: [Variable]
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
