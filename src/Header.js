import React from 'react';

const Header = ({ setLayout }) => {
    return (
        <header className="p-4 bg-blue-600 text-gray-500 flex justify-between">
            <h1 className="text-xl text-white">Layout Switcher</h1>
            <select
                className="p-2 rounded"
                onChange={(e) => setLayout(e.target.value)}
            >
                <option value="LayoutOne">Layout One</option>
                <option value="LayoutTwo">Layout Two</option>
                <option value="LayoutThree">Layout Three</option>
                <option value="LayoutFour">Layout Four</option>
                <option value="LayoutFive">Layout Five</option>
                <option value="LayoutSix">Layout Six</option>
                <option value="LayoutSeven">Layout Seven</option>
                <option value="LayoutEight">Layout Eight</option>
                <option value="LayoutNine">Layout Nine</option>
                <option value="LayoutTen">Layout Ten</option>
                <option value="LayoutEleven">Layout Eleven</option>
                <option value="LayoutTwelve">Layout Twelve</option>
                <option value="LayoutThirteen">Layout Thirteen</option>
                <option value="LayoutFourteen">Layout Fourteen</option>
                <option value="LayoutFifteen">Layout Fifteen</option>
                <option value="LayoutSixteen">Layout Sixteen</option>
                <option value="LayoutSeventeen">Layout Seventeen</option>

            </select>
        </header>
    );
};

export default Header;
