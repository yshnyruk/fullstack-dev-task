import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import type { Task } from "../models/Task";

export default function TaskForm() {
    const {projectId, taskId} = useParams();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setNotification} = useStateContext();
    const [task, setTask] = useState<Task>({
        id: null,
        title: "",
        body: "",
        created_by: "",
        completed: false,
    });

    const [errors, setErrors] = React.useState<{ [key: string]: string[] }>();
    
    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        if (taskId) {
            axiosClient.put(`/tasks/${taskId}`, task)
                .then(() => {
                    setNotification("Task updated successfully.");
                    navigate(`/projects/${projectId}/tasks`);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                }
            });
        } else {
            axiosClient.post(`/projects/${projectId}/tasks`, task)
                .then(() => {
                    setNotification("Task created successfully.");
                    navigate(`/projects/${projectId}/tasks`);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        console.log(response.data.errors);
                        setErrors(response.data.errors);
                    }
                });
        }
    }

    if (taskId) {
        useEffect(() => {
            setLoading(true);
            axiosClient.get(`/tasks/${taskId}`)
                .then(({data}) => {
                    setLoading(false);
                    setTask(data);
                }).catch(() => {
                    setLoading(false);
                })
        }, [taskId]);
    }

    return (
        <>
            {task.id && <h1>Update Task: {task.title}</h1>}
            {!task.id && <h1>New Task</h1>}
            <div>
                {loading && <div>Loading...</div>}
                {errors && <div style={styles.error}>
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input style={styles.input} value={task.title} onChange={(ev) => setTask({...task, title: ev.target.value})} placeholder="Title" />
                        <textarea style={styles.bodyInput} value={task.body} onChange={(ev) => setTask({...task, body: ev.target.value})} placeholder="Body" />
                        <button style={styles.button}>Save</button>
                    </form>
                )}
            </div>
        </>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    error: {
        backgroundColor: "#fef2f2",
        color: "#ef4444",
        border: "1px solid #fecaca",
        padding: "12px 16px",
        borderRadius: "6px",
        marginBottom: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSize: "14px",
        maxWidth: "400px",
    },
    input: {
        display: "block",
        width: "100%",
        maxWidth: "400px",
        boxSizing: "border-box",
        marginBottom: "16px",
        padding: "12px 16px",
        border: "1px solid #cbd5e1",
        borderRadius: "6px",
        fontSize: "15px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#0f172a",
        outline: "none",
    },
    button: {
        backgroundColor: "#2563eb",
        color: "#ffffff",
        border: "none",
        padding: "12px 24px",
        borderRadius: "6px",
        fontSize: "15px",
        fontWeight: "500",
        fontFamily: "system-ui, -apple-system, sans-serif",
        cursor: "pointer",
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
    },
    bodyInput: {
        display: "block",
        width: "100%",
        maxWidth: "400px",
        boxSizing: "border-box",
        marginBottom: "16px",
        padding: "12px 16px",
        border: "1px solid #cbd5e1",
        borderRadius: "6px",
        fontSize: "15px",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#0f172a",
        outline: "none",
        minHeight: "120px",
        resize: "none"
    }
}