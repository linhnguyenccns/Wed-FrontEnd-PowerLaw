import './App.css';
import Home from './pages/Home';
import { Routes, Route } from "react-router-dom";
import ServiceDetails from './pages/ServiceDetails';
import AboutDetails from './pages/AboutDetails'
import BlogDetails from './pages/BlogDetails'
import NofDetails from './pages/NofDetails'
import Admin from './pages/Admin';
import Login from './pages/Login';
import AddService from './pages/Service/AddService';
import AddAbout from './pages/About/AddAbout';
import Addblog from './pages/Blog/AddBlog';
import AddAnswer from './pages/Answer/AddAnswer';
import AddNof from './pages/Nof/AddNof';
import EditInfor from './pages/EditInfor';
import EditService from './pages/Service/EditService';
import EditNof from './pages/Nof/EditNof';
import EditAnswer from './pages/Answer/EditAnswer';
import EditBlog from './pages/Blog/EditBlog'
import EditAbout from './pages/About/EditAbout'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/service-details/:id" element={<ServiceDetails />} />
      <Route path="/blog-details/:id" element={<BlogDetails/>} />
      <Route path="/about-details/:id" element={<AboutDetails/>} />
      <Route path="/nof-details/:id" element={<NofDetails/>} />
      <Route path="/admin" element={<Admin/>} />
      <Route path="/login" element={<Login/>} />

      <Route path="/add-service" element={<AddService/>} />
      <Route path="/add-about" element={<AddAbout/>} />
      <Route path="/add-blog" element={<Addblog/>} />
      <Route path="/add-answer" element={<AddAnswer/>} />
      <Route path="/add-nof" element={<AddNof/>} />

      <Route path="/infor-edit/:id" element={<EditInfor/>} />
      <Route path="/service-edit/:id" element={<EditService/>} />
      <Route path="/blog-edit/:id" element={<EditBlog/>} />
      <Route path="/about-edit/:id" element={<EditAbout/>} />
      <Route path="/question-edit/:id" element={<EditAnswer/>} />
      <Route path="/nof-edit/:id" element={<EditNof/>} />
    </Routes>
  );
}

export default App;
