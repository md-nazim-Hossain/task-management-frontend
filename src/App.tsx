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
import { useGetMeQuery } from "./redux/api/auth-api";
import { setUser } from "./redux/slices/auth-slice";
import { useEffect, useState } from "react";
import PrivateRoute from "./components/shared/private-route";
import { useDispatch } from "react-redux";
import { Loader } from "lucide-react";

function App() {
  const [loading, setLoading] = useState(true);
  const { data, isLoading } = useGetMeQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoading) {
      if (data?.success && data?.data) {
        dispatch(setUser(data.data));
      }
      setLoading(false);
    }
  }, [data, dispatch, isLoading]);

  if (loading) {
    return (
      <div className="w-screen h-screen bg-background flex items-center justify-center">
        <Loader className="animate-spin" />
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
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
