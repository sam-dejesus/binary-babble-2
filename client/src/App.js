import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login'; // create a simple Home.jsx component
// import Dashboard from './pages/Dashboard'; // optional

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout loggedIn={false} />}>
          <Route index element={<Login />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
