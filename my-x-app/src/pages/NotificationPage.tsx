import Sidebar from '../layouts/Sidebar';
import TrendBar from '../layouts/TrendBar';
import { NotificationContent } from '../layouts/NotificationContent';

function NotificationPage() {
  return (
    <div className="mainLayout">
      <Sidebar />
      <NotificationContent />
      <TrendBar />
    </div>
  );
}

export default NotificationPage;
