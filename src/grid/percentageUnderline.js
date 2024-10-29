import React from "react";
import { formatNumber } from "../common";

export const PercentageUnderline = ({ value, percentage }) => {
  const widthPercentage = Math.min(Math.max(percentage, 0), 100);
  return (
  <div className="flex flex-col items-start cursor-pointer"
  title={`Margin Utilization: ${widthPercentage}%`}
>
  <span className="leading-none">${formatNumber(value)}</span>

  <div className="flex w-full h-1 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
    role="progressbar"
    aria-valuenow={widthPercentage}
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div className="bg-[#2B908F] h-full"
      style={{
        width: `${Math.min(widthPercentage, 90)}%`,
      }}
    ></div>
    
    {widthPercentage > 90 && (
      <div className="bg-red-500 h-full"
        style={{
          width: `${widthPercentage - 90}%`,
        }}
      ></div>
    )}
  </div>
</div>
  );
};
