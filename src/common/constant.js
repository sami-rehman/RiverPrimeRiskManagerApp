export const numberFormatter = ({ value }) => {
    const formatter = new Intl.NumberFormat("en-US", {
        style: "decimal",
        maximumFractionDigits: 4,
    });
    return value == null ? "" : formatter.format(value);
};

export const LocalDateTimeRenderer = (props) => {
    const date = new Date(props.value);
    return (
      <span>
        {date.toLocaleDateString()} {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
    );
  };


  export const dateComparator = (filterLocalDateAtMidnight, cellValue) => {
    if (!cellValue) return -1;
  
    // Parse the cell value, e.g., "17-10-2024 13:17:36.145"
    const [day, month, yearTime] = cellValue.split("-");
    const [year, time] = yearTime.split(" ");
    const [hours, minutes, secondsMilliseconds] = time.split(":");
    const [seconds, milliseconds] = secondsMilliseconds.split(".");
  
    // Convert to a JavaScript Date object
    const cellDate = new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      seconds,
       milliseconds ? parseInt(milliseconds) : 0 // Handle milliseconds if present
    );
  
    // Only compare dates, ignoring the time part
    const cellDateAtMidnight = new Date(
      cellDate.getFullYear(),
      cellDate.getMonth(),
      cellDate.getDate()
    );
  
    if (cellDateAtMidnight < filterLocalDateAtMidnight) return -1;
    if (cellDateAtMidnight > filterLocalDateAtMidnight) return 1;
    return 0;
  };
  