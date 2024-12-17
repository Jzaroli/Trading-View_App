// import StockCard from './StockCard';
// import { StockAttributes } from '../interfaces/StockAttributes';
// import { ApiMessage } from '../interfaces/ApiMessage';

// interface SwimlaneProps {
//   title: string;
//   tickets: StockAttributes[];
//   deleteTicket: (ticketId: number) => Promise<ApiMessage>
// }

// const Swimlane = ({ title, tickets, deleteTicket }: SwimlaneProps) => {
//   const getStatusClass = (status: string) => {
//     switch (status) {
//       case 'Todo':
//         return 'swim-lane todo';
//       case 'In Progress':
//         return 'swim-lane inprogress';
//       case 'Done':
//         return 'swim-lane done';
//       default:
//         return 'swim-lane';
//     }
//   };

//   return (
//     <div className={`swimlane ${getStatusClass(title)}`}>
//       <h2>{title}</h2>
//       {tickets.map(ticket => (
//         <StockCard 
//           // key={ticket.id}
//           ticket={ticket}
//           deleteTicket={deleteTicket}
//         />
//       ))}
//     </div>
//   );
// };

// export default Swimlane;
