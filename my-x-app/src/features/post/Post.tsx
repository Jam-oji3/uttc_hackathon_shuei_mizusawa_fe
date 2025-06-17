import { PostData } from '@/types/PostData';
import { MediaPreview } from '../media/components/MediaPreview';
import styles from './Post.module.css';
import { FaRegComment, FaRetweet, FaHeart, FaLink } from 'react-icons/fa';
import { usePostActions } from './hooks/usePostActions';

// 時間表示フォーマット関数
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
  const {
    likes,
    liked,
    toggleLike,
    reposts,
    reposted,
    toggleRepost,
  } = usePostActions(post.id, post.stats.likes, false, post.stats.reposts, false);
  return (
    <div className={styles.post}>
      <div className={styles.avatarContainer}>
        <img 
          src={post.author.iconUrl} 
          alt={`${post.author.displayName}のアイコン`} 
          className={styles.avatar} 
        />
      </div>
      <div className={styles.mainContent}>
        <div className={styles.header}>
          <span className={styles.authorName}>{post.author.displayName}</span>
          <span className={styles.username}>@{post.author.username}</span>
          <span className={styles.separator}>·</span>
          <span className={styles.createdAt}>{formatTimeAgo(post.createdAt)}</span>
        </div>
        <p className={styles.content}>{post.text}</p>
        <div>
          {post.mediaUrl && post.mediaType && (
            <MediaPreview url={post.mediaUrl} type={post.mediaType} />
          )}
        </div>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <FaRegComment />
            <span>{post.stats.comments}</span>
          </div>
          <div className={styles.statItem} onClick={toggleRepost}>
            <FaRetweet color={reposted ? '#00ba7c' : undefined}/>
            <span>{reposts}</span>
          </div>
          <div className={styles.statItem} onClick={toggleLike}>
            <FaHeart color={liked ? '#f91880' : undefined} />
            <span>{likes}</span>
          </div>
          <div className={styles.statItem}>
            <FaLink />
          </div>
        </div>
      </div>
    </div>
  );
};
