import { useTranslation } from 'react-i18next'


import s from './styles.module.sass'

const Loading: React.FC = () => {
  const { t } = useTranslation();

  return (
    <p className={s.loading_wrapper}>
      {t('loading')}
    </p>
  );
}

export default Loading
