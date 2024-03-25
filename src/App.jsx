import "./App.css";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProjectListPage from "./pages/ProjectListPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import EditProjectPage from "./pages/EditProjectPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

function App() {


  const getToken = () => {
    return localStorage.getItem('authToken')
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/login' />
  }

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />
  }

  return (
    <div className="App">
      <Navbar />

      <Routes>      
        <Route exact path="/" element={<HomePage />} />

        <Route element={<LoggedIn />}>

          <Route exact path="/projects" element={<ProjectListPage />} />
          <Route exact path="/projects/edit/:projectId" element={<EditProjectPage />} />           
          <Route exact path="/projects/:projectId" element={<ProjectDetailsPage />} />

        </Route>

        <Route element={<NotLoggedIn />}>

          <Route path='/signup' element={<SignupPage />} />
          <Route path='login' element={<LoginPage />} />
          
        </Route>


      </Routes>
    </div>
  );
}

export default App;
