import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Projects from "./views/Projects";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/projects",
                element: <Projects />
            },
            {
                path: "/",
                element: <Navigate to="/projects" />
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])

export default router;