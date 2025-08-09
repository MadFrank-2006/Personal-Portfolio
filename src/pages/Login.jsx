import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");
    const [err, setErr] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const nav = useNavigate();
    const loc = useLocation();
    const from = loc.state?.from?.pathname || "/admin";

    async function handleSubmit(e) {
        e.preventDefault();
        setErr("");
        setSubmitting(true);
        try {
            await login(email, pw);
            nav(from, { replace: true });
        } catch(e) {
            setErr(e.message || "Login Failed");
            setSubmitting(false);
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <h1>Admin Login</h1>
            <input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
            />
            <input 
                type="password"
                placeholder="Password"
                value={pw}
                onChange={e => setPw(e.target.value)}
                autoComplete="current-password"
                required
            />
            <button type="submit" disabled={submitting}>
                {submitting ? "Signing in..." : "Log in"}
            </button>
            {err && <div style={{ color: "Crimson", fontSize: 14 }}>{err}</div>}

        </form>
    );
}

export default Login;