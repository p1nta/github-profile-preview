import { useEffect, useState } from 'react';

import { useLazyQuery } from '@apollo/client';

import { GET_USER_LANGUAGES } from '../graphql/queries';


export interface ILanguage {
  node: {
    name: string;
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

export const useApiLanguages = (username: string) => {
  const [languagePercentages, setLanguagePercentages] = useState<Record<string, string>>({});

  const [fetchLanguages, { loading, error }] = useLazyQuery<IQueryData, IQueryVars>(GET_USER_LANGUAGES, {
    onCompleted: (data) => calculateLanguagePercentages(data.user),
  });

  const calculateLanguagePercentages = async (data: IData) => {
    const allLanguages = new Map<string, number>();
    let totalSize = 0;
    let hasNextPage = true;
    let afterCursor: string | null = null;

    while (hasNextPage) {
      const repositories = data.repositories.nodes;

      repositories.forEach(repo => {
        repo.languages.edges.forEach(lang => {
          totalSize += lang.size;

          if (allLanguages.has(lang.node.name)) {
            allLanguages.set(lang.node.name, allLanguages.get(lang.node.name)! + lang.size);
          } else if (lang.size){
            console.log(lang.node.name, lang.size);
            
            allLanguages.set(lang.node.name, lang.size);
          }
        });
      });

      const pageInfo = data.repositories.pageInfo;
      hasNextPage = pageInfo.hasNextPage;
      afterCursor = pageInfo.endCursor;

      // If there's more data, fetch again with the updated cursor
      if (hasNextPage) {
        const { data: newData } = await fetchLanguages({ variables: { username, after: afterCursor } });
        if (newData) {
          calculateLanguagePercentages(newData.user);
        }
      }
    }

    // Calculate percentages
    const newLanguagePercentages: Record<string, string> = {};
    allLanguages.forEach((size, language) => {
      newLanguagePercentages[language] = ((size / totalSize) * 100).toFixed(2) + '%';
    });

    setLanguagePercentages(newLanguagePercentages);
  };

  useEffect(() => {
    fetchLanguages({ variables: { username, after: null } })
  }, [username])

  return {
    languagePercentages,
    languageLoading: loading,
    languageError: error,
  }
}