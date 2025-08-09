import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'


const Layout = () => {


  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column">
      <header>
      <Navbar />
      </header>

      <main className="container flex-grow-1" style={{ marginBottom: '15vh' }}>
        <Outlet /> 
      </main>

      <footer className="bg-dark text-white py-3 mt-auto" style={{ position: 'fixed', bottom: 0, width: '100%' }}>
        <div className="container">
          <div className="row justify-content-center">
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
