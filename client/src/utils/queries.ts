import { gql } from "@apollo/client";

export const SEARCH_RESOURCES = gql`
  query SearchResources($searchTerm: String!) {
    searchResources(searchTerm: $searchTerm) {
      resourceId
      title
      description
      url
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query GetMe {
    getSingleUser {
      username
      _id
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
