import { useState, useCallback } from 'react';

export const useSpoiler = (spoilerWord?: string | null) => {
  const [isSpoilerRevealed, setIsSpoilerRevealed] = useState(false);
  const isSpoilerActive = !!spoilerWord && !isSpoilerRevealed;
  const handleRevealSpoiler = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSpoilerRevealed(true);
  }, []); 

  return {
    isSpoilerActive,
    handleRevealSpoiler,
  };
};