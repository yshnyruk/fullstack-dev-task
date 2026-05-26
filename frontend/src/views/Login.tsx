import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Login() {
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    
    const [errors, setErrors] = React.useState<{ [key: string]: string[] }>();

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
        }
        axiosClient.post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    if (response.data.errors) {
                        setErrors(response.data.errors);
                    } else {
                        setErrors({ error: [response.data.message] });
                    }
                }
            });

    }

    return (
        <div style={styles.layout}>
            <div style={styles.formWrapper}>
                <form onSubmit={onSubmit} style={styles.form}>
                    <h1 style={styles.title}>Login</h1>
                    {errors && <div style={styles.error}>
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>}
                    <input type="email" placeholder="Email" style={styles.input} ref={emailRef} />
                    <input type="password" placeholder="Password" style={styles.input} ref={passwordRef} />
                    <button style={styles.button}>Login</button>
                    <p style={styles.registerText}>
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

const styles: { [key: string]: React.CSSProperties } = {
    layout: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        fontFamily: "system-ui, -apple-system, sans-serif",
    },
    formWrapper: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        marginBottom: "1rem",
        padding: "0.75rem",
        border: "1px solid #cbd5e1",
        borderRadius: "0.375rem",
    },
    button: {
        backgroundColor: "#3b82f6",
        color: "#fff",
        border: "none",
        padding: "0.75rem",
        borderRadius: "0.375rem",
        cursor: "pointer",
    },
    registerText: {
        marginTop: "1rem",
        textAlign: "center",
    },
    title: {
        marginBottom: "1.5rem",
        textAlign: "center",
    },
    error: {
        backgroundColor: "#fee2e2",
        color: "#dc2626",
        border: "1px solid #fecaca",
        padding: "0.75rem",
        borderRadius: "0.375rem",
        marginBottom: "1rem",
    }
}