import { PostData } from '@/types/PostData';
import DefaultUserIcon from '../../components/icons/DefaultUserIcon';
import { MediaPreview } from '../media/components/MediaPreview';
import styles from './PostDetail.module.css';
import { FaRegComment, FaRetweet, FaHeart, FaLink, FaTimes } from 'react-icons/fa';
import { usePostActions } from './hooks/usePostActions';
import { useReplyToClickNavigation } from './hooks/useReplyToClickNavigation';

const formatFullDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('ja-JP', {
    year: 'numeric', month: 'long', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

export const PostDetail = ({post}: {post: PostData}) => {
  const {
    likes,
    liked,
    toggleLike,
    reposts,
    reposted,
    toggleRepost,
  } = usePostActions(post.id, post.stats.likes, post.userActions.liked, post.stats.reposts, post.userActions.reposted);

  const { handleReplyToClick } = useReplyToClickNavigation(post.replyTo ?? '');

  return (
    <div className={styles.overlay}>
      <div className={styles.detailContainer}>
        {post.replyTo && 
          <div className={styles.replyInfo}
            onClick={handleReplyToClick}>
            <FaLink className={styles.replyIcon} />
            <span>返信先</span>
          </div>}
        <div className={styles.header}>
          {
            post.author.iconUrl ? 
            <img 
              src={post.author.iconUrl} 
              alt={`${post.author.displayName}のアイコン`} 
              className={styles.avatar} 
            /> : 
            <DefaultUserIcon size={48} alt={`${post.author.displayName}のアイコン`} />
          }
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>{post.author.displayName}</span>
            <span className={styles.username}>@{post.author.username}</span>
          </div>
        </div>
        <p className={styles.content}>{post.text}</p>
        {post.mediaUrl && post.mediaType && (
          <MediaPreview url={post.mediaUrl} type={post.mediaType} />
        )}
        <div className={styles.timestamp}>
          {formatFullDate(post.createdAt)}
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
        </div>
      </div>
    </div>
  );
};
