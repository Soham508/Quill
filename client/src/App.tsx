import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import SignUp from "./pages/auth/SignUp";
import SignIn from './pages/auth/SignIn';
import PrivateRoute from "./components/routes/PrivateRoute";
import Profile from "./pages/user/Profile";
import Message from "./pages/user/Message";
import Search from "./pages/Search";
import CreatePost from "./pages/CreatePost";

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/post" element={<CreatePost />} />
      <Route path="/message/:id" element={<Message />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />

      <Route path="/user" element={<PrivateRoute />}>
        <Route path="/user/profile" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
