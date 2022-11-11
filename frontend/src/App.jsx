import "./App.css";
import { DataContextProvider } from "./context/DataContextProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Otp from "./components/Otp/Otp";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <DataContextProvider>
        <Routes>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Auth />} />
          <Route path="/otp" element={<Otp />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </DataContextProvider>
    </BrowserRouter>
  );
}

export default App;
