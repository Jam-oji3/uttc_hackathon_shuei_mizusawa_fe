// src/App.tsx
import React from 'react';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div>
      <Sidebar />
      <main style={{ marginLeft: '240px', padding: '2rem' }}>
        <h1>コンテンツエリア</h1>
      </main>
    </div>
  );
}

export default App;
