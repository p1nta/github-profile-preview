import { useParams } from 'react-router-dom';

import { useApiUser } from '../../api/user';
import { useApiLanguages } from '../../api/languages';

import s from './styles.module.sass'

function Profile() {
  const { username } = useParams<{ username: string }>();

  const { loading, error, data } = useApiUser(username as string);

  const { languagePercentages, languageLoading, languageError } = useApiLanguages(username as string)

  if (loading || languageLoading) return <p> Loading... </p>;
  if (error || languageError) return <p> Error: {error?.message || languageError?.message} </p>;
  if (!data || !data.user) return <p> User not found </p>;

  const { user } = data;

  console.log(languagePercentages);
  

  return (
    <div className={s.profile_wrapper}>
      <h2 className={s.user_name}>
        {user.name || user.login}
      </h2>
      <hr/>

      <p className={s.user_info_raw}>
        Public Repos: {user.repositories.totalCount}
      </p>
      <hr/>

      <p className={s.user_info_raw}>
        Member Since: {new Date(user.createdAt).toLocaleDateString()}
      </p>
      <hr/>

      <h3 className={s.user_info_raw}>
        Organizations:
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
      <hr/>

      <h3 className={s.user_info_raw}>
        Recent Repositories:
      </h3>
      <ul className={s.numbered_list}>
        {user.repositories.nodes.map((repo) => (
          <li
            key={repo.name}
            className={s.numbered_list_item}
          >
            <a href={repo.url} target="_blank" rel="noreferrer">
              {repo.name}
            </a> - Updated {new Date(repo.updatedAt).toLocaleDateString()}
          </li>
        ))}
      </ul>

      <h3 className={s.user_info_raw}>
        Languages:
      </h3>
        <ul>
          {Object.entries(languagePercentages).map(([language, percentage]) => (
            <li key={language}>
              {language}: {percentage}
            </li>
          ))}
        </ul>

    </div>
  )
}

export default Profile
