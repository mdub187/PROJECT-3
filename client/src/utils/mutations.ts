import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedResources {
          resourceId
          title
          description
          url
        }
      }
    }
  }
`;

export const SAVED_RESOURCE = gql`
  mutation saveResource(
    $description: String!
    $resourceId: String!
    $title: String!
    $url: String
  ) {
    saveResource(
      description: $description
      resourceId: $resourceId
      title: $title
      url: $url
    ) {
      _id
      username
      email
      savedResources {
        resourceId
        title
        description
        url
      }
    }
  }
`;

export const DELETE_RESOURCE = gql`
  mutation DeleteResource($resourceId: String!) {
    deleteResource(resourceId: $resourceId) {
      _id
      username
      email
      savedResources {
        resourceId
        title
        description
        url
      }
    }
  }
`;

export const CREATE_RESOURCE = gql`
  mutation createResource(
    $title: String!
    $description: String!
    $category: String!
    $url: String
  ) {
    createResource(
      title: $title
      description: $description
      category: $category
      url: $url
    ) {
      resourceId
      title
      category
      description
      url
    }
  }
`;
