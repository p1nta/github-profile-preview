import { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';

import { GET_USER_LANGUAGES } from '../graphql/queries';


export interface ILanguage {
  node: {
    name: string;
    color: string;
  }
  size: number;
}

export interface IRepository {
  languages: {
    edges: ILanguage[];
  };
}

export interface IData {
  repositories: {
    nodes: IRepository[];
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

interface IQueryData {
  user: IData;
}

interface IQueryVars {
  username: string;
  after: string | null;
}

export const useLanguages = (username: string) => {
  const [languagePercentages, setLanguagePercentages] = useState<Array<[string, { size: number; color: string; }]>>([]);

  const [fetchLanguages, { loading, error }] = useLazyQuery<IQueryData, IQueryVars>(GET_USER_LANGUAGES, {
    onCompleted: (data) => countLanguages(data.user),
  });

  const allLanguages = new Map<string, { size: number; color: string; }>();
  let totalSize = 0;

  const calculateLanguagePercentages = () => {
    const newLanguagePercentages: Array<[string, { size: number; color: string; }]> = [];

    allLanguages.forEach((value, language) => {
      const percent = (value.size / totalSize) * 100;

      if (percent >= 0.01) {
        newLanguagePercentages.push([language, { size: percent, color: value.color }]);
      }
    });

    const result = newLanguagePercentages.sort((a, b) => b[1].size - a[1].size);

    setLanguagePercentages(result);
  }

  const countLanguages = async (data: IData) => {
    const repositories = data.repositories.nodes;

    repositories.forEach(repo => {
      repo.languages.edges.forEach(lang => {
        totalSize += lang.size;

        if (allLanguages.has(lang.node.name)) {
          allLanguages.set(
            lang.node.name,
            {
              size: allLanguages.get(lang.node.name)!.size + lang.size,
              color: lang.node.color,
            }
          );
        } else if (lang.size) {
          allLanguages.set(
            lang.node.name,
            {
              size: lang.size,
              color: lang.node.color,
            }
          );
        }
      });
    });

    const hasNextPage = data.repositories.pageInfo.hasNextPage;
    const afterCursor = data.repositories.pageInfo.endCursor;

    // If there's more data, fetch again with the updated cursor
    if (hasNextPage) {
      const { data: newData } = await fetchLanguages({ variables: { username, after: afterCursor } });
      if (newData) {
        return countLanguages(newData.user);
      }
    } else {
      calculateLanguagePercentages()
    }
  };

  useEffect(() => {
    fetchLanguages({ variables: { username, after: null } })
  }, [username])
  
  return {
    languagePercentages,
    loading,
    error,
  }
}