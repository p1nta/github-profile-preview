import { useTranslation } from 'react-i18next'


import s from './styles.module.sass'

interface ILoadingProps {
  variant: 'raw' | 'overlay';
}

const Loading: React.FC<ILoadingProps> = (props) => {
  const { t } = useTranslation();
  const { variant } = props;


  if (variant === 'overlay') {
    return (
      <p className={s.loading_wrapper}>
        {t('loading')}
      </p>
    );
  }

  return (
    <p className={s.loading_wrapper_raw}>
      {t('loading')}
    </p>
  );
}

export default Loading
