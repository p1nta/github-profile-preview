import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
  query getUserData($username: String!) {
    user(login: $username) {
      name
      login
      avatarUrl
      bio
      createdAt
      repositories(first: 10, orderBy: { field: UPDATED_AT, direction: DESC }) {
        totalCount
        nodes {
          name
          url
          updatedAt
        }
      }
      organizations(first: 10) {
        nodes {
          name
          login
        }
      }
    }
  }
`;


export const GET_USER_LANGUAGES = gql`
query($username: String!, $after: String) {
  user(login: $username) {
    repositories(first: 100, after: $after) {
      nodes {
        languages(first: 10) {
          edges {
            node {
              name
            }
            size
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;