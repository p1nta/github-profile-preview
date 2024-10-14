import { useTranslation } from 'react-i18next'

import s from './styles.module.sass'

function Home() {
  const { t } = useTranslation();

  return (
    <div className={s.home_wrapper}>
      {t('homeTitle')}
    </div>
  )
}

export default Home
