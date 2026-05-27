import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios-client";
import React from "react";
import type { Task } from "../models/Task";

export default function Tasks() {
    const {projectId} = useParams();
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const {setNotification} = useStateContext();

    useEffect(() => {
        getTasks(currentPage);
    }, []);

    const onToggleCompleted = (task: Task) => {
        axiosClient.put(`/tasks/${task.id}`, {...task, completed: !task.completed})
            .then(() => {
                setNotification("Task updated successfully.");
                getTasks(currentPage);
            })
    }

    const onDelete = (task: Task) => {
        if (!window.confirm("Are you sure you want to delete this task?")) {
            return;
        }

        axiosClient.delete(`/tasks/${task.id}`)
            .then(() => {
                setNotification("Task deleted successfully.");
                getTasks(currentPage);
            })
    }

    const getTasks = (page: number) => {
        if (page < 1 || page > lastPage) {
            return;
        }

        setLoading(true);
        axiosClient.get(`/projects/${projectId}/tasks?page=${page}`)
            .then(({data}) => {
                setLoading(false);
                console.log(data);
                setTasks(data.data);
                setCurrentPage(data.meta.current_page);
                setLastPage(data.meta.last_page);
            }).catch(() => {
                setLoading(false);
            })
        
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h1 style={styles.title}>Tasks</h1>
                <Link to={`/projects/${projectId}/tasks/new`} style={styles.btnAdd}>+ Add New Task</Link>
            </div>
            <div style={styles.content}>
                <table style={styles.table}>
                    <thead style={styles.tableHeader}>
                        <tr>
                            <th style={styles.th}>Title</th>
                            <th style={styles.th}>Body</th>
                            <th style={styles.th}>Created By</th>
                            <th style={styles.thAction}>Completed</th>
                            <th style={styles.thAction}>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody style={styles.tableBody}>
                            <tr style={styles.tr}>
                                <td colSpan={4} style={styles.td}>
                                    <div>Loading...</div>
                                </td>
                            </tr>
                        </tbody>
                        )
                    }
                    {!loading && (
                        <tbody style={styles.tableBody}>
                            {tasks.map((task) => (
                                <tr key={task.id} style={styles.tr}>
                                    <td style={styles.td}>
                                        {task.title}
                                    </td>
                                    <td style={styles.bodyTd}>
                                        {task.body}
                                    </td>
                                    <td style={styles.td}>
                                        {task.created_by}
                                    </td>
                                    <td style={styles.completedCell}>
                                        <input type="checkbox" style={styles.checkbox} checked={task.completed} onChange={() => onToggleCompleted(task)} />
                                    </td>
                                    <td style={styles.tdAction}>
                                        <Link to={`/projects/${projectId}/tasks/${task.id}/edit`} style={styles.btnEdit}>Edit</Link>
                                        <button style={styles.btnDelete} onClick={() => onDelete(task)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        )
                    }
                    {!loading && lastPage > 1 && (
                        <tfoot>
                            <tr>
                                <td colSpan={4}>
                                    <div style={styles.pages}>
                                        <button style={styles.pageButton} onClick={() => getTasks(currentPage - 1)}>
                                            {'<'}
                                        </button>
                                        <span style={styles.pageSpan}>Page {currentPage} of {lastPage}</span>
                                        <button style={styles.pageButton} onClick={() => getTasks(currentPage + 1)}>
                                            {'>'}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tfoot>
                    )}
                </table>
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        fontFamily: "system-ui, -apple-system, sans-serif",
        padding: "24px",
        maxWidth: "1000px",
        margin: "0 auto",
        color: "#1e293b",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "24px"
    },
    title: {
        margin: 0,
        fontSize: "24px",
        fontWeight: "600",
    },
    btnAdd: {
        display: "inline-block",
        padding: "10px 18px",
        backgroundColor: "#2563eb",
        color: "#ffffff",
        borderRadius: "6px",
        textDecoration: "none",
        fontWeight: "500",
        fontSize: "14px",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
        border: "none",
        cursor: "pointer",
    },
    content: {
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        overflow: "hidden"
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
        tableLayout: "fixed",
    },
    tableHeader: {
        backgroundColor: "#f8fafc",
        borderBottom: "1px solid #e2e8f0",
    },
    th: {
        padding: "16px 24px",
        fontSize: "13px",
        fontWeight: "600",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
    },
    thAction: {
        padding: "16px 24px",
        fontSize: "13px",
        fontWeight: "600",
        color: "#64748b",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
        textAlign: "right",
    },
    tableBody: {
        backgroundColor: "#ffffff"
    },
    tr: {
        borderBottom: "1px solid #f1f5f9",
    },
    td: {
        padding: "16px 24px",
        fontSize: "14px",
        color: "#334155",
    },
    tdAction: {
        padding: "16px 24px",
        textAlign: "right",
        gap: "12px",
        whiteSpace: "nowrap",
        minWidth: "180px",
    },
    completedCell: {
        padding: "16px 24px",
        textAlign: "center",
        width: "1%",
        whiteSpace: "nowrap",
    },
    btnEdit: {
        padding: "6px 12px",
        backgroundColor: "#f1f5f9",
        color: "#475569",
        borderRadius: "4px",
        textDecoration: "none",
        fontSize: "13px",
        fontWeight: "500",
        border: "1px solid #e2e8f0",
    },
    btnDelete: {
        padding: "6px 12px",
        backgroundColor: "#fef2f2",
        color: "#ef4444",
        borderRadius: "4px",
        border: "1px solid #fecaca",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
    },
    btnTitle: {
        color: "black",
        textDecoration: "none",
        fontWeight: "500",
    },
    pages: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "12px",
        padding: "16px 0",
    },
    pageButton: {
        padding: "6px 12px",
        backgroundColor: "#f1f5f9",
        color: "#475569",
        borderRadius: "4px",
        border: "1px solid #e2e8f0",
        fontSize: "13px",
        fontWeight: "500",
        cursor: "pointer",
    },
    pageSpan: {
        fontSize: "14px",
        color: "#334155",
    },
    checkbox: {
        width: "16px",
        height: "16px",
        cursor: "pointer",
    },
    bodyTd: {
        padding: "16px 24px",
        fontSize: "14px",
        color: "#334155",
        maxWidth: "400px",
        whiteSpace: "pre-wrap",
        overflowWrap: "anywhere",
        wordBreak: "break-word",
    },
}
