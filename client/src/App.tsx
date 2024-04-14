import { Routes, Route } from "react-router-dom";
import './App.css'
import Home from "./pages/Home";
import SignUp from "./pages/auth/SignUp";
import SignIn from './pages/auth/SignIn';
import PrivateRoute from "./components/routes/PrivateRoute";
import Profile from "./pages/user/Profile";
import CreatePost from "./pages/user/CreatePost";

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/login" element={<SignIn />} />

      <Route path="/user" element={<PrivateRoute />}>
        <Route path="/user/profile" element={<Profile />} />
        <Route path="/user/create-post" element={<CreatePost />} />
      </Route>
    </Routes>
  )
}

export default App
