import { PostData } from '@/types/PostData';
import { MediaPreview } from '../media/components/MediaPreview';
import styles from './Post.module.css';
import { FaRegComment, FaRetweet, FaHeart, FaLink } from 'react-icons/fa';
import DefaultUserIcon from '../../components/icons/DefaultUserIcon';
import { usePostActions } from './hooks/usePostActions';
import { usePostClickNavigation } from './hooks/usePostClickNavigation';
import { useUserClickNavigation } from './hooks/useUserClickNavigation';
import { useReplyToClickNavigation } from './hooks/useReplyToClickNavigation';
import { useSpoiler } from './hooks/useSpoiler'; // 作成したフックをインポート

// 時間表示フォーマット関数 (変更なし)
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
  } = usePostActions(post.id, post.stats.likes, post.userActions.liked, post.stats.reposts, post.userActions.reposted);

  // カスタムフックにロジックを移譲
  const { isSpoilerActive, handleRevealSpoiler } = useSpoiler(post.spoilerWord);
  
  const { handlePostClick } = usePostClickNavigation(post.id);
  const { handleUserClick } = useUserClickNavigation(post.author.username);
  const { handleReplyToClick } = useReplyToClickNavigation(post.replyTo ?? '');


  return (
    <div className={styles.postContainer} onClick={isSpoilerActive ? undefined : handlePostClick}>
      
      <div className={`${styles.post} ${isSpoilerActive ? styles.blurred : ''}`}>
        <div className={styles.avatarContainer} onClick={handleUserClick}>
          {
            post.author.iconUrl ? 
            <img 
              src={post.author.iconUrl} 
              alt={`${post.author.displayName}のアイコン`} 
              className={styles.avatar} 
            /> : 
            <DefaultUserIcon size={48} alt={`${post.author.displayName}のアイコン`} />
          }
        </div>
        <div className={styles.mainContent}>
        {
          post.repostedBy &&
          <div className={styles.repostInfo}>
            <FaRetweet className={styles.repostIcon} />
            <span>@{post.repostedBy}さんがリポストしました</span>
          </div>
        }
        {
        post.replyTo && 
          <div className={styles.replyInfo}
            onClick={handleReplyToClick}>
            <FaLink className={styles.replyIcon} />
            <span>返信先</span>
          </div>
        }
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
            <div className={styles.statItem} data-non-navigable>
              <FaRegComment />
              <span>{post.stats.comments}</span>
            </div>
            <div className={styles.statItem} data-non-navigable onClick={(e) => { e.stopPropagation(); toggleRepost(); }}>
              <FaRetweet color={reposted ? '#00ba7c' : undefined}/>
              <span>{reposts}</span>
            </div>
            <div className={styles.statItem} data-non-navigable onClick={(e) => { e.stopPropagation(); toggleLike(); }}>
              <FaHeart color={liked ? '#f91880' : undefined} />
              <span>{likes}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* ネタバレが有効な場合にオーバーレイを表示 */}
      {isSpoilerActive && (
        <div className={styles.spoilerOverlay} onClick={handleRevealSpoiler}>
          <div className={styles.spoilerContent}>
            <span className={styles.spoilerAlertText}>ネタバレを含む可能性があります</span>
            <span className={styles.spoilerWord}>{post.spoilerWord}</span>
            <span className={styles.spoilerClickHint}>クリックして表示</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Post;