export const formatNumber = (num, decimals = 2) => {
    if (isNaN(num)) return '0';
    return num.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  };