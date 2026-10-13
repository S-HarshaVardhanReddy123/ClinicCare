import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PatientLayout = ({ children }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const openHospitals = () => {
        navigate("/location");
    };

    const openAppointments = () => {
        navigate("/appointments");
    };

    return (
        <div className="patient-app">

            {/* ==================================================
                SIDEBAR
            =================================================== */}

            <aside className="patient-sidebar">

                <div className="sidebar-brand">

                    <div className="brand-logo">
                        +
                    </div>

                    <div>
                        <div className="brand-name">
                            ClinicCare
                        </div>

                        <div className="brand-subtitle">
                            Healthcare Platform
                        </div>
                    </div>

                </div>


                {/* ==================================================
                    NAVIGATION
                =================================================== */}

                <nav className="sidebar-navigation">

                    <div className="sidebar-section-title">
                        MAIN MENU
                    </div>


                    {/* Dashboard */}

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span className="sidebar-icon">
                            ◉
                        </span>

                        <span>
                            Dashboard
                        </span>
                    </NavLink>


                    {/* Hospitals */}

                    <button
                        type="button"
                        className="sidebar-link"
                        onClick={openHospitals}
                    >
                        <span className="sidebar-icon">
                            🏥
                        </span>

                        <span>
                            Hospitals
                        </span>
                    </button>


                    {/* Doctors */}

                    <button
                        type="button"
                        className="sidebar-link sidebar-disabled"
                        disabled
                    >
                        <span className="sidebar-icon">
                            👨‍⚕️
                        </span>

                        <span>
                            Doctors
                        </span>
                    </button>


                    {/* Appointments */}

                    <NavLink
                        to="/appointments"
                        className={({ isActive }) =>
                            `sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >
                        <span className="sidebar-icon">
                            📅
                        </span>

                        <span>
                            Appointments
                        </span>
                    </NavLink>


                    {/* ==================================================
                        HEALTHCARE
                    =================================================== */}

                    <div className="sidebar-section-title sidebar-section-spaced">
                        HEALTHCARE
                    </div>


                    {/* Prescriptions */}

                    <button
                        type="button"
                        className="sidebar-link sidebar-disabled"
                        disabled
                    >
                        <span className="sidebar-icon">
                            💊
                        </span>

                        <span>
                            Prescriptions
                        </span>
                    </button>


                    {/* Payments */}

                    <button
                        type="button"
                        className="sidebar-link sidebar-disabled"
                        disabled
                    >
                        <span className="sidebar-icon">
                            💳
                        </span>

                        <span>
                            Payments
                        </span>
                    </button>


                    {/* Reviews */}

                    <button
                        type="button"
                        className="sidebar-link sidebar-disabled"
                        disabled
                    >
                        <span className="sidebar-icon">
                            ⭐
                        </span>

                        <span>
                            Reviews
                        </span>
                    </button>

                </nav>


                {/* ==================================================
                    SIDEBAR FOOTER
                =================================================== */}

                <div className="sidebar-footer">

                    <button
                        type="button"
                        className="sidebar-link logout-link"
                        onClick={handleLogout}
                    >
                        <span className="sidebar-icon">
                            ↪
                        </span>

                        <span>
                            Logout
                        </span>
                    </button>

                </div>

            </aside>


            {/* ==================================================
                MAIN AREA
            =================================================== */}

            <div className="patient-main">

                {/* ==================================================
                    TOPBAR
                =================================================== */}

                <header className="patient-topbar">

                    <div className="topbar-search">

                        <span className="search-icon">
                            🔍
                        </span>

                        <input
                            type="text"
                            placeholder="Search hospitals, doctors..."
                        />

                    </div>


                    <div className="topbar-actions">

                        <button
                            type="button"
                            className="notification-button"
                            title="Notifications"
                        >
                            🔔
                        </button>


                        <div className="topbar-profile">

                            <div className="topbar-avatar">
                                {
                                    user?.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "P"
                                }
                            </div>


                            <div className="topbar-user">

                                <strong>
                                    {user?.name || "Patient"}
                                </strong>

                                <span>
                                    Patient
                                </span>

                            </div>

                        </div>

                    </div>

                </header>


                {/* ==================================================
                    PAGE CONTENT
                =================================================== */}

                <main className="patient-content">
                    {children}
                </main>

            </div>

        </div>
    );
};

export default PatientLayout;