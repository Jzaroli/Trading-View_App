// import React, { useState, useEffect } from "react";
// import type { StockData } from "../interfaces/StockData";


// const RemoveStockButton: React.FC = () => {
//   const [deleteStocks, setDeleteStocks] = useState<StockData[]>([]);

//   // Load items from localStorage on component mount
//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem("candidates") || "[]");
//     setDeleteStocks(storedItems);
//   }, []);

//   // Function to remove an object by symbol
//   const removeItemBySymbol = (loginToRemove: string) => {
//     // Filter out the object with the matching symbol
//     const updatedItems = deleteStocks.filter((stock) => stock.symbol !== loginToRemove);

//     // Update state and localStorage
//     setDeleteStocks(updatedItems);
//     localStorage.setItem("candidates", JSON.stringify(updatedItems));
//   };

//   return (
//     <div>
//       <ul>
//         {/* {deleteStocks.map((stock) => ( */}v cccccccccccccccccccccccccccccccccc
//             <button onClick={() => removeItemBySymbol(stock.symbol)}>❌</button>
//         {/* ))} */}
//       </ul>
//     </div>
//   );
// };

// export default RemoveStockButton
