// import Image from 'next/image'; // この行を削除
import { PostData } from '@/types/PostData';
import styles from './Post.module.css';

// 簡易的な時間表示フォーマット関数 (変更なし)
const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds}秒`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}分`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}時間`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}日`;
};

export const Post = ({ post }: { post: PostData }) => {
  return (
    <div className={styles.post}>
      <div className={styles.avatarContainer}>
        {/* ▼▼▼ ここを <Image> から <img> に変更 ▼▼▼ */}
        <img 
          src={post.author.avatarUrl} 
          alt={`${post.author.name}のアバター`} 
          className={styles.avatar} 
        />
        {/* ▲▲▲ ここまで変更 ▲▲▲ */}
      </div>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <span className={styles.authorName}>{post.author.name}</span>
          <span className={styles.username}>{post.author.username}</span>
          <span className={styles.separator}>·</span>
          <span className={styles.createdAt}>{formatTimeAgo(post.createdAt)}</span>
        </div>
        <p className={styles.content}>{post.content}</p>
        <div className={styles.stats}>
          {/* ... (変更なし) */}
          <div className={styles.statItem}>
            <span>💬</span>
            <span>{post.stats.comments}</span>
          </div>
          <div className={styles.statItem}>
            <span>🔁</span>
            <span>{post.stats.reposts}</span>
          </div>
          <div className={styles.statItem}>
            <span>❤️</span>
            <span>{post.stats.likes}</span>
          </div>
           <div className={styles.statItem}>
            <span>🔗</span>
          </div>
        </div>
      </div>
    </div>
  );
};