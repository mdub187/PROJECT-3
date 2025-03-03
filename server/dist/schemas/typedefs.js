const typeDefs = `
type User {
  _id: ID!
  username: String!
  email: String!
}

type Resource {
  _id: ID!
  title: String!
  description: String!
  url: String
}

type Category {
<<<<<<< Updated upstream
  _id: ID!
  language: String!
  description: String
=======
_id: ID!
language: String!
type: String!
description: String

>>>>>>> Stashed changes
}

type Auth {
  token: String!
  user: User
}

type Query {
  getSingleUser: User
}

type Mutation {
<<<<<<< Updated upstream
  createUser(username: String!, email: String!, password: String!): Auth
  login(email: String!, password: String!): Auth
  deleteResource(_id: ID!): Resource
  createResource(title: String!, description: String!, url: String): Resource
=======
createUser(username: String!, email: String!, password: String!): Auth
login(email: String!, password: String!): Auth
deleteUser: Auth
#updateUser(password: String!): User
>>>>>>> Stashed changes
}
`;
export default typeDefs;
