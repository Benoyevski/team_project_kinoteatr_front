
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import MainPages from "./pages/MainPages";
import MoviePage from "./components/MoviePage";
import SingIn from "./components/SingIn";
import SingUp from "./components/SingUp";

import UserPages from "./pages/UserPages";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state)=> state.application.token)

  {
    if(token){
      return(
    
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<MainPages />} />
          <Route path="/login" element={<Navigate to="/"/>} />
          <Route path="/auth" element={<Navigate to="/"/>} />
          <Route path="/user" element={<UserPages />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/subscribe" element={<UserPages />} />
        </Routes>
      </div>
      )
    
    }
    return (
      <div className="container">
        <Header />
        <Routes>
          <Route path="/" element={<MainPages />} />
          <Route path="/login" element={<SingIn />} />
          <Route path="/auth" element={<SingUp />} />

        </Routes>
      </div>
    )
    
  }
}

export default App;
