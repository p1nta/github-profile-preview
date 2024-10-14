import { useTranslation } from 'react-i18next'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import s from './styles.module.sass'

function Home() {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username) {
      navigate(`/${username}`);
    }
  };

  return (
    <div className={s.home_wrapper}>
      <h1>
        {t('homeTitle')}
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={t('inputPlaceholder')}
          className={s.nickname_input}
        />
        <button
          type="submit"
          className={s.submit_button}
          disabled={!username}
        >
          {t('submitButton')}
        </button>
      </form>
    </div>
  )
}

export default Home
