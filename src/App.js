import React from 'react';
import './App.css';
import { JoinList } from './components/JoinList';
import CreateList from './pages/CreateList/CreateList';

function App() {
  return (
    <main>
      <h1>Welcome to our Smart Shopping List!</h1>
      <CreateList />
      <p>- or -</p>
      <JoinList />
    </main>
  );
}

export default App;
