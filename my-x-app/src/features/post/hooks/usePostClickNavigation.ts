import { useNavigate } from 'react-router-dom';

export const usePostClickNavigation = (postId: string) => {
  const navigate = useNavigate();

  const handlePostClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (
      target.closest('[data-non-navigable]') ||
      target.tagName === 'svg' ||
      target.closest('svg')
    ) {
      return;
    }

    navigate(`/posts/${postId}`);
  };

  return { handlePostClick };
};
