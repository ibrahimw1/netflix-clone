import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Home } from "./pages/Home";
import { AuthContextProvider } from "./context/AuthContext";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import SearchPage from "./pages/SearchPage";


function App() {
  return (
    <>
    <AuthContextProvider>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>}/>
      <Route path='/search' element={<SearchPage />} />
    </Routes>
    </AuthContextProvider>

    </>
  );
}

export default App;
