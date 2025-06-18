import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import Home from "./Home";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Dashboard from "./Host/Dashboard";
import ProctedRoute from "./Host/ProctedRoute";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: (
      <ProctedRoute>
        <Dashboard />
      </ProctedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster 
        position="top-right"
        richColors
        closeButton
        duration={4000}
      />
    </>
  );
}

export default App;