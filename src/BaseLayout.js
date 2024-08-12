import React from 'react';

const BaseLayout = ({ children, cols, rows }) => (
    <div className={`grid grid-cols-${cols} grid-rows-${rows} gap-2 w-full h-full overflow-hidden`}>
        {/* <div className={`grid grid-cols-12 grid-rows-12 gap-2 w-full h-full overflow-hidden`}> */}
        {children}
    </div>
);

export default BaseLayout;
