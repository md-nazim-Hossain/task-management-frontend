import { Route } from "react-router";
import { Routes } from "react-router";
import { HomePage, LoginPage, Project, Projects } from "./pages";
import DashboardLayout from "./components/layout/dashboard-layout";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<Project />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}

export default App;
