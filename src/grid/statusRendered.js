import React from 'react';

export const  StatusRender = (params) => (
    <span className="missionSpan">
        {
            <img
                alt={`${params.value}`}
                src={`https://www.ag-grid.com/example-assets/icons/${
                    params.value === 'Active' ? 'tick-in-circle' : 'cross-in-circle'
                }.png`}
                className="missionIcon"
            />
        }
    </span>
);
