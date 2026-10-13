import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./DoctorLayout.css";

const DoctorLayout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="doctor-app">

            {/* ==================================================
                SIDEBAR
            ================================================== */}

            <aside className="doctor-sidebar">

                <div className="doctor-sidebar-brand">

                    <div className="doctor-brand-logo">
                        +
                    </div>

                    <div>
                        <div className="doctor-brand-name">
                            ClinicCare
                        </div>

                        <div className="doctor-brand-subtitle">
                            Doctor Portal
                        </div>
                    </div>

                </div>


                <nav className="doctor-sidebar-navigation">

                    <div className="doctor-sidebar-section">
                        MAIN MENU
                    </div>


                    <NavLink
                        to="/doctor/dashboard"
                        className={({ isActive }) =>
                            `doctor-sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span className="doctor-sidebar-icon">
                            ◉
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </NavLink>


                    <NavLink
                        to="/doctor/appointments"
                        className={({ isActive }) =>
                            `doctor-sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span className="doctor-sidebar-icon">
                            📅
                        </span>

                        <span>
                            Appointments
                        </span>
                    </NavLink>


                    <NavLink
                        to="/doctor/availability"
                        className={({ isActive }) =>
                            `doctor-sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span className="doctor-sidebar-icon">
                            🕐
                        </span>

                        <span>
                            Availability
                        </span>
                    </NavLink>


                    <div className="doctor-sidebar-section doctor-sidebar-section-spaced">
                        PATIENT CARE
                    </div>


                    <NavLink
                        to="/doctor/patients"
                        className={({ isActive }) =>
                            `doctor-sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span className="doctor-sidebar-icon">
                            👥
                        </span>

                        <span>
                            Patients
                        </span>
                    </NavLink>


                    <NavLink
                        to="/doctor/prescriptions"
                        className={({ isActive }) =>
                            `doctor-sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span className="doctor-sidebar-icon">
                            💊
                        </span>

                        <span>
                            Prescriptions
                        </span>
                    </NavLink>


                    <NavLink
                        to="/doctor/profile"
                        className={({ isActive }) =>
                            `doctor-sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span className="doctor-sidebar-icon">
                            👨‍⚕️
                        </span>

                        <span>
                            My Profile
                        </span>
                    </NavLink>

                </nav>


                <div className="doctor-sidebar-footer">

                    <button
                        type="button"
                        className="doctor-sidebar-link doctor-logout"
                        onClick={handleLogout}
                    >
                        <span className="doctor-sidebar-icon">
                            ↪
                        </span>

                        <span>
                            Logout
                        </span>
                    </button>

                </div>

            </aside>


            {/* ==================================================
                MAIN
            ================================================== */}

            <div className="doctor-main">

                <header className="doctor-topbar">

                    <div className="doctor-topbar-title">
                        Doctor Portal
                    </div>


                    <div className="doctor-topbar-actions">

                        <button
                            type="button"
                            className="doctor-notification-button"
                            title="Notifications"
                        >
                            🔔
                        </button>


                        <div className="doctor-profile">

                            <div className="doctor-avatar">
                                {user?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "D"}
                            </div>

                            <div className="doctor-user-info">

                                <strong>
                                    {user?.name || "Doctor"}
                                </strong>

                                <span>
                                    Doctor
                                </span>

                            </div>

                        </div>

                    </div>

                </header>


                <main className="doctor-content">
                    <Outlet />
                </main>

            </div>

        </div>
    );
};

export default DoctorLayout;