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
        nodes {
          name
          url
          updatedAt
          languages(first: 5) {
            edges {
              node {
                name
              }
            }
          }
        }
      }
    }
  }
`;
