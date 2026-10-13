import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await login(
                email,
                password
            );

            console.log(
                "ClinicCare login response:",
                response
            );

            if (!response.success) {
                throw new Error(
                    response.message ||
                    "Login failed."
                );
            }

            const user = response.user;

            if (!user) {
                throw new Error(
                    "Invalid login response from server."
                );
            }

            console.log(
                "Authenticated user:",
                user
            );

            console.log(
                "Authenticated role:",
                user.role
            );

            // Navigate strictly according to the role
            // returned by the backend.
            if (user.role === "PATIENT") {
                navigate("/dashboard", {
                    replace: true,
                });
            } else if (user.role === "DOCTOR") {
                navigate("/doctor/dashboard", {
                    replace: true,
                });
            } else if (user.role === "ADMIN") {
                navigate("/admin/dashboard", {
                    replace: true,
                });
            } else {
                setError(
                    "Unknown user role. Please contact the administrator."
                );
            }
        } catch (err) {
            console.error(
                "Login error:",
                err
            );

            const message =
                err.response?.data?.message ||
                err.message ||
                "Invalid email or password.";

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">

                <div className="login-header">
                    <h1>ClinicCare</h1>

                    <p>
                        Healthcare appointments made simple
                    </p>
                </div>

                <form
                    className="login-form"
                    onSubmit={handleSubmit}
                >
                    <div className="form-group">
                        <label htmlFor="email">
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    {error && (
                        <div className="login-error">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Login"}
                    </button>
                </form>

                <div className="login-links">
                    <Link to="/forgot-password">
                        Forgot Password?
                    </Link>

                    <span>
                        Don't have an account?
                    </span>

                    <Link to="/register">
                        Create Account
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Login;