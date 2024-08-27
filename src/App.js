import React from 'react';
import layouts from './layouts';

const App = () => {
  const renderLayout = () => {
    const LayoutComponent = layouts['LayoutOne'];
    return <LayoutComponent />;
  };

  return (
    <div className="App h-screen flex flex-col overflow-hidden">
      <main className="flex-grow p-2">{renderLayout()}</main>
    </div>
  );
};

export default App;


