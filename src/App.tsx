import Homepage from "./pages/Homepage";
import Dashboard from "./components/Dashboard/Profile";
import Layout from "./Layout";
import { Routes, Route } from "react-router";

const App = () => {
  return (
    <Routes>
      {/* Root layout route */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
      <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default App;
