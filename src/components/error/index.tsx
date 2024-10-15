import { useTranslation } from 'react-i18next'


import s from './styles.module.sass'


interface IErrorProps {
  message?: string;
}

const Error: React.FC<IErrorProps> = (props) => {
  const { message } = props;
  const { t } = useTranslation();

  return (
    <p className={s.error_wrapper}>
      {t('error', { message })}
    </p>
  );
}

export default Error
