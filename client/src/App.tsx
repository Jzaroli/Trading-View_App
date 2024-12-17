import { Outlet } from 'react-router-dom';

import NavBar from './components/NavBar';

import Footer from './components/Footer';

import lineGraph from './assets/line_graph.gif'

function App() {

  return (
    <div className='container'>
      <NavBar />
      <main >
        <Outlet />
        <img src={lineGraph} />
        <Footer />
      </main>
    </div>
  )
}

export default App
