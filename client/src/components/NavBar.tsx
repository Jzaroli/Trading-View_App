import { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import auth from '../utils/auth.ts';
// import lineGraph from '../assets/line_graph.gif';

const styles = {
  nav: {
    display: 'flex',
    flexDirection: 'row' as React.CSSProperties['flexDirection'],
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#6D8EA0',
    listStyleType: 'none',
    overflow: 'auto',
    position: 'sticky' as React.CSSProperties['position'],
    height: '4rem',
    padding: '2rem',
    marginBottom: '0.5rem',
    top: 0,
    left: 0,
    width: '100%',
    fontFamily: 'Roboto',
    zIndex: 15
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: '#182825',
    textDecoration: 'none',
    marginRight: '2vw',

  },
  favorites: {
    fontSize: '1.1rem',
    fontWeight: 700,
    color: '#182825',
    textDecoration: 'none',
    marginRight: '4vw'
  },
  button: {
    textDecoration: 'none' as React.CSSProperties['textDecoration'],
    color: '#AFA98D',
    backgroundColor: '#182825',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
    textAlign: 'center' as React.CSSProperties['textAlign'],
    padding: '1vw',
    border: 'none',
    borderRadius: '8%',
    marginLeft: 'auto',
  },
  menu: {
    display: 'flex',
    flexDirection: 'row' as React.CSSProperties['flexDirection'],
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.5vw'
  }
}


const Navbar = () => {
  const [ loginCheck, setLoginCheck ] = useState(false);
  const currentPage = useLocation().pathname;

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
    <nav style={styles.nav}>
        <div className='nav-item'>
          <Link 
            style={styles.title} 
            to='/' 
            className={currentPage === '/' ? 'nav-link active' : 'nav-link'}
          > 
            Make a Trade!
          </Link>
        </div>    
        {!loginCheck ? (
        <div> 
          <button className='btn'>
            <Link style={styles.button} to='/login'>Login</Link>
          </button>
        </div>
        ) : (
        <div style={styles.menu}>
          <Link style={styles.favorites}  to='/favorites'>Favorites</Link>
          <button style={styles.button} className='btn' onClick={() => {
            auth.logout();}}>Logout
          </button>
        </div>
        )}
    </nav> 
  );    
}

export default Navbar;
