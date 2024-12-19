import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import lineGraph from './assets/line_graph.gif'

const styles = {
  body: {
    margin: 0,
    padding: 0,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column' as React.CSSProperties['flexDirection'],
  },
  main: {
    flex: 1,
    marginTop: '1vh',
  }
}

function App() {
  
  return (
    <>
      <div style={styles.body}>
        <NavBar />
        <main style={styles.main} className='mx-3'>
          <Outlet />
          {/* <img src={lineGraph} /> */}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App
