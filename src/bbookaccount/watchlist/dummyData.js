const symbols = ["AAPL", "MSFT", "GOOG", "AMZN", "FB", "DJI30", "TSLA", "NFLX", "BTCUSD", "ETHUSD"];
const sides = ["BUY", "SELL"];
const rules = ["Active", "Inactive"];
const prompts = ["Auto", "Manual"];
const types = ["Market", "Limit", "Stop"];
const liveType = ["Market"];
const PendingType = ["Limit", "Stop"];
const tifs = ["Good Till Cancel", "Day", "Immediate", "Cancel"];
const destinations = ["CMC", "Equity", "Lmax"];
const riskManagerList = ["Ross", "Sami", "Zeeshan", "Abdullah"];
const commentsList = ["No Comments", "Urgent trade", "Delayed execution", "Awaiting approval"];

// // Function to generate random date and time
// function getRandomDateTime() {
//   const now = new Date();
//   const past = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date within the last 30 days
//   return past.toLocaleDateString("en-US") + " " + past.toLocaleTimeString("en-US", { hour12: false });
// }

function getRandomDateTime() {
    const now = new Date();
    const past = new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000); // Random date within the last 30 days
  
    const year = past.getFullYear();
    const month = String(past.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(past.getDate()).padStart(2, '0');
    const hours = String(past.getHours()).padStart(2, '0');
    const minutes = String(past.getMinutes()).padStart(2, '0');
    const seconds = String(past.getSeconds()).padStart(2, '0');
    const millSeconds = String(past.getMilliseconds()).padStart(3, '0');
  
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}.${millSeconds}`;
  }
  
  console.log(getRandomDateTime());
  

// Function to generate random data entry
function generateRandomEntry() {
  const orderId1 = `ORD${Math.floor(Math.random() * 900) + 100}`;
  const orderId2 = `ORD${Math.floor(Math.random() * 900) + 100}`;


    // Generate random filled and remaining quantities
    const quantityFilled = Math.floor(Math.random() * 100); // Random filled quantity
    const quantityRemaining = Math.floor(Math.random() * (100 - quantityFilled)); // Remaining quantity based on filled
    
  
  return {
    liveTimestamp:getRandomDateTime(),
    activationTime: getRandomDateTime().split(' ')[1],
    login: `MT${Math.floor(Math.random() * 900000) + 100000}`,
    positionId: `P${Math.floor(Math.random() * 900000) + 100000}`,
    orderId: orderId1,
    associatedOrders: [
      {
        activationTime: getRandomDateTime(),
        orderId: orderId1,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        side: sides[Math.floor(Math.random() * sides.length)],
        requestedQuantity: quantityFilled + quantityRemaining, // Sum of filled and remaining quantities
        priceSL: (Math.random() * 500).toFixed(2),
        tif: tifs[Math.floor(Math.random() * tifs.length)]
      },
      {
        activationTime: getRandomDateTime(),
        orderId: orderId2,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
        side: sides[Math.floor(Math.random() * sides.length)],
        requestedQuantity: quantityFilled + quantityRemaining, // Sum of filled and remaining quantities
        priceTP: (Math.random() * 500).toFixed(2),
        tif: tifs[Math.floor(Math.random() * tifs.length)]
      }
    ],
    symbol: symbols[Math.floor(Math.random() * symbols.length)],
    rules: rules[Math.floor(Math.random() * rules.length)],
    prompts: prompts[Math.floor(Math.random() * prompts.length)],
    side: sides[Math.floor(Math.random() * sides.length)],
    type: types[Math.floor(Math.random() * types.length)],
    liveType: liveType[Math.floor(Math.random() * liveType.length)],
    pendingType: PendingType[Math.floor(Math.random() * PendingType.length)],
    requestedQuantity: quantityFilled + quantityRemaining, // Sum of filled and remaining quantities
    quantityFilled: quantityFilled,
    quantityRemaining: quantityRemaining,
    Price: parseFloat((Math.random() * 50000).toFixed(2)),
    trigger_price: parseFloat((Math.random() * 1000).toFixed(2)),
    tif: tifs[Math.floor(Math.random() * tifs.length)],
    priceSL: parseFloat((Math.random() * 1000).toFixed(2)),
    priceTP: parseFloat((Math.random() * 1000).toFixed(2)),
    averageFillPrice: parseFloat((Math.random() * 500).toFixed(2)),
    profit: parseFloat((Math.random() * 20000 - 10000).toFixed(2)),
    destination: destinations[Math.floor(Math.random() * destinations.length)],
    currentPrice: parseFloat((Math.random() * 5000).toFixed(2)),
    fixId: `FIX${Math.floor(Math.random() * 900000) + 100000}`,
    riskManager:riskManagerList[Math.floor(Math.random() * riskManagerList.length)],
    comments: commentsList[Math.floor(Math.random() * commentsList.length)]
  };
}

// Generate 50 entries
export const dummyDataBbook = Array.from({ length: 50 }, generateRandomEntry);