import Sidebar from '../layouts/Sidebar';
import TrendBar from '../layouts/TrendBar';
import { HomeTimeline } from '../layouts/HomeTimeline';

function Home() {
  return (
    <div className="mainLayout">
      <Sidebar />
      <HomeTimeline />
      <TrendBar />
    </div>
  );
}

export default Home;
