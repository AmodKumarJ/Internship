import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Register from "./components/Register";
import Signin from "./components/Signin";
import BallotCreationForm from "./components/Admin/BallotCreationForm";
import Voting from "./components/Voting";
import AdminLogin from "./components/Admin/AdminLogin"
import AdminHome from "./components/Admin/AdminHome";
import ElectionDetails from "./components/Admin/ElectionDetail";
import EditElectionForm from "./components/Admin/EditElectionForm";
import UserHome from "./components/UserHome";
import UserPage from "./components/UserPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-Login" element={<AdminLogin/>}/>
        <Route path="/admin" element ={<AdminHome/>}/>
        <Route path="/admin/ballot-creation" element={<BallotCreationForm />} />
        <Route path="/admin/election/:id" element={<ElectionDetails/>}/>
        <Route path="/admin/election/edit/:id" element={<EditElectionForm/>}/>
        <Route path="/user" element={<UserHome/>}/>
        <Route path="/user/userpage" element={<UserPage/>}/>
        <Route path="/user/voting/:id" element={<Voting />} />
        <Route path="/user/about" element={<About />} />
        <Route path="/user/contact" element={<Contact />} />
        <Route path="/user/register" element={<Register/>}/>
        <Route path="/user/signin" element={<Signin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
