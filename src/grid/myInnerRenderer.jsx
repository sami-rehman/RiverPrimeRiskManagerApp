import React from "react";

export const CustomFooterCellRenderer = (props) => {
  const { node, value } = props;
  const isFooter = node.footer;
  const isRootLevel = node.level === -1;

  if (isFooter && isRootLevel) {
    return (
      <span style={{ textDecoration: "underline", fontWeight: "bold" }}>
        Total
      </span>
    );
  }

  return <span>{value}</span>;
};