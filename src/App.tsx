import Homepage from "./pages/Homepage";
import Dashboard from "./components/Dashboard/Profile";
import Layout from "./Layout";
import { Routes, Route } from "react-router";
import LoginPage from "./pages/Auth/LoginPage";

const App = () => {
  return (

          <Routes>
            {/* Root layout route */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Homepage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>

  );
};

export default App;
