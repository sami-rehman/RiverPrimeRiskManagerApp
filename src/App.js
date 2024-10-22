import React, { useState } from 'react';
import './App.css';
import Header from './Header';
import layouts from './layouts';
// import WatchList from './WatchlistGrid';

import "ag-grid-enterprise";
import { LicenseManager } from "ag-grid-enterprise";
  LicenseManager.setLicenseKey(
    "Using_this_{AG_Grid}_Enterprise_key_{AG-063926}_in_excess_of_the_licence_granted_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_changing_this_key_please_contact_info@ag-grid.com___{River_Prime}_is_granted_a_{Single_Application}_Developer_License_for_the_application_{River_Prime}_only_for_{1}_Front-End_JavaScript_developer___All_Front-End_JavaScript_developers_working_on_{River_Prime}_need_to_be_licensed___{River_Prime}_has_been_granted_a_Deployment_License_Add-on_for_{1}_Production_Environment___This_key_works_with_{AG_Grid}_Enterprise_versions_released_before_{23_July_2025}____[v3]_[01]_MTc1MzIyNTIwMDAwMA==1200d27c6f62377b36b8f92b7c13fe53"
  );

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

  const [layout, setLayout] = useState('LayoutOne');

  const renderLayout = () => {
    const LayoutComponent = layouts[layout];
    return <LayoutComponent />;
  };

  return (
    <div className="App h-screen flex flex-col overflow-hidden">
      <Header setLayout={setLayout} />
      <main className="flex-grow p-2">{renderLayout()}</main>
    </div>
  );
};

export default App;


