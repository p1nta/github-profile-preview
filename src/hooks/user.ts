import { useQuery } from '@apollo/client';

import { GET_USER_DATA } from '../graphql/queries';

interface IRepository {
  name: string;
  url: string;
  updatedAt: string;
}

interface IOrganization {
  name: string;
  login: string;
}

interface IUser {
  name: string;
  login: string;
  avatarUrl: string;
  bio?: string;
  createdAt: string;
  repositories: {
    totalCount: number;
    nodes: IRepository[];
  };
  organizations: {
    nodes: IOrganization[];
  };
}

interface IQueryData {
  user: IUser;
}

interface IQueryVars {
  username: string;
}

export const useUser = (username: string) => {
  return useQuery<IQueryData, IQueryVars>(GET_USER_DATA, {
    variables: { username: username as string },
  });
}