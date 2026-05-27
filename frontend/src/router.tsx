import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./views/Login";
import Projects from "./views/Projects";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import ProjectForm from "./views/ProjectForm";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Tasks from "./views/Tasks";
import TaskForm from "./views/TaskForm";

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
            },
            {
                path: "/projects/new",
                element: <ProjectForm key="projectCreate" />
            },
            {
                path: "/projects/:id",
                element: <ProjectForm key="projectUpdate" />
            },
            {
                path: "/projects/:projectId/tasks",
                element: <Tasks />
            },
            {
                path: "/projects/:projectId/tasks/new",
                element: <TaskForm key="taskCreate" />
            },
            {
                path: "/projects/:projectId/tasks/:taskId/edit",
                element: <TaskForm key="taskUpdate" />
            },
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