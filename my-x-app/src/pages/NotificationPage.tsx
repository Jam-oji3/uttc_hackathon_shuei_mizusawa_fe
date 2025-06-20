import Sidebar from '../layouts/Sidebar';
import Searchbar from '../layouts/Searchbar';
import { NotificationContent } from '../layouts/NotificationContent';

function NotificationPage() {
  return (
    <div className="mainLayout">
      <Sidebar />
      <NotificationContent />
      <Searchbar />
    </div>
  );
}

export default NotificationPage;
