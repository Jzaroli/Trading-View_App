import { StockData } from '../interfaces/StockData';
import { ApiMessage } from '../interfaces/ApiMessage';
import Auth from '../utils/auth';
import { type JwtPayload, jwtDecode } from 'jwt-decode';

const getAllStocks = async () => {
  try {
    const response = await fetch(
      '/api/stocks/',
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return [];
  }
};

const getStockById = async (id: number | null): Promise<StockData> => {
  try {
    const response = await fetch(
      `/api/stocks/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    );

    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }
    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return Promise.reject('Could not fetch singular stock');
  }
}

const createStock = async (symbol: string) => {
  try {
    const loggedUser = localStorage.getItem('id_token') || '';
    if (!loggedUser) throw new Error('No token found in localStorage');

    const decoded = jwtDecode<JwtPayload>(loggedUser); ; //get from JWT
    const assignedUserId = decoded.assignedUserId;
    console.log('  equald', assignedUserId)
    if (!decoded.assignedUserId) throw new Error('Invalid token: username missing');
    const response = await fetch(
      '/api/stocks/', {
        method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Auth.getToken()}`
          },
        body: JSON.stringify({
          symbol,
          assignedUserId
        })
      }
    )  
    
    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }
    
    const data = response.json();
    return data;

  } catch (err) {
    console.log('Error from Stock Creation: ', err);
    return Promise.reject('Could not create stock');
  }
}

const updateStock = async (stockId: number, body: StockData): Promise<StockData> => {
  try {
    const response = await fetch(
      `/api/stocks/${stockId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        body: JSON.stringify(body)
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Update did not work', err);
    return Promise.reject('Update did not work');
  }
};

const deleteStock = async (stockId: number): Promise<ApiMessage> => {
  try {
    const response = await fetch(
      `/api/stocks/${stockId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        }
      }
    )
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.error('Error in deleting stock', err);
    return Promise.reject('Could not delete stock');
  }
};


export { getAllStocks, getStockById, createStock, updateStock, deleteStock};
