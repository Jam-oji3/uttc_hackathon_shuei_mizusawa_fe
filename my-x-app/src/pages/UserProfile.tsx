import Sidebar from '../layouts/Sidebar';
import Searchbar from '../layouts/Searchbar';
import {ProfileContent } from '../layouts/ProfileContent';
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { username }  = useParams<{ username: string }>();
  return (
    <div className="mainLayout">
      <Sidebar />
      {username ? <ProfileContent username={username}/> : <div className="error">ユーザー名が指定されていません。</div>}
      <Searchbar />
    </div>
  );
}

export default UserProfile;
