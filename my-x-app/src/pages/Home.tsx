// src/App.tsx
import Sidebar from '../layouts/Sidebar';
import Searchbar from '../layouts/Searchbar';

function Home() {
  return (
    <div className="mainLayout">
      <Sidebar />
      <Searchbar />
    </div>
  );
}

export default Home;
