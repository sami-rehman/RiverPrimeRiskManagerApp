import React from 'react';

const StatusIndicator = ({ label, status, latency }) => {
    return (
        <div className="flex flex-col items-center">
            <span className='flex items-center space-x-1'>
                <div className={`w-2 h-2 rounded-full ${status}`} />
                <span className="text-sm font-bold">{label}</span>
            </span>
                <span className="text-xs">RTT: {latency} ms</span>
        </div>
    );
};

export default StatusIndicator;
