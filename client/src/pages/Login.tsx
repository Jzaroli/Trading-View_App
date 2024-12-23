import { useState, FormEvent, ChangeEvent } from "react";

import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const styles = {
    div: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'Column' as React.CSSProperties['flexDirection'],
      marginTop: '1vw'
    },
    form: {
      fontFamily: 'Roboto',
    },
    h1: {
      marginBottom: '2vw'
    },
    inputs: {
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
      padding: '0.9vw',
      border: 'none',
      borderRadius: '8%',
      marginTop: '1vw'
    },

  }

  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(loginData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div style={styles.div} className='form-container'>
      <form style={styles.form} className='form' onSubmit={handleSubmit}>
        <h1 style={styles.h1}>Login to view stocks!</h1>
        <div className="form-group">
          <label>Username</label>
          <input 
            style={styles.inputs}
            type="text" 
            className="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            placeholder="Username"
            name='username'
            value={loginData.username || ''}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
          style={styles.inputs}
          type="password" 
          className="form-control" 
          id="exampleInputPassword1" 
          placeholder="Password"
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
          required
          autoComplete="off"
          />
        </div>
        <button style={styles.button}  type="submit" className="btn">Login</button>
      </form>
    </div>
    
  )
};

export default Login;
