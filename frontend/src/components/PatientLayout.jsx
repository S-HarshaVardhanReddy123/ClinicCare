import React from "react";
import {
    NavLink,
    Outlet,
    useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import "./PatientLayout.css";


const PatientLayout = () => {
    const navigate = useNavigate();

    const {
        user,
        logout,
    } = useAuth();


    const handleLogout = () => {
        logout();

        navigate("/login");
    };


    const getInitial = () => {
        if (user?.name) {
            return user.name
                .charAt(0)
                .toUpperCase();
        }

        return "P";
    };


    return (
        <div className="patient-layout">

            {/* =====================================================
                SIDEBAR
            ====================================================== */}

            <aside className="patient-sidebar">

                {/* =================================================
                    BRAND
                ================================================== */}

                <div className="patient-brand">

                    <div className="patient-brand-icon">
                        +
                    </div>

                    <div className="patient-brand-text">

                        <h1>
                            ClinicCare
                        </h1>

                        <span>
                            Healthcare Platform
                        </span>

                    </div>

                </div>


                {/* =================================================
                    NAVIGATION
                ================================================== */}

                <nav className="patient-navigation">

                    {/* =================================================
                        MAIN MENU
                    ================================================== */}

                    <div className="patient-nav-section">

                        <span className="patient-nav-heading">
                            MAIN MENU
                        </span>


                        {/* Dashboard */}

                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                `patient-nav-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >
                            <span className="patient-nav-icon">
                                O
                            </span>

                            <span>
                                Dashboard
                            </span>
                        </NavLink>


                        {/* Hospitals */}

                        <NavLink
                            to="/hospitals"
                            className={({ isActive }) =>
                                `patient-nav-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >
                            <span className="patient-nav-icon">
                                H
                            </span>

                            <span>
                                Hospitals
                            </span>
                        </NavLink>


                        {/* Doctors */}

                        <NavLink
                            to="/doctors"
                            className={({ isActive }) =>
                                `patient-nav-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >
                            <span className="patient-nav-icon">
                                D
                            </span>

                            <span>
                                Doctors
                            </span>
                        </NavLink>


                        {/* =================================================
                            PATIENT APPOINTMENTS

                            IMPORTANT:
                            This MUST point to /appointments.

                            It must NOT point to:
                            /doctor/appointments
                        ================================================== */}

                        <NavLink
                            to="/appointments"
                            className={({ isActive }) =>
                                `patient-nav-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >
                            <span className="patient-nav-icon">
                                C
                            </span>

                            <span>
                                Appointments
                            </span>
                        </NavLink>

                    </div>


                    {/* =================================================
                        HEALTHCARE
                    ================================================== */}

                    <div className="patient-nav-section patient-healthcare-section">

                        <span className="patient-nav-heading">
                            HEALTHCARE
                        </span>


                        {/* Prescriptions */}

                        <NavLink
                            to="/prescriptions"
                            className={({ isActive }) =>
                                `patient-nav-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >
                            <span className="patient-nav-icon">
                                P
                            </span>

                            <span>
                                Prescriptions
                            </span>
                        </NavLink>


                        {/* Payments */}

                        <NavLink
                            to="/payments"
                            className={({ isActive }) =>
                                `patient-nav-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >
                            <span className="patient-nav-icon">
                                $
                            </span>

                            <span>
                                Payments
                            </span>
                        </NavLink>


                        {/* Reviews */}

                        <NavLink
                            to="/reviews"
                            className={({ isActive }) =>
                                `patient-nav-link ${
                                    isActive
                                        ? "active"
                                        : ""
                                }`
                            }
                        >
                            <span className="patient-nav-icon">
                                *
                            </span>

                            <span>
                                Reviews
                            </span>
                        </NavLink>

                    </div>

                </nav>


                {/* =================================================
                    USER FOOTER
                ================================================== */}

                <div className="patient-sidebar-footer">

                    <div className="patient-user-info">

                        <div className="patient-user-avatar">
                            {getInitial()}
                        </div>


                        <div className="patient-user-details">

                            <strong>
                                {user?.name || "Patient"}
                            </strong>

                            <span>
                                {user?.email ||
                                    "patient@cliniccare.com"}
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        className="patient-logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </aside>


            {/* =====================================================
                MAIN CONTENT

                Outlet is required because AppRoutes uses nested
                patient routes.
            ====================================================== */}

            <main className="patient-main-content">
                <Outlet />
            </main>

        </div>
    );
};


export default PatientLayout;