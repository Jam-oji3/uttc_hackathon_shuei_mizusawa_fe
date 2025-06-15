import Sidebar from '../layouts/Sidebar';
import Searchbar from '../layouts/Searchbar';
import { HomeTimeline } from '../layouts/HomeTimeline';

function Home() {
  return (
    <div className="mainLayout">
      <Sidebar />
      <HomeTimeline />
      <Searchbar />
    </div>
  );
}

export default Home;
