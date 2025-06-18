import Sidebar from '../layouts/Sidebar';
import Searchbar from '../layouts/Searchbar';
import { PostDetailView } from '../layouts/PostDetailView';
import { useParams } from 'react-router-dom';

function PostDetailPage() {
  const { postId } = useParams<{ postId: string }>();
  if (!postId) {
    return <div className="error">投稿IDが指定されていません。</div>;
  }
  return (
    <div className="mainLayout">
      <Sidebar />
      <PostDetailView postId={postId} />
      <Searchbar />
    </div>
  );
}

export default PostDetailPage;
