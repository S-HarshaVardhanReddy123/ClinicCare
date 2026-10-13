import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Dashboard.css";


const Dashboard = () => {

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // ============================================================
    // LOAD PATIENT APPOINTMENTS
    // ============================================================

    const fetchAppointments = async () => {

        try {

            setError("");

            const response = await api.get(
                "/appointments/my"
            );

            if (response.data?.success) {

                setAppointments(
                    response.data.appointments || []
                );

            } else {

                setAppointments([]);

                setError(
                    response.data?.message ||
                    "Unable to load appointments."
                );

            }

        } catch (err) {

            console.error(
                "Patient dashboard appointments error:",
                err
            );

            setAppointments([]);

            setError(
                err.response?.data?.message ||
                "Unable to load appointments."
            );

        } finally {

            setLoading(false);

        }

    };


    // ============================================================
    // INITIAL LOAD
    // ============================================================

    useEffect(() => {

        fetchAppointments();

    }, []);


    // ============================================================
    // FORMAT DATE
    // ============================================================

    const formatDate = (dateValue) => {

        if (!dateValue) {
            return "Date unavailable";
        }

        const datePart =
            String(dateValue).split("T")[0];

        const parts =
            datePart.split("-").map(Number);

        if (parts.length !== 3) {
            return String(dateValue);
        }

        const [year, month, day] = parts;

        if (
            !year ||
            !month ||
            !day
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
                weekday: "short",
                day: "numeric",
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
            return "Time unavailable";
        }

        const timePart =
            String(timeValue).substring(0, 5);

        const [hours, minutes] =
            timePart.split(":").map(Number);

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
                hour: "numeric",
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
                return "patient-dashboard-status pending";

            case "ACCEPTED":
                return "patient-dashboard-status accepted";

            case "COMPLETED":
                return "patient-dashboard-status completed";

            case "REJECTED":
                return "patient-dashboard-status rejected";

            case "CANCELLED":
                return "patient-dashboard-status cancelled";

            case "NO_SHOW":
                return "patient-dashboard-status no-show";

            default:
                return "patient-dashboard-status";

        }

    };


    // ============================================================
    // APPOINTMENT COUNTS
    // ============================================================

    const pendingCount =
        appointments.filter(
            (appointment) =>
                appointment.status === "PENDING"
        ).length;


    const acceptedCount =
        appointments.filter(
            (appointment) =>
                appointment.status === "ACCEPTED"
        ).length;


    const completedCount =
        appointments.filter(
            (appointment) =>
                appointment.status === "COMPLETED"
        ).length;


    // ============================================================
    // RECENT APPOINTMENTS
    // ============================================================

    const recentAppointments =
        appointments.slice(0, 5);


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {

        return (
            <div className="patient-dashboard-page">

                <div className="patient-dashboard-loading">

                    <div className="patient-dashboard-loading-icon">
                        +
                    </div>

                    <h2>
                        Loading your dashboard...
                    </h2>

                    <p>
                        Please wait.
                    </p>

                </div>

            </div>
        );

    }


    // ============================================================
    // DASHBOARD
    // ============================================================

    return (

        <div className="patient-dashboard-page">


            {/* ==================================================
                PAGE HEADER
            ================================================== */}

            <div className="patient-dashboard-header">

                <div>

                    <div className="patient-dashboard-label">
                        PATIENT DASHBOARD
                    </div>

                    <h1>
                        Welcome back
                    </h1>

                    <p>
                        Manage your appointments and healthcare
                        information.
                    </p>

                </div>


                <button
                    type="button"
                    className="patient-dashboard-refresh"
                    onClick={fetchAppointments}
                >
                    Refresh
                </button>

            </div>


            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (

                <div className="patient-dashboard-error">

                    <strong>
                        Unable to load appointments
                    </strong>

                    <span>
                        {error}
                    </span>

                    <button
                        type="button"
                        onClick={fetchAppointments}
                    >
                        Try Again
                    </button>

                </div>

            )}


            {/* ==================================================
                STATISTICS
            ================================================== */}

            <div className="patient-dashboard-stat-grid">


                {/* PENDING */}

                <div className="patient-dashboard-stat-card">

                    <div className="patient-dashboard-stat-icon pending">
                        ⏳
                    </div>

                    <div>

                        <span>
                            Pending
                        </span>

                        <strong>
                            {pendingCount}
                        </strong>

                        <small>
                            Awaiting response
                        </small>

                    </div>

                </div>


                {/* ACCEPTED */}

                <div className="patient-dashboard-stat-card">

                    <div className="patient-dashboard-stat-icon accepted">
                        ✓
                    </div>

                    <div>

                        <span>
                            Confirmed
                        </span>

                        <strong>
                            {acceptedCount}
                        </strong>

                        <small>
                            Upcoming appointments
                        </small>

                    </div>

                </div>


                {/* COMPLETED */}

                <div className="patient-dashboard-stat-card">

                    <div className="patient-dashboard-stat-icon completed">
                        +
                    </div>

                    <div>

                        <span>
                            Completed
                        </span>

                        <strong>
                            {completedCount}
                        </strong>

                        <small>
                            Completed consultations
                        </small>

                    </div>

                </div>


            </div>


            {/* ==================================================
                QUICK ACTIONS
            ================================================== */}

            <section className="patient-dashboard-section">

                <div className="patient-dashboard-section-heading">

                    <div>

                        <div className="patient-dashboard-section-label">
                            QUICK ACTIONS
                        </div>

                        <h2>
                            Find Healthcare
                        </h2>

                        <p>
                            Find hospitals and doctors and book
                            an appointment.
                        </p>

                    </div>

                </div>


                <div className="patient-dashboard-actions">


                    <button
                        type="button"
                        className="patient-dashboard-action-card"
                        onClick={() =>
                            navigate("/location")
                        }
                    >

                        <div className="patient-dashboard-action-icon">
                            +
                        </div>

                        <div>

                            <strong>
                                Find Hospitals
                            </strong>

                            <span>
                                Search hospitals by location
                            </span>

                        </div>

                        <b>
                            →
                        </b>

                    </button>


                    <button
                        type="button"
                        className="patient-dashboard-action-card"
                        onClick={() =>
                            navigate("/appointments")
                        }
                    >

                        <div className="patient-dashboard-action-icon calendar">
                            ▣
                        </div>

                        <div>

                            <strong>
                                My Appointments
                            </strong>

                            <span>
                                View and manage your appointments
                            </span>

                        </div>

                        <b>
                            →
                        </b>

                    </button>


                </div>

            </section>


            {/* ==================================================
                RECENT APPOINTMENTS
            ================================================== */}

            <section className="patient-dashboard-section">

                <div className="patient-dashboard-section-heading">

                    <div>

                        <div className="patient-dashboard-section-label">
                            APPOINTMENTS
                        </div>

                        <h2>
                            Recent Appointments
                        </h2>

                        <p>
                            Your latest appointment activity.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="patient-dashboard-view-all"
                        onClick={() =>
                            navigate("/appointments")
                        }
                    >
                        View All
                    </button>

                </div>


                {recentAppointments.length === 0 ? (

                    <div className="patient-dashboard-empty">

                        <div className="patient-dashboard-empty-icon">
                            ▣
                        </div>

                        <h3>
                            No appointments yet
                        </h3>

                        <p>
                            Find a doctor and book your first
                            appointment.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/location")
                            }
                        >
                            Find a Hospital
                        </button>

                    </div>

                ) : (

                    <div className="patient-dashboard-appointment-list">

                        {recentAppointments.map(
                            (appointment) => (

                                <article
                                    key={appointment.id}
                                    className="patient-dashboard-appointment-card"
                                    onClick={() =>
                                        navigate(
                                            `/appointments/${appointment.id}`
                                        )
                                    }
                                >

                                    <div className="patient-appointment-main">

                                        <div className="patient-appointment-icon">
                                            +
                                        </div>

                                        <div>

                                            <h3>
                                                {appointment.doctor_name ||
                                                    "Doctor"}
                                            </h3>

                                            <p>
                                                {appointment.specialization ||
                                                    "Medical consultation"}
                                            </p>

                                        </div>

                                    </div>


                                    <div className="patient-appointment-details">

                                        <div>

                                            <span>
                                                DATE
                                            </span>

                                            <strong>
                                                {formatDate(
                                                    appointment.appointment_date
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                TIME
                                            </span>

                                            <strong>
                                                {formatTime(
                                                    appointment.appointment_time
                                                )}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                HOSPITAL
                                            </span>

                                            <strong>
                                                {appointment.hospital_name ||
                                                    "Hospital"}
                                            </strong>

                                        </div>

                                    </div>


                                    <div className="patient-appointment-status">

                                        <span
                                            className={getStatusClass(
                                                appointment.status
                                            )}
                                        >
                                            {appointment.status}
                                        </span>

                                        <span className="patient-appointment-arrow">
                                            →
                                        </span>

                                    </div>

                                </article>

                            )
                        )}

                    </div>

                )}

            </section>


        </div>

    );

};


export default Dashboard;