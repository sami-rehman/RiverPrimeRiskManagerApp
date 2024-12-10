import React from "react";
import { formatNumber } from "../common";

export const PercentageUnderline = ({ value, percentage }) => {
  const widthPercentage = Math.min(Math.max(percentage, 0), 100);
  return (
    <div className="flex flex-col items-start cursor-pointer"
      title={`Margin Utilization: ${widthPercentage}%`}
    >
      <span className="leading-none">
        $ {formatNumber(value)}
       { percentage > 0 &&
        <span>, 
        <span
          className="leading-none"
          style={{
            fontSize: "80%",
            color: percentage > 90 ? '#e24141' : 'inherit'
          }}
        > ({percentage}%)
        </span>
        </span>
       }
      </span>

      <div className="flex w-full h-0.5 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700 mt-[2px]"
        role="progressbar"
        aria-valuenow={widthPercentage}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="bg-[#47ffa6] h-full"
          style={{
            width: `${Math.min(widthPercentage, 90)}%`,
          }}
        ></div>

        {widthPercentage > 90 && (
          <div className="bg-[#e24141] h-full"
            style={{
              width: `${widthPercentage - 90}%`,
            }}
          ></div>
        )}
      </div>
    </div>
  );
};
