import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import layouts from './layouts';
import InnerHeader from './InnerHeader';
import WatchList from './WatchlistGrid';

const App = () => {
  const [layout, setLayout] = useState('LayoutOne');

  const renderLayout = () => {
    const LayoutComponent = layouts[layout];
    return <LayoutComponent />;
  };

  return (
    <div className="App h-screen flex flex-col overflow-hidden">
      <Header setLayout={setLayout} />
      {/* <InnerHeader /> */}
            <main className="flex-grow p-2">{renderLayout()}</main>
    </div>
  );
};

export default App;


