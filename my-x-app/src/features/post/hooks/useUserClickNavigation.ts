import { useNavigate } from 'react-router-dom';

export const useUserClickNavigation = (username: string) => {
  const navigate = useNavigate();

  const handleUserClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // 投稿の親クリックイベントを止める

    const target = e.target as HTMLElement;
    // もし非ナビゲーション領域（例: svgなど）があれば無視（必要なら調整してください）
    if (
      target.closest('[data-non-navigable]') ||
      target.tagName === 'svg' ||
      target.closest('svg')
    ) {
      return;
    }

    navigate(`/user/${username}`);
  };

  return { handleUserClick };
};
