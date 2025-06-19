import { Route } from "react-router";
import { Routes } from "react-router";
import {
  Groups,
  HomePage,
  LoginPage,
  MyTasks,
  NotFound,
  Project,
  Projects,
  Users,
} from "./pages";
import DashboardLayout from "./components/layout/dashboard-layout";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<Project />} />
        <Route path="groups" element={<Groups />} />
        <Route path="users" element={<Users />} />
        <Route path="my-tasks" element={<MyTasks />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
