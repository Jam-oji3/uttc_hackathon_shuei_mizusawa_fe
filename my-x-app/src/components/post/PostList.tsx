import { PostData } from '@/types/PostData';
import { Post } from './Post';
import styles from './PostList.module.css';

export const PostList = ({ posts }: { posts: PostData[] }) => {
  return (
    <div className={styles.postList}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};