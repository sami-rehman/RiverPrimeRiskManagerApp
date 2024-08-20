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