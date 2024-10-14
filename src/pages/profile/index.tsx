import { useParams } from 'react-router-dom';

import { useApiUser } from '../../api/user';

import s from './styles.module.sass'

function Profile() {
  const { username } = useParams<{ username: string }>();

  const { loading, error, data } = useApiUser(username as string);

  if (loading) return <p> Loading... </p>;
  if (error) return <p> Error: {error.message} </p>;
  if (!data || !data.user) return <p> User not found </p>;

  const { user } = data;

  return (
    <div className={s.profile_wrapper}>
      <h2>
        {user.name || user.login}
      </h2>
      <p>
        Public Repos: {user.repositories.nodes.length}
      </p>
      <p>
        Member Since: {new Date(user.createdAt).toLocaleDateString()}
      </p>

      <h3>
        Recent Repositories:
      </h3>
      <ul>
        {user.repositories.nodes.map((repo) => (
          <li key={repo.name}>
            <a href={repo.url} target="_blank" rel="noreferrer">
              {repo.name}
            </a> - Updated {new Date(repo.updatedAt).toLocaleDateString()}
            <p>
              Languages: {repo.languages.edges.map((lang) => lang.node.name).join(', ')}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Profile
