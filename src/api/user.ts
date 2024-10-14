import { useQuery } from '@apollo/client';

import { GET_USER_DATA } from '../graphql/queries';


interface ILanguage {
  node: {
    name: string;
  };
}

interface IRepository {
  name: string;
  url: string;
  updatedAt: string;
  languages: {
    edges: ILanguage[];
  };
}

interface IUser {
  name: string;
  login: string;
  avatarUrl: string;
  bio?: string;
  createdAt: string;
  repositories: {
    nodes: IRepository[];
  };
}

interface IQueryData {
  user: IUser;
}

interface IQueryVars {
  username: string;
}

export const useApiUser = (username: string) => {
  return useQuery<IQueryData, IQueryVars>(GET_USER_DATA, {
    variables: { username: username as string },
  });
}