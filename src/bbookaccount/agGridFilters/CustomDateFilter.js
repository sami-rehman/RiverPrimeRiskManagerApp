// CustomDateFilter.js
import React, { useState, useImperativeHandle, forwardRef } from 'react';

export const CustomDateFilter = forwardRef((props, ref) => {
  const [filterValue, setFilterValue] = useState("");

  const onInputChange = (event) => {
    setFilterValue(event.target.value);
    props.filterChangedCallback(); // Notify AG Grid of filter change
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return null;
    const [day, month, yearAndTime] = dateStr.split("-");
    const [year, time] = yearAndTime.split(" ");
    const [hours, minutes, seconds] = time.split(":");

    return new Date(year, month - 1, day, hours, minutes, seconds);
  };

  // Make AG Grid aware of the methods used in custom filters
  useImperativeHandle(ref, () => ({
    // Determines if the filter is active
    isFilterActive() {
      return filterValue !== "";
    },

    // Defines the filtering logic
    doesFilterPass(params) {
      const cellDateStr = params.data[props.colDef.field];
      const cellDate = parseDate(cellDateStr);
      const filterDate = parseDate(filterValue);

      // If either date is invalid, ignore comparison
      if (!cellDate || !filterDate) return true;

      // Compare cell date with filter date
      return cellDate.getTime() >= filterDate.getTime();
    },

    // Returns the model for saving filter state
    getModel() {
      return filterValue ? { value: filterValue } : null;
    },

    // Sets the model for restoring filter state
    setModel(model) {
      setFilterValue(model ? model.value : "");
    },
  }));

  return (
    <div>
      <input
        type="text"
        placeholder="DD-MM-YYYY HH:mm:ss"
        value={filterValue}
        onChange={onInputChange}
      />
    </div>
  );
});
