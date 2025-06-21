import Sidebar from '../layouts/Sidebar';
import TrendBar from '../layouts/TrendBar';
import SearchContent from '../layouts/SearchContent';
import { useParams } from 'react-router-dom';

function SearchPage() {
  return (
    <div className="mainLayout">
      <Sidebar />
      <SearchContent />
      <TrendBar />
    </div>
  );
}

export default SearchPage;
