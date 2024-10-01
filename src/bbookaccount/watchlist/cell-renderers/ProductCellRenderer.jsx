// import type { CustomCellRendererProps } from "@ag-grid-community/react";
// import { type FunctionComponent } from "react";

// import styles from "./ProductCellRenderer.module.css";

// export const ProductCellRenderer: FunctionComponent<
//   CustomCellRendererProps
// > = ({ value }) => (
//   <div className={styles.productCell}>
//       <div>{value}</div>
//   </div>
// );


import React from "react";
import styles from "./ProductCellRenderer.module.css";

export const ProductCellRenderer = ({ value }) => (
  <div className={styles.productCell}>
    <div>{value}</div>
  </div>
);
