// App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UserProfile from './pages/UserProfile';
import PostDetailPage from './pages/PostDetailPage';
import NotificationPage from './pages/NotificationPage';
import './App.css';
import SearchPage from './pages/SearchPage';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/home" element={<Home />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/users/:username" element={<UserProfile />} />
      <Route path="/posts/:postId" element={<PostDetailPage />} />
      <Route path="/notifications" element={<NotificationPage />} />
      <Route path="/posts/search" element={<SearchPage/>}/>

    </Routes>
  );
};

export default App;
