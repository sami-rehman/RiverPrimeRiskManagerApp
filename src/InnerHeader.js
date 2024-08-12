import React from 'react';

const InnerHeader = () => {
    return (
        <section className="  text-gray-500 flex justify-between p-2 bg-gray-200">
            <button className="px-4 py-2 bg-blue-100 rounded">Messages from MT: deposits, Withdrawals and Trades</button>
            <button className="px-4 py-2 bg-green-100 rounded">Predictions related messages</button>
            <button className="px-4 py-2 bg-red-100 rounded">FIX related messages</button>
        </section>
    );
};

export default InnerHeader;
