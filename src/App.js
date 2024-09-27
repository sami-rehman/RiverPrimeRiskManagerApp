import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import layouts from './layouts';
import InnerHeader from './InnerHeader';
import WatchList from './WatchlistGrid';

const App = () => {

  // Add this somewhere in your entry point file (e.g., index.js)
const resizeObserverLoopErr = /^ResizeObserver loop limit exceeded/;
const originalConsoleError = console.error;

console.error = (...args) => {
  if (args[0] && resizeObserverLoopErr.test(args[0].message)) {
    return;
  }
  originalConsoleError(...args);
};

  const [layout, setLayout] = useState('LayoutThree');

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


