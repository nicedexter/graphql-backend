import { makeExecutableSchema, addMockFunctionsToSchema } from "graphql-tools";
import resolvers from "./resolvers";

const typeDefs = `
type Query {
  variables: [Variable]
  groups: Group
  hierarchy: Hierarchy
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
  group: Element
  isVariable: Boolean
}

type Group {
  code: String
  label: String
  groups: [Group]
}

type Hierarchy {
   groups: [Group]
   variables: [Variable]
}

`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
