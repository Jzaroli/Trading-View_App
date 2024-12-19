import { JwtPayload, jwtDecode } from 'jwt-decode';
import type { UserData } from '../interfaces/UserData';

class AuthService {

  // Return the decoded token
  getProfile() {
    return jwtDecode<UserData>(this.getToken());
  }

  // Return a value that indicates if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return token;
  }
  
  // Return a value that indicates if the token is expired
  isTokenExpired(token: string) {
    try {
      // Attempt to decode the provided token using jwtDecode, expecting a JwtPayload type.
      const decoded = jwtDecode<JwtPayload>(token);

      // Check if the decoded token has an 'exp' (expiration) property and if it is less than the current time in seconds.
      if (decoded?.exp && decoded?.exp < Date.now() / 1000) {
        // If the token is expired, return true indicating that it is expired.
        return true;
      }
    } catch (err) {
      // If decoding fails (e.g., due to an invalid token format), catch the error and return false.
      return false;
    }
  }

  //Return the token
  getToken(): string {
    const loggedUser = localStorage.getItem('id_token') || '';
    return loggedUser;
  }

// Store the JWT token in localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

// Remove the JWT token from localStorage and redirect to the home page
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

// Export an instance of the AuthService class
export default new AuthService();
