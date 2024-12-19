import { UserData } from './UserData';

  export interface StockData {
    id: number | null;
    symbol: string | null;
    status: string | null;
    assignedUserId: number | null;
    assignedUser: UserData | null;
  }