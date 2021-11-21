import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import { AuthProvider } from "./context/useAuth";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { User } from "./types/creds";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState<User | null>(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null
  );
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      {/* React Router v6 docs https://reactrouter.com/docs/en/v6/upgrading/v5 */}
      <Router>
        {user ? (
          <AuthProvider user={user as User}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </AuthProvider>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        )}
      </Router>
    </ThemeProvider>
  );
}

export default App;
