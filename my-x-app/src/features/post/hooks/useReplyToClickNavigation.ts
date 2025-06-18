import { useNavigate } from 'react-router-dom';

export const useReplyToClickNavigation = (replyTo: string) => {
  const navigate = useNavigate();

  const handleReplyToClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // 投稿の親クリックイベントを止める
    navigate(`/posts/${replyTo}`); // 返信先のポスト詳細ページへ遷移
  };

  return { handleReplyToClick };
};
