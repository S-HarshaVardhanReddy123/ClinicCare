import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "./Appointments.css";


const Appointments = () => {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ============================================================
    // FETCH PATIENT APPOINTMENTS
    // ============================================================

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            console.log(
                "Loading patient appointments..."
            );

            const response = await api.get(
                "/appointments/my"
            );

            console.log(
                "Patient appointments API response:",
                response.data
            );

            const responseAppointments =
                response.data?.appointments ??
                response.data?.data?.appointments ??
                [];

            if (!Array.isArray(responseAppointments)) {
                console.error(
                    "Unexpected appointments response:",
                    response.data
                );

                setAppointments([]);

                setError(
                    "The server returned an invalid appointments response."
                );

                return;
            }

            setAppointments(
                responseAppointments
            );

        } catch (err) {
            console.error(
                "Failed to load patient appointments:",
                err
            );

            const message =
                err.response?.data?.message ||
                err.message ||
                "Failed to load your appointments.";

            setError(message);

            setAppointments([]);

        } finally {
            setLoading(false);
        }
    };


    // ============================================================
    // LOAD APPOINTMENTS
    // ============================================================

    useEffect(() => {
        fetchAppointments();
    }, []);


    // ============================================================
    // FORMAT DATE
    // ============================================================

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "Not available";
        }

        const dateString = String(
            dateValue
        ).split("T")[0];

        const parts =
            dateString.split("-");

        if (parts.length !== 3) {
            return String(dateValue);
        }

        const year = Number(parts[0]);
        const month = Number(parts[1]);
        const day = Number(parts[2]);

        if (
            Number.isNaN(year) ||
            Number.isNaN(month) ||
            Number.isNaN(day)
        ) {
            return String(dateValue);
        }

        const date = new Date(
            year,
            month - 1,
            day
        );

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    // ============================================================
    // FORMAT TIME
    // ============================================================

    const formatTime = (timeValue) => {
        if (!timeValue) {
            return "Not available";
        }

        const timeString =
            String(timeValue).substring(
                0,
                5
            );

        const parts =
            timeString.split(":");

        if (parts.length < 2) {
            return String(timeValue);
        }

        const hours = Number(parts[0]);
        const minutes = Number(parts[1]);

        if (
            Number.isNaN(hours) ||
            Number.isNaN(minutes)
        ) {
            return String(timeValue);
        }

        const date = new Date();

        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);

        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
        );
    };


    // ============================================================
    // STATUS CLASS
    // ============================================================

    const getStatusClass = (status) => {
        switch (status) {
            case "PENDING":
                return "status-pending";

            case "ACCEPTED":
                return "status-accepted";

            case "COMPLETED":
                return "status-completed";

            case "REJECTED":
                return "status-rejected";

            case "CANCELLED":
                return "status-cancelled";

            case "NO_SHOW":
                return "status-no-show";

            default:
                return "status-default";
        }
    };


    // ============================================================
    // STATUS LABEL
    // ============================================================

    const getStatusLabel = (status) => {
        switch (status) {
            case "PENDING":
                return "Pending";

            case "ACCEPTED":
                return "Confirmed";

            case "COMPLETED":
                return "Completed";

            case "REJECTED":
                return "Rejected";

            case "CANCELLED":
                return "Cancelled";

            case "NO_SHOW":
                return "No Show";

            default:
                return status || "Unknown";
        }
    };


    // ============================================================
    // APPOINTMENT COUNTS
    // ============================================================

    const appointmentCounts = useMemo(
        () => ({
            total: appointments.length,

            pending: appointments.filter(
                (appointment) =>
                    appointment.status ===
                    "PENDING"
            ).length,

            accepted: appointments.filter(
                (appointment) =>
                    appointment.status ===
                    "ACCEPTED"
            ).length,

            completed: appointments.filter(
                (appointment) =>
                    appointment.status ===
                    "COMPLETED"
            ).length,

            rejected: appointments.filter(
                (appointment) =>
                    appointment.status ===
                    "REJECTED"
            ).length,
        }),
        [appointments]
    );


    // ============================================================
    // NAVIGATION
    // ============================================================

    const handleBookAppointment = () => {
        navigate("/doctors");
    };


    const handleViewAppointment = (
        appointmentId
    ) => {
        navigate(
            `/appointments/${appointmentId}`
        );
    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="appointments-page">

                <div className="appointments-loading">

                    <div className="loading-spinner"></div>

                    <p>
                        Loading your appointments...
                    </p>

                </div>

            </div>
        );
    }


    // ============================================================
    // PAGE
    // ============================================================

    return (
        <div className="appointments-page">

            {/* =================================================
                HEADER
            ================================================== */}

            <div className="appointments-header">

                <div>

                    <p className="appointments-eyebrow">
                        MY HEALTHCARE
                    </p>

                    <h1>
                        My Appointments
                    </h1>

                    <p className="appointments-subtitle">
                        View and manage your upcoming
                        and previous appointments.
                    </p>

                </div>


                <button
                    type="button"
                    className="book-appointment-btn"
                    onClick={
                        handleBookAppointment
                    }
                >
                    <span>+</span>

                    Book Appointment
                </button>

            </div>


            {/* =================================================
                ERROR
            ================================================== */}

            {error && (
                <div className="appointments-error">

                    <div className="error-icon">
                        !
                    </div>

                    <div>

                        <h3>
                            Unable to load appointments
                        </h3>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            className="retry-btn"
                            onClick={
                                fetchAppointments
                            }
                        >
                            Try Again
                        </button>

                    </div>

                </div>
            )}


            {/* =================================================
                SUMMARY
            ================================================== */}

            {!error && (
                <div className="appointments-summary">

                    <div className="summary-card">

                        <span className="summary-number">
                            {
                                appointmentCounts.total
                            }
                        </span>

                        <span className="summary-label">
                            Total
                        </span>

                    </div>


                    <div className="summary-card">

                        <span className="summary-number">
                            {
                                appointmentCounts.pending
                            }
                        </span>

                        <span className="summary-label">
                            Pending
                        </span>

                    </div>


                    <div className="summary-card">

                        <span className="summary-number">
                            {
                                appointmentCounts.accepted
                            }
                        </span>

                        <span className="summary-label">
                            Confirmed
                        </span>

                    </div>


                    <div className="summary-card">

                        <span className="summary-number">
                            {
                                appointmentCounts.completed
                            }
                        </span>

                        <span className="summary-label">
                            Completed
                        </span>

                    </div>


                    <div className="summary-card">

                        <span className="summary-number">
                            {
                                appointmentCounts.rejected
                            }
                        </span>

                        <span className="summary-label">
                            Rejected
                        </span>

                    </div>

                </div>
            )}


            {/* =================================================
                EMPTY STATE
            ================================================== */}

            {!error &&
                appointments.length === 0 && (
                    <div className="appointments-empty">

                        <div className="empty-icon">
                            📅
                        </div>

                        <h2>
                            No appointments yet
                        </h2>

                        <p>
                            You haven't booked any
                            appointments yet.
                        </p>

                        <button
                            type="button"
                            className="empty-book-btn"
                            onClick={
                                handleBookAppointment
                            }
                        >
                            Find a Doctor
                        </button>

                    </div>
                )}


            {/* =================================================
                APPOINTMENT LIST
            ================================================== */}

            {!error &&
                appointments.length > 0 && (
                    <div className="appointments-list">

                        {appointments.map(
                            (appointment) => (
                                <div
                                    className="appointment-card"
                                    key={
                                        appointment.id
                                    }
                                >

                                    {/* =================================
                                        HEADER
                                    ================================== */}

                                    <div className="appointment-card-header">

                                        <div className="appointment-doctor">

                                            <div className="doctor-avatar">
                                                {(
                                                    appointment.doctor_name ||
                                                    "D"
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>


                                            <div>

                                                <h2>
                                                    {
                                                        appointment.doctor_name ||
                                                        "Doctor"
                                                    }
                                                </h2>

                                                <p>
                                                    {
                                                        appointment.specialization ||
                                                        "Medical Specialist"
                                                    }
                                                </p>

                                            </div>

                                        </div>


                                        <span
                                            className={`appointment-status ${getStatusClass(
                                                appointment.status
                                            )}`}
                                        >
                                            {
                                                getStatusLabel(
                                                    appointment.status
                                                )
                                            }
                                        </span>

                                    </div>


                                    {/* =================================
                                        DETAILS
                                    ================================== */}

                                    <div className="appointment-details-grid">

                                        {/* Date */}

                                        <div className="appointment-detail">

                                            <span className="detail-icon">
                                                📅
                                            </span>

                                            <div>

                                                <span className="detail-label">
                                                    Date
                                                </span>

                                                <strong>
                                                    {
                                                        formatDate(
                                                            appointment.appointment_date
                                                        )
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Time */}

                                        <div className="appointment-detail">

                                            <span className="detail-icon">
                                                🕐
                                            </span>

                                            <div>

                                                <span className="detail-label">
                                                    Time
                                                </span>

                                                <strong>
                                                    {
                                                        formatTime(
                                                            appointment.appointment_time
                                                        )
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Hospital */}

                                        <div className="appointment-detail">

                                            <span className="detail-icon">
                                                🏥
                                            </span>

                                            <div>

                                                <span className="detail-label">
                                                    Hospital
                                                </span>

                                                <strong>
                                                    {
                                                        appointment.hospital_name ||
                                                        "Hospital"
                                                    }
                                                </strong>

                                            </div>

                                        </div>


                                        {/* Address */}

                                        <div className="appointment-detail">

                                            <span className="detail-icon">
                                                📍
                                            </span>

                                            <div>

                                                <span className="detail-label">
                                                    Address
                                                </span>

                                                <strong>
                                                    {
                                                        appointment.hospital_address ||
                                                        "Address not available"
                                                    }
                                                </strong>

                                            </div>

                                        </div>

                                    </div>


                                    {/* =================================
                                        REASON
                                    ================================== */}

                                    {appointment.reason && (
                                        <div className="appointment-reason">

                                            <span>
                                                Reason for visit
                                            </span>

                                            <p>
                                                {
                                                    appointment.reason
                                                }
                                            </p>

                                        </div>
                                    )}


                                    {/* =================================
                                        FOOTER
                                    ================================== */}

                                    <div className="appointment-card-footer">

                                        <span className="appointment-id">
                                            Appointment #
                                            {
                                                appointment.id
                                            }
                                        </span>


                                        <button
                                            type="button"
                                            className="view-appointment-btn"
                                            onClick={() =>
                                                handleViewAppointment(
                                                    appointment.id
                                                )
                                            }
                                        >
                                            View Details

                                            <span>
                                                →
                                            </span>
                                        </button>

                                    </div>

                                </div>
                            )
                        )}

                    </div>
                )}

        </div>
    );
};


export default Appointments;