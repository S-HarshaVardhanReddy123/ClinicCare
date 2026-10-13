import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./AdminDashboard.css";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ============================================================
    // FETCH DASHBOARD STATISTICS
    // ============================================================

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                "/admin/dashboard"
            );

            console.log(
                "Admin dashboard response:",
                response.data
            );

            /*
             * Backend response:
             *
             * {
             *     success: true,
             *     statistics: {
             *         total_users: "647",
             *         total_patients: "2",
             *         total_doctors: "644",
             *         ...
             *     }
             * }
             */

            if (
                response.data?.success &&
                response.data?.statistics
            ) {
                setStatistics(
                    response.data.statistics
                );
            } else {
                setStatistics(null);

                setError(
                    "Dashboard data is not available."
                );
            }
        } catch (err) {
            console.error(
                "Admin dashboard error:",
                err
            );

            setStatistics(null);

            setError(
                err.response?.data?.message ||
                "Failed to load dashboard data."
            );
        } finally {
            setLoading(false);
        }
    };


    // ============================================================
    // LOAD DASHBOARD ON PAGE OPEN
    // ============================================================

    useEffect(() => {
        fetchDashboard();
    }, []);


    // ============================================================
    // LOGOUT
    // ============================================================

    const handleLogout = () => {
        logout();

        navigate(
            "/login",
            {
                replace: true,
            }
        );
    };


    // ============================================================
    // NUMBER FORMATTER
    // ============================================================

    const number = (value) => {
        return Number(
            value || 0
        ).toLocaleString("en-IN");
    };


    // ============================================================
    // LOADING STATE
    // ============================================================

    if (loading) {
        return (
            <div className="admin-dashboard-page">

                <div className="admin-dashboard-loading">

                    <div className="admin-loading-spinner"></div>

                    <p>
                        Loading dashboard...
                    </p>

                </div>

            </div>
        );
    }


    // ============================================================
    // ERROR STATE
    // ============================================================

    if (error) {
        return (
            <div className="admin-dashboard-page">

                <div className="admin-dashboard-error">

                    <h2>
                        Unable to load dashboard
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={fetchDashboard}
                        className="admin-refresh-button"
                    >
                        ↻ Try Again
                    </button>

                </div>

            </div>
        );
    }


    // ============================================================
    // NO DATA STATE
    // ============================================================

    if (!statistics) {
        return (
            <div className="admin-dashboard-page">

                <div className="admin-dashboard-error">

                    <h2>
                        No dashboard data available
                    </h2>

                    <button
                        type="button"
                        onClick={fetchDashboard}
                        className="admin-refresh-button"
                    >
                        ↻ Refresh
                    </button>

                </div>

            </div>
        );
    }


    // ============================================================
    // DASHBOARD
    // ============================================================

    return (
        <div className="admin-dashboard-page">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="admin-dashboard-header">

                <div>

                    <span className="admin-dashboard-label">
                        ADMIN PANEL
                    </span>

                    <h1>
                        Admin Dashboard
                    </h1>

                    <p>
                        Monitor ClinicCare platform
                        activity, users, hospitals
                        and appointments.
                    </p>

                </div>


                {/* ==================================================
                    HEADER ACTIONS
                ================================================== */}

                <div className="admin-dashboard-actions">

                    <button
                        type="button"
                        onClick={fetchDashboard}
                        className="admin-refresh-button"
                    >
                        ↻ Refresh
                    </button>


                    <button
                        type="button"
                        onClick={handleLogout}
                        className="admin-logout-button"
                    >
                        🚪 Logout
                    </button>

                </div>

            </div>


            {/* ==================================================
                MAIN STAT CARDS
            ================================================== */}

            <div className="admin-stat-grid">

                {/* TOTAL USERS */}

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        👥
                    </div>

                    <div>

                        <span>
                            Total Users
                        </span>

                        <strong>
                            {number(
                                statistics.total_users
                            )}
                        </strong>

                    </div>

                </div>


                {/* TOTAL DOCTORS */}

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        🩺
                    </div>

                    <div>

                        <span>
                            Doctors
                        </span>

                        <strong>
                            {number(
                                statistics.total_doctors
                            )}
                        </strong>

                    </div>

                </div>


                {/* TOTAL HOSPITALS */}

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        🏥
                    </div>

                    <div>

                        <span>
                            Hospitals
                        </span>

                        <strong>
                            {number(
                                statistics.total_hospitals
                            )}
                        </strong>

                    </div>

                </div>


                {/* TOTAL APPOINTMENTS */}

                <div className="admin-stat-card">

                    <div className="admin-stat-icon">
                        📅
                    </div>

                    <div>

                        <span>
                            Appointments
                        </span>

                        <strong>
                            {number(
                                statistics.total_appointments
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==================================================
                PLATFORM OVERVIEW
            ================================================== */}

            <div className="admin-dashboard-panel">

                <div className="admin-panel-header">

                    <div>

                        <h2>
                            Platform Overview
                        </h2>

                        <p>
                            Current ClinicCare system
                            statistics
                        </p>

                    </div>

                </div>


                <div className="admin-overview-grid">

                    {/* PATIENTS */}

                    <div className="admin-overview-item">

                        <span>
                            Patients
                        </span>

                        <strong>
                            {number(
                                statistics.total_patients
                            )}
                        </strong>

                    </div>


                    {/* DOCTORS */}

                    <div className="admin-overview-item">

                        <span>
                            Doctors
                        </span>

                        <strong>
                            {number(
                                statistics.total_doctors
                            )}
                        </strong>

                    </div>


                    {/* ADMINS */}

                    <div className="admin-overview-item">

                        <span>
                            Admins
                        </span>

                        <strong>
                            {number(
                                statistics.total_admins
                            )}
                        </strong>

                    </div>


                    {/* HOSPITALS */}

                    <div className="admin-overview-item">

                        <span>
                            Hospitals
                        </span>

                        <strong>
                            {number(
                                statistics.total_hospitals
                            )}
                        </strong>

                    </div>


                    {/* ACTIVE HOSPITALS */}

                    <div className="admin-overview-item">

                        <span>
                            Active Hospitals
                        </span>

                        <strong>
                            {number(
                                statistics.active_hospitals
                            )}
                        </strong>

                    </div>


                    {/* LOCATIONS */}

                    <div className="admin-overview-item">

                        <span>
                            Locations
                        </span>

                        <strong>
                            {number(
                                statistics.total_locations
                            )}
                        </strong>

                    </div>


                    {/* REVIEWS */}

                    <div className="admin-overview-item">

                        <span>
                            Reviews
                        </span>

                        <strong>
                            {number(
                                statistics.total_reviews
                            )}
                        </strong>

                    </div>


                    {/* PRESCRIPTIONS */}

                    <div className="admin-overview-item">

                        <span>
                            Prescriptions
                        </span>

                        <strong>
                            {number(
                                statistics.total_prescriptions
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==================================================
                APPOINTMENT STATUS
            ================================================== */}

            <div className="admin-dashboard-panel">

                <div className="admin-panel-header">

                    <div>

                        <h2>
                            Appointment Status
                        </h2>

                        <p>
                            Current appointment
                            distribution
                        </p>

                    </div>

                </div>


                <div className="admin-status-grid">

                    {/* PENDING */}

                    <div className="admin-status-card pending">

                        <span>
                            Pending
                        </span>

                        <strong>
                            {number(
                                statistics.pending_appointments
                            )}
                        </strong>

                    </div>


                    {/* ACCEPTED */}

                    <div className="admin-status-card accepted">

                        <span>
                            Accepted
                        </span>

                        <strong>
                            {number(
                                statistics.accepted_appointments
                            )}
                        </strong>

                    </div>


                    {/* COMPLETED */}

                    <div className="admin-status-card completed">

                        <span>
                            Completed
                        </span>

                        <strong>
                            {number(
                                statistics.completed_appointments
                            )}
                        </strong>

                    </div>


                    {/* REJECTED */}

                    <div className="admin-status-card rejected">

                        <span>
                            Rejected
                        </span>

                        <strong>
                            {number(
                                statistics.rejected_appointments
                            )}
                        </strong>

                    </div>


                    {/* CANCELLED */}

                    <div className="admin-status-card cancelled">

                        <span>
                            Cancelled
                        </span>

                        <strong>
                            {number(
                                statistics.cancelled_appointments
                            )}
                        </strong>

                    </div>

                </div>

            </div>


            {/* ==================================================
                BOTTOM SUMMARY PANELS
            ================================================== */}

            <div className="admin-dashboard-bottom-grid">

                {/* ==================================================
                    REVIEW / PRESCRIPTION SUMMARY
                ================================================== */}

                <div className="admin-dashboard-panel">

                    <div className="admin-panel-header">

                        <div>

                            <h2>
                                Review & Prescription
                                Summary
                            </h2>

                            <p>
                                Patient care activity
                            </p>

                        </div>

                    </div>


                    <div className="admin-summary-list">

                        {/* REVIEWS */}

                        <div className="admin-summary-row">

                            <span>
                                Patient Reviews
                            </span>

                            <strong>
                                {number(
                                    statistics.total_reviews
                                )}
                            </strong>

                        </div>


                        {/* PRESCRIPTIONS */}

                        <div className="admin-summary-row">

                            <span>
                                Prescriptions
                            </span>

                            <strong>
                                {number(
                                    statistics.total_prescriptions
                                )}
                            </strong>

                        </div>


                        {/* PAYMENTS */}

                        <div className="admin-summary-row">

                            <span>
                                Payments
                            </span>

                            <strong>
                                {number(
                                    statistics.total_payments
                                )}
                            </strong>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    SYSTEM SUMMARY
                ================================================== */}

                <div className="admin-dashboard-panel">

                    <div className="admin-panel-header">

                        <div>

                            <h2>
                                System Summary
                            </h2>

                            <p>
                                ClinicCare platform
                                totals
                            </p>

                        </div>

                    </div>


                    <div className="admin-summary-list">

                        {/* USERS */}

                        <div className="admin-summary-row">

                            <span>
                                Total Users
                            </span>

                            <strong>
                                {number(
                                    statistics.total_users
                                )}
                            </strong>

                        </div>


                        {/* HOSPITALS */}

                        <div className="admin-summary-row">

                            <span>
                                Total Hospitals
                            </span>

                            <strong>
                                {number(
                                    statistics.total_hospitals
                                )}
                            </strong>

                        </div>


                        {/* LOCATIONS */}

                        <div className="admin-summary-row">

                            <span>
                                Total Locations
                            </span>

                            <strong>
                                {number(
                                    statistics.total_locations
                                )}
                            </strong>

                        </div>


                        {/* APPOINTMENTS */}

                        <div className="admin-summary-row">

                            <span>
                                Total Appointments
                            </span>

                            <strong>
                                {number(
                                    statistics.total_appointments
                                )}
                            </strong>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default AdminDashboard;