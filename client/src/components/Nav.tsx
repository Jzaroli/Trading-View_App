import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth.ts';
import lineGraph from '../assets/line_graph.gif';

const styles = {

  nav: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }  

}

const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);

  const checkLogin = () => {
    if(auth.loggedIn()) {
      setLoginCheck(true);
    }
  };

  useEffect(() => {
    console.log(loginCheck);
    checkLogin();
  }, [loginCheck])

  return (
    <div className='nav' style={{
      backgroundImage: `url(${lineGraph})`,
      // backgroundSize: 'contain', // or 'contain'
      // backgroundRepeat: 'no-repeat',
      display: 'flex',
      borderRadius: '8px'
      
      }}>
    <div className='nav-title'>
        <Link to='/' style={{
          fontSize: '36px',
          color: 'blue',
          textDecoration: 'none',
          
          }}>
            <h2>Let's Make A Trade</h2></Link>
      </div>
      <ul className='nav-item' style={{}}>
          <button type='button' id='favorites-link' style={{
            fontSize: '18px', 
            backgroundColor: 'green', 
            borderRadius: '8px', 
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
            margin: '5px',
            display: 'block',

            
            }}>
            <Link to='/favorites' style={{textDecoration: 'none'}}>Favorite Stocks</Link>
          </button>
      {
        !loginCheck ? (
            <button type='button' style={{
              fontSize: '18px', 
              backgroundColor: 'green', 
              borderRadius: '8px', 
              boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
              margin: '5px',
              display: 'block',

              }}>
              <Link to='/login' style={{textDecoration: 'none'}}>Login</Link>
            </button>
        ) : (
            <button type='button' onClick={() => {
              auth.logout();
            }}>Logout</button>
        )
      }
      </ul>
    </div>
  )
}

export default Navbar;
