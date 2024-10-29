import React from "react";

export const QuantityRequested = (params) => {
    console.log('params:', params);

    return (
        <div className="flex flex-row items-center space-x-2">
            <span>{params.value}</span>

            {params?.data?.rules !== "Summary" && (
                <>
                    {params.value >= 40 && (
                        // Show SVG icon if value is 40 or greater
                        <span title="Check for partial fill" style={{ cursor:'pointer'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="15" height="15">
                            <path fill="#FFBF00" stroke="#FFBF00" strokeWidth="1"
                                d="M23.7,18.73L13.87,2.08c-.39-.67-1.09-1.08-1.87-1.08s-1.47,.4-1.86,1.08L.3,18.73h0c-.4,.69-.4,1.5,0,2.18,.39,.68,1.09,1.08,1.87,1.08H21.84c.78,0,1.48-.41,1.87-1.08,.39-.68,.39-1.5,0-2.18Zm-.86,1.69c-.21,.36-.58,.58-1,.58H2.16c-.42,0-.79-.22-1-.58-.21-.37-.21-.81,0-1.18L11,2.58c.42-.73,1.58-.73,2,0l9.84,16.65c.21,.37,.21,.81,0,1.18Zm-10.34-6.42h-1v-6h1v6Zm.5,3c0,.55-.45,1-1,1s-1-.45-1-1,.45-1,1-1,1,.45,1,1Z" />
                        </svg>
                        </span>
                    )}

                    {params.value < 40 && (
                        // Show different SVG icon if value is less than 40
                        <span title="Completed" style={{ cursor:'pointer'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="15" height="15">
                            <path fill="#009C45" stroke="#009C45" strokeWidth="1"
                                d="M22.319,4.431,8.5,18.249a1,1,0,0,1-1.417,0L1.739,12.9a1,1,0,0,0-1.417,0h0a1,1,0,0,0,0,1.417l5.346,5.345a3.008,3.008,0,0,0,4.25,0L23.736,5.847a1,1,0,0,0,0-1.416h0A1,1,0,0,0,22.319,4.431Z" />
                        </svg>
                        </span>
                    )}
                </>
            )}
        </div>
    );
};
