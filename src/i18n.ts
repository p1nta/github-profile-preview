import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          homeTitle: 'GitHub profile preview',
          inputPlaceholder: 'Enter GitHub username',
          submitButton: 'Submit',

          repos: 'Public Repos {{count}}',
          createdAt: 'Member Since: {{createdAt}}',
          updatedAt: 'UpdatedAt: {{updatedAt}}',
          organizationsTitle: 'Organizations:',
          repositoriesTitle: 'Recent Repositories:',
          languagesTitle: 'Languages:',

          loading: 'Loading...',
          error: 'Error: {{message}}',
          userNotFound: 'User not found',
        },
      },
    },
  });

export {
  i18n,
};
