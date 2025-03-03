const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
}

type Resource {
  resourceId: ID!
  title: String!
  description: String!
  url: String
}

type Category {
  categoryId: ID!
  language: String!
  description: String
}

type Auth {
  token: String!
  user: User
}

type Query {
  getSingleUser: User
  getResource(_id: ID!): Resource
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  deleteUser: Auth
  updateUser(username: String, email: String, password: String): Auth

  deleteResource(_id: ID!): Resource
  createResource(title: String!, description: String!, url: String): Resource
  
}
`;

export default typeDefs;
