import React, { useState } from "react";

const ToggleSwitch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="flex items-center text-gray-300 text-sm space-x-2">
      <span>Clients</span>
      <label className="relative w-12 h-6 cursor-pointer">
        {/* Hidden Checkbox */}
        <input
          type="checkbox"
          checked={isChecked}
          onChange={toggleSwitch}
          className="sr-only"
        />
        {/* Slider Background */}
        <div
          className={`absolute inset-0 transition-all duration-300 rounded-full border `}
        ></div>
        {/* Toggle Knob */}
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-transparent border transition-transform duration-300 ${
            isChecked ? "transform translate-x-6" : ""
          }`}
          style={{borderColor:'#47FFA6'}}
        ></div>
      </label>
      <span>Broker</span>
    </div>
  );
};

export default ToggleSwitch;
