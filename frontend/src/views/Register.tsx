import React from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Register() {
    const nameRef = React.useRef<HTMLInputElement>(null);
    const emailRef = React.useRef<HTMLInputElement>(null);
    const passwordRef = React.useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = React.useRef<HTMLInputElement>(null);

    const [errors, setErrors] = React.useState<{ [key: string]: string[] }>();

    const { setUser, setToken } = useStateContext();

    const onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: passwordConfirmationRef.current?.value,
        }
        axiosClient.post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                    setErrors(response.data.errors);
                }
            });
    }
    
    return (
        <div style={styles.layout}>
            <div style={styles.formWrapper}>
                <form onSubmit={onSubmit} style={styles.form}>
                    <h1 style={styles.title}>Register</h1>
                    {errors && <div style={styles.error}>
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>}
                    <input type="text" placeholder="Name" style={styles.input} ref={nameRef} />
                    <input type="email" placeholder="Email" style={styles.input} ref={emailRef} />
                    <input type="password" placeholder="Password" style={styles.input} ref={passwordRef} />
                    <input type="password" placeholder="Confirm Password" style={styles.input} ref={passwordConfirmationRef} />
                    <button style={styles.button}>Register</button>
                    <p style={styles.registerText}>
                        Already have an account? <Link to="/login">Login</Link>
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