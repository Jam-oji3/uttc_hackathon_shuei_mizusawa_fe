import { PostData } from '@/types/PostData';
import { Post } from './Post';
import styles from './PostList.module.css';

export const PostList = ({ posts }: { posts: PostData[] | null }) => {
  return (
    <div className={styles.postList}>
      {posts && posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};