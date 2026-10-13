import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        const name = formData.name.trim();
        const email = formData.email.trim().toLowerCase();
        const phone = formData.phone.trim();
        const password = formData.password;
        const confirmPassword = formData.confirmPassword;

        if (!name || !email || !phone || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                phone,
                password,
                role: "PATIENT",
            });

            if (response.data?.success) {
                setSuccess(
                    "Account created successfully. Redirecting to login..."
                );

                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                });

                setTimeout(() => {
                    navigate("/login", {
                        replace: true,
                        state: {
                            registeredEmail: email,
                        },
                    });
                }, 1200);
            } else {
                setError(
                    response.data?.message ||
                        "Unable to create your account."
                );
            }
        } catch (err) {
            console.error("Registration error:", err);

            setError(
                err.response?.data?.message ||
                    "Unable to create your account. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <div className="register-header">
                    <div className="register-logo">🏥</div>

                    <h1>Create your ClinicCare account</h1>

                    <p>
                        Register as a patient to discover hospitals,
                        doctors, and book appointments.
                    </p>
                </div>

                {error && (
                    <div className="register-message register-error">
                        ⚠️ {error}
                    </div>
                )}

                {success && (
                    <div className="register-message register-success">
                        ✅ {success}
                    </div>
                )}

                <form
                    className="register-form"
                    onSubmit={handleSubmit}
                >
                    <div className="register-field">
                        <label htmlFor="name">
                            Full Name
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                            disabled={loading}
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                            disabled={loading}
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="phone">
                            Phone Number
                        </label>

                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="Enter your phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            autoComplete="tel"
                            disabled={loading}
                        />
                    </div>

                    <div className="register-field">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                            disabled={loading}
                        />

                        <small>
                            Minimum 8 characters
                        </small>
                    </div>

                    <div className="register-field">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            placeholder="Re-enter your password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            autoComplete="new-password"
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>
                </form>

                <div className="register-footer">
                    <span>
                        Already have an account?
                    </span>

                    <Link to="/login">
                        Login
                    </Link>
                </div>

                <div className="register-note">
                    <strong>Patient registration</strong>
                    <p>
                        Doctor and admin accounts are managed
                        separately by ClinicCare administration.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;