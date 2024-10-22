import React from 'react';
import { formatNumber } from '../common';

export const PercentageUnderline = ({value, percentage}) => {
  // Clamp percentage to ensure it's between 0 and 100
  const widthPercentage = Math.min(Math.max(percentage, 0), 100);
  return (
    
    <div className="flex flex-col items-start cursor-pointer"
      title={`Margin Utilization: ${widthPercentage}%`}
    >
      <span className="leading-none">{formatNumber(value)}</span>
      {/* <div className="h-1 rounded-full" style={{ width: `${widthPercentage}%`, backgroundColor: '#2B908F' }}></div> */}
    <div class="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700 " role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
    <div class="flex flex-col justify-center rounded-full overflow-hiddentext-xs text-white text-center whitespace-nowrap" style={{ width: `${widthPercentage}%`, backgroundColor: '#2B908F'}}></div>
    </div>
    </div>
  );
};