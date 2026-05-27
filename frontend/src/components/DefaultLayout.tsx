import React, { useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";

export default function DefaultLayout() {
    const {user, token, notification, setUser, setToken} = useStateContext()
    
    if (!token) {
        return <Navigate to="/login" />
    }
    
    const onLogout = (ev: React.MouseEvent<HTMLAnchorElement>) => {
        ev.preventDefault();
        
        axiosClient.post("/logout")
            .then(() => {
                setUser(null);
                setToken(null);
            })
    }

    useEffect(() => {
        axiosClient.get("/user")
            .then(({ data }) => {
                setUser(data);
            })
    }, []);

    return (
        <div id="defaultLayout" style={styles.layout}>
            <aside style={styles.aside}>
                <Link to="/projects" style={styles.link}>Projects</Link>
            </aside>
            <div style={styles.headerWrapper}>
                <header style={styles.header}>
                    <div style={styles.headerTitle}>
                        Developer Task
                    </div>
                    <div style={styles.userInfo}>
                        {user?.name}
                        <a href="#" onClick={onLogout} style={styles.btnLogout}>Logout</a>
                    </div>
                </header>
            </div>
            <main style={styles.main}>
                <Outlet />
            </main>
            {notification && (
                <div style={styles.notification}>
                    {notification}
                </div>
            )}
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    layout: {
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gridTemplateRows: "auto 1fr",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "system-ui, -apple-system, sans-serif",
    },
    aside: {
        gridRow: "1 / -1", // Forces sidebar to stretch top to bottom
        backgroundColor: "#0f172a",
        padding: "1.5rem",
        boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
        zIndex: 10,
    },
    link: {
        display: "block",
        color: "#f1f5f9",
        textDecoration: "none",
        padding: "0.75rem 1rem",
        borderRadius: "0.5rem",
        backgroundColor: "#1e293b",
        fontWeight: "500",
    },
    headerWrapper: {
        gridColumn: "2",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e2e8f0",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1.25rem 2rem",
    },
    headerTitle: {
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#0f172a",
    },
    userInfo: {
        fontSize: "0.875rem",
        fontWeight: "500",
        color: "#475569",
        backgroundColor: "#f1f5f9",
        padding: "0.5rem 1rem",
        borderRadius: "9999px",
    },
    main: {
        gridColumn: "2",
        padding: "2rem",
        overflowY: "auto",
    },
    btnLogout: {
        marginLeft: "1rem",
        color: "#ef4444",
        textDecoration: "none",
        fontWeight: "500",
    },
    notification: {
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        backgroundColor: "#22c55e",
        color: "#ffffff",
        padding: "0.75rem 1.5rem",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    }
};