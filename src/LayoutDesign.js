import React, { useState } from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer
} from 'recharts';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';

const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 4567, amt: 2400 },
    { name: 'Page C', uv: 200, pv: 1398, amt: 2400 },
    { name: 'Page D', uv: 278, pv: 9800, amt: 2400 },
    { name: 'Page E', uv: 189, pv: 3908, amt: 2400 },
    { name: 'Page F', uv: 239, pv: 4800, amt: 2400 },
    { name: 'Page G', uv: 349, pv: 4300, amt: 2400 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const LayoutDesign = () => {
    const [mainLayout, setMainLayout] = useState('layout0');
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [sectionLayouts, setSectionLayouts] = useState({
        section1: { layout: 'layout0', chartTypes: ['line'] },
        section2: { layout: 'layout0', chartTypes: ['line'] },
        section3: { layout: 'layout0', chartTypes: ['line'] },
        section4: { layout: 'layout0', chartTypes: ['line'] }
    });

    const selectLayout = (layout) => {
        setMainLayout(layout);
        if (layout === 'layout0') {
            setSectionLayouts({
                section1: { layout: 'layout0', chartTypes: ['line'] },
                section2: { layout: 'layout0', chartTypes: ['line'] },
                section3: { layout: 'layout0', chartTypes: ['line'] },
                section4: { layout: 'layout0', chartTypes: ['line'] }
            });
        }
    };

    const toggleDropdown = (sectionId) => {
        setActiveDropdown(activeDropdown === sectionId ? null : sectionId);
    };

    const selectSubLayout = (sectionId, layout) => {
        setSectionLayouts((prev) => ({
            ...prev,
            [sectionId]: {
                ...prev[sectionId],
                layout: layout,
                chartTypes: Array(layout.length).fill('line') // Initialize all sub-charts to 'line' type
            }
        }));
        setActiveDropdown(null);
    };

    const selectChartType = (sectionId, chartIndex, type) => {
        setSectionLayouts((prev) => {
            const newChartTypes = [...prev[sectionId].chartTypes];
            newChartTypes[chartIndex] = type;
            return {
                ...prev,
                [sectionId]: {
                    ...prev[sectionId],
                    chartTypes: newChartTypes
                }
            };
        });
    };

    const renderLayout = (layout) => {
        const layouts = {
            'layout0': ['section1'],
            'layout1': ['section1', 'section2', 'section3'],
            'layout2': ['section1', 'section2'],
            'layout3': ['section1', 'section2', 'section3'],
        };

        return (
            <div className={`grid h-full gap-2 ${layout === 'layout2' ? 'flex-col' : layout === 'layout3' ? 'grid-cols-3' : layout === 'layout1' ? 'grid-cols-2' : ''}`}>
                {layouts[layout].map((sectionId) => (
                    <Section
                        key={sectionId}
                        id={sectionId}
                        layout={sectionLayouts[sectionId].layout}
                        chartTypes={sectionLayouts[sectionId].chartTypes}
                        toggleDropdown={toggleDropdown}
                        activeDropdown={activeDropdown}
                        selectSubLayout={selectSubLayout}
                        selectChartType={selectChartType}
                        disableDropdown={layout === 'layout0'}
                    />
                ))}
            </div>
        );
    };

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-100">
            <div className="flex-shrink-0 p-2">
                <h2 className="text-xl font-bold mb-2">Select Main Layout</h2>
                <div className="relative inline-block text-left">
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        onChange={(e) => selectLayout(e.target.value)}
                    >
                        <option value="layout0">Free Style</option>
                        <option value="layout1">Layout 1</option>
                        <option value="layout2">Layout 2</option>
                        <option value="layout3">Layout 3</option>
                    </select>
                </div>
            </div>
            <div className="flex-1 overflow-auto">
                {renderLayout(mainLayout)}
            </div>
        </div>
    );
};

const Section = ({ id, layout, chartTypes, toggleDropdown, activeDropdown, selectSubLayout, selectChartType, disableDropdown }) => {
    const isDropdownOpen = activeDropdown === id;
    const layouts = ['layout0', 'layout1', 'layout3', 'layout4', 'layout5'];

    return (
        <ResizableBox className="relative bg-white rounded h-full flex flex-col p-2">
            <div className="relative bg-white rounded h-full flex flex-col">
                <div className="flex items-center justify-between">
                    {/* <h3 className="text-lg font-semibold">Section {id.slice(-1)}</h3> */}
                    {!disableDropdown && (
                        <div className="relative">
                            <button onClick={() => toggleDropdown(id)}>
                                <svg fill="#ffffff" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-20.65 -20.65 247.82 247.82" xmlSpace="preserve" stroke="#ffffff" strokeWidth="0.0020651800000000002" transform="matrix(1, 0, 0, 1, 0, 0) rotate(180)">
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0,0), scale(1)">
                                        <rect x="-20.65" y="-20.65" width="247.82" height="247.82" rx="24.781999999999996" fill="#0696c6" strokeWidth="0"></rect>
                                    </g>
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.2391079999999999"></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g>
                                            <g>
                                                <g>
                                                    <path d="M93.517,0H3.897C1.743,0,0,1.745,0,3.897v89.621c0,2.152,1.743,3.897,3.897,3.897h89.621 c2.154,0,3.897-1.745,3.897-3.897V3.897C97.414,1.745,95.671,0,93.517,0z M89.621,89.621H7.793V7.793h81.828V89.621z"></path>
                                                    <path d="M202.621,0H113c-2.154,0-3.897,1.745-3.897,3.897v89.621c0,2.152,1.743,3.897,3.897,3.897h89.621 c2.154,0,3.897-1.745,3.897-3.897V3.897C206.517,1.745,204.774,0,202.621,0z M198.724,89.621h-81.828V7.793h81.828V89.621z"></path>
                                                    <path d="M93.517,109.103H3.897C1.743,109.103,0,110.848,0,113v89.621c0,2.152,1.743,3.897,3.897,3.897h89.621 c2.154,0,3.897-1.745,3.897-3.897V113C97.414,110.848,95.671,109.103,93.517,109.103z M89.621,198.724H7.793v-81.828h81.828 V198.724z"></path>
                                                    <path d="M202.621,109.103H113c-2.154,0-3.897,1.745-3.897,3.897v89.621c0,2.152,1.743,3.897,3.897,3.897h89.621 c2.154,0,3.897-1.745,3.897-3.897V113C206.517,110.848,204.774,109.103,202.621,109.103z M198.724,198.724h-81.828v-81.828 h81.828V198.724z"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </button>
                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                                    {layouts.map((layoutOption) => (
                                        <div
                                            key={layoutOption}
                                            className={`px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 ${layout === layoutOption ? 'bg-gray-200 font-bold' : ''
                                                }`}
                                            onClick={() => selectSubLayout(id, layoutOption)}
                                        >
                                            {layoutOption}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {renderSectionLayout(id, layout, chartTypes, selectChartType)}
            </div>
        </ResizableBox>
    );
};

const renderSectionLayout = (sectionId, layout, chartTypes, selectChartType) => {
    const renderChart = (type) => {
        switch (type) {
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <Bar dataKey="uv" fill="#8884d8" />
                            <CartesianGrid stroke="#ccc" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                        </BarChart>
                    </ResponsiveContainer>
                );
            case 'pie':
                return (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie data={data} dataKey="uv" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    };

    const renderChartWithSelector = (chartIndex) => (
        <div className="bg-white rounded w-full h-full flex flex-col justify-center items-center">
            <ChartSelector sectionId={sectionId} chartIndex={chartIndex} selectChartType={selectChartType} />
            {renderChart(chartTypes[chartIndex])}
        </div>
    );

    switch (layout) {
        case 'layout0':
            return (
                <div className="grid h-full grid-cols-12 grid-rows-9 gap-3 overflow-auto">
                    <div className="border border-gray-300 p-2 bg-white rounded w-full h-full flex flex-col justify-center items-center col-span-3 row-span-3">{renderChartWithSelector(0)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded w-full h-full flex flex-col justify-center items-center col-span-3 row-span-3 col-start-4">{renderChartWithSelector(1)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded h-full flex flex-col justify-center items-center col-span-4 row-span-3 col-start-1 row-start-4">{renderChartWithSelector(2)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded h-full flex flex-col justify-center items-center col-span-4 row-span-3 col-start-9 row-start-4">{renderChartWithSelector(3)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded h-full flex flex-col justify-center items-center col-span-4 row-span-3 col-start-5 row-start-4">{renderChartWithSelector(4)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded h-full flex flex-col justify-center items-center col-span-3 row-span-3 col-start-1 row-start-7">{renderChartWithSelector(5)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded h-full flex flex-col justify-center items-center col-span-3 row-span-3 col-start-4 row-start-7">{renderChartWithSelector(6)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded h-full flex flex-col justify-center items-center col-span-3 row-span-3 col-start-7 row-start-7">{renderChartWithSelector(7)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded h-full flex flex-col justify-center items-center col-span-3 row-span-3 col-start-10 row-start-7">{renderChartWithSelector(8)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded h-full flex flex-col justify-center items-center col-span-3 row-span-3 col-start-7 row-start-1">{renderChartWithSelector(9)}</div>
                    <div className="border border-gray-300 p-2 bg-white rounded h-full flex flex-col justify-center items-center col-span-3 row-span-3 col-start-10 row-start-1">{renderChartWithSelector(10)}</div>
                </div>

            );
        case 'layout1':
            return (

                <div className="grid h-full grid-cols-2 grid-rows-2 gap-2 overflow-auto">
                    <div> {renderChartWithSelector(0)}</div>
                    <div> {renderChartWithSelector(1)}</div>
                    <div className="col-span-2 h-full">
                        {renderChartWithSelector(2)}
                    </div>
                </div>
            );
        case 'layout3':
            return (
                <div className="grid grid-cols-2 h-full p-2 gap-2 overflow-auto">
                    {renderChartWithSelector(0)}
                    {renderChartWithSelector(1)}
                    {renderChartWithSelector(2)}
                    {renderChartWithSelector(3)}
                </div>
            );
        case 'layout4':
            return (
                <div className="grid grid-cols-2 h-full p-2 gap-2 overflow-auto">
                    <div className="col-span-2 h-full">
                        {renderChartWithSelector(0)}
                    </div>
                    {renderChartWithSelector(1)}
                    {renderChartWithSelector(2)}
                </div>
            );
        case 'layout5':
            return (
                <div className="grid h-full p-2 gap-2 overflow-auto">
                    {renderChartWithSelector(0)}
                    {renderChartWithSelector(1)}
                </div>
            );
        default:
            return null;
    }
};

const ChartSelector = ({ sectionId, chartIndex, selectChartType }) => (
    <div className="flex space-x-2 mb-2">
        <button onClick={() => selectChartType(sectionId, chartIndex, 'line')} className="px-2 py-1   bg-blue-500 text-white">Line</button>
        <button onClick={() => selectChartType(sectionId, chartIndex, 'bar')} className="px-2 py-1   bg-blue-500 text-white">Bar</button>
        <button onClick={() => selectChartType(sectionId, chartIndex, 'pie')} className="px-2 py-1   bg-blue-500 text-white">Pie</button>
    </div>
);

export default LayoutDesign;
