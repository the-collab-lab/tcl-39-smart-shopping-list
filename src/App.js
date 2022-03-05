import React from 'react';
import './App.css';
import { JoinList } from './components/joinList/JoinList';
import CreateList from './pages/CreateList/CreateList';

const App = () => {
  return (
    <main className="App">
      <CreateList />
      <p className="or">- or -</p>
      <JoinList />
    </main>
  );
};

export default App;
