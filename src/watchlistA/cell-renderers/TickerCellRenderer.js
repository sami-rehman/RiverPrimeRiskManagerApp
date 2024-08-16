export const TickerCellRenderer = ({
  data,
}) => {
  return (
    data && (
      <div>
        {/* <img
          src={`/example/finance/logos/${data.ticker}.png`}
          style={{
            width: "20px",
            height: "20px",
            marginRight: "5px",
            borderRadius: "32px",
          }}
        /> */}
        <b className="custom-ticker">{data.ticker}</b>
        {/* <span className="ticker-name"> {data.name}</span> */}
      </div>
    )
  );
};