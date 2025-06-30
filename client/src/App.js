import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import Homepage from './pages/Homepage';
import EditPost from './pages/EditPost';
import NewPost from './pages/NewPost'
import Post from './pages/Post'
import SignUp from './pages/SignUp'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout loggedIn={false} />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="homepage" element={<Homepage />}/>
          <Route path='editpost' element={<EditPost />}/>
          <Route path="newpost" element={<NewPost />}/>
          <Route path="post" element={<Post />}/>
          <Route path='signup' element={<SignUp />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
