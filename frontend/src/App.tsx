import Homepage from "./pages/Homepage";
import Dashboard from "./components/Dashboard/Profile";
import Layout from "./Layout";
import { Routes, Route } from "react-router";
import AuthPage from "./pages/Auth/AuthPage";
import Preview from "./pages/Preview";
import PublicProfile from "./pages/PublicProfile";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider from "./components/AuthProvider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public profile route - accessible without authentication */}
        <Route path="/:username" element={<PublicProfile />} />
        
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
    </AuthProvider>
  );
};

export default App;
