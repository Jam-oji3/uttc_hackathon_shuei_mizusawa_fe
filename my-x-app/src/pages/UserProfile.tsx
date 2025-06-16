import Sidebar from '../layouts/Sidebar';
import Searchbar from '../layouts/Searchbar';
import {ProfileContent } from '../layouts/ProfileContent';

function UserProfile() {
  return (
    <div className="mainLayout">
      <Sidebar />
      <ProfileContent />
      <Searchbar />
    </div>
  );
}

export default UserProfile;
