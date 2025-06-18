import { Route } from "react-router";
import { Routes } from "react-router";
import { HomePage } from "./pages";
import LoginPage from "./pages/login";
import DashboardLayout from "./components/layout/dashboard-layout";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
