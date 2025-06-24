import Homepage from "./pages/Homepage";
import Dashboard from "./components/Dashboard/Profile";
import Layout from "./Layout";
import { Routes, Route } from "react-router";
import AuthPage from "./pages/Auth/AuthPage";
import Preview from "./pages/Preview";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (

          <Routes>
            {/* Root layout route */}
            <Route path="/" element={<Layout />}>
            <Route index element={<Homepage />} />
            <Route path="/auth" element={<AuthPage />} />
            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/preview/:username" element={<Preview />} />
            </Route>
            </Route>
          </Routes>

  );
};

export default App;
