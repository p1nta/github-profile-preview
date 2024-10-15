import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

import Error from '../../components/error';
import Loading from '../../components/loading';
import { useUser } from '../../hooks/user';
import Languages from './languages'

import s from './styles.module.sass'

function Profile() {
  const { t } = useTranslation();
  const { username } = useParams<{ username: string }>();

  const { loading, error, data } = useUser(username as string);

  if (loading) {
    return (
      <Loading variant="overlay" />
    );
  }

  if (error) {
    return (
      <Error variant="overlay" message={error?.message} />
    )
  }

  if (!data || !data.user) {
    return (
      <Error variant="overlay" message={t('userNotFound')} />
    )
  }

  const { user } = data;

  return (
    <div className={s.profile_wrapper}>
      <h2 className={s.user_name}>
        {user.name || user.login}
      </h2>
      <hr />

      <p className={s.user_info_raw}>
        <span className={s.user_info_raw_title}>
          {t('repos')}
        </span>
        {user.repositories.totalCount}
      </p>
      <hr />

      <p className={s.user_info_raw}>
        <span className={s.user_info_raw_title}>
          {t('createdAt')}
        </span>
        {new Date(user.createdAt).toLocaleDateString()}
      </p>
      <hr />

      <h3 className={s.user_info_raw_title}>
        {t('organizationsTitle')}
      </h3>
      <ul className={s.numbered_list}>
        {data.user.organizations.nodes.map((org) => (
          <li
            key={org.login}
            className={s.numbered_list_item}
          >
            {org.name} ({org.login})
          </li>
        ))}
      </ul>
      <hr />

      <h3 className={s.user_info_raw_title}>
        {t('repositoriesTitle')}
      </h3>
      <ul className={s.numbered_list}>
        {user.repositories.nodes.map((repo) => (
          <li
            key={repo.name}
            className={s.numbered_list_item}
          >
            <a href={repo.url} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
            <br />
            <span>
              {t('updatedAt', { updatedAt: new Date(repo.updatedAt).toLocaleDateString() })}
            </span>
          </li>
        ))}
      </ul>
      <hr />

      <Languages username={username} />

    </div>
  )
}

export default Profile
