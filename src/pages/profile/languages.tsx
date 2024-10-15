import { useTranslation } from 'react-i18next'

import Error from '../../components/error';
import Loading from '../../components/loading';
import { useLanguages } from '../../hooks/languages';

import s from './styles.module.sass'

interface ILanguagesProps {
  username?: string;
}

const Languages: React.FC<ILanguagesProps> = (props) => {
  const { t } = useTranslation();
  const { username } = props;


  const { languagePercentages, loading, error } = useLanguages(username as string)

  if (loading) {
    return (
      <Loading variant="raw" />
    );
  }

  if (error) {
    return (
      <Error variant="raw" message={error?.message} />
    );
  }


  return (
    <>
      <h3 className={s.user_info_raw_title}>
        {t('languagesTitle')}
      </h3>
      <ul className={s.numbered_list}>
        {languagePercentages.map(([language, percent]) => (
          <li
            key={language}
            className={s.numbered_list_item}
          >
            {language}: {`${percent.toFixed(2)}%`}
          </li>
        ))}
      </ul>
    </>
  )
}

export default Languages
