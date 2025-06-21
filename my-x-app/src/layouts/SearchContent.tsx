'use client';

import { useState } from 'react';
import { PostList } from '../features/post/components/PostList';
import styles from './SearchContent.module.css';
import { useSearchPosts } from '../features/post/hooks/useSearchPosts';
import { useAuthContext } from '../contexts/AuthContext';
import BackHeader from '../components/header/BackHeader';
import { SearchBox } from '../features/post/components/SearchBox';
import { useNavigate } from 'react-router-dom';

export const SearchContent = () => {
  const { user, isLoading: isAuthLoading } = useAuthContext();
  const { posts, loading, error, keyword } = useSearchPosts(20, 0);
  const [inputValue, setInputValue] = useState(keyword);
  const navigate = useNavigate();

  const handleSubmit = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      navigate(`/posts/search?q=${trimmed}`);
    }
  };

  if (isAuthLoading) {
    return <div className={styles.loading}>認証情報を確認中...</div>;
  }

  if (!user) {
    return <div className={styles.error}>ログインして検索を利用してください。</div>;
  }

  return (
    <div className={styles.searchContent}>
      <BackHeader title="投稿を検索" />
      <SearchBox value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} />

      <div className={styles.scrollArea}>
        {loading && <div className={styles.loading}>検索中...</div>}
        {error && <div className={styles.error}>検索に失敗しました: {error}</div>}
        {!loading && keyword && (!posts || posts.length === 0) && (
          <div className={styles.noResult}>該当する投稿が見つかりませんでした。</div>
        )}
        {!loading && !error && posts.length > 0 && <PostList posts={posts} />}
      </div>
    </div>
  );
};

export default SearchContent;
