import React from 'react';

export const ProgressBarRenderer = (props) => {
  const value = props.value || 0;
  const maxValue = props.maxValue || 100;

  const percentage = (value / maxValue) * 100;

  return (
    <div className="relative w-full">
      {value < 101 && (
        <div className="w-full bg-gray-300 rounded">
          <div
            className="bg-green-500 text-xs font-medium text-white text-center p-0.5 leading-none rounded"
            style={{ width: `${percentage}%` }}
          >
            {Number(value).toFixed(2)}
          </div>
        </div>
      )}
    </div>
  );
};
