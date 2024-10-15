import { useTranslation } from 'react-i18next'


import s from './styles.module.sass'


interface IErrorProps {
  message?: string;
  variant: 'raw' | 'overlay';
}

const Error: React.FC<IErrorProps> = (props) => {
  const { variant, message } = props;
  const { t } = useTranslation();

  if (variant === 'overlay') {
    return (
      <p className={s.error_wrapper}>
        {t('error', { message })}
      </p>
    );
  }

  return (
    <p className={s.error_wrapper_raw}>
    {t('error', { message })}
  </p>
  );
}

export default Error
