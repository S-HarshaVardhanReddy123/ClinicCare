import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./DoctorDashboard.css";

function formatDate(dateValue) {
    if (!dateValue) return "—";

    const dateString = String(dateValue).split("T")[0];

    const parts = dateString.split("-");

    if (parts.length !== 3) {
        return dateValue;
    }

    const [year, month, day] = parts;

    return `${day}-${month}-${year}`;
}

function formatTime(timeValue) {
    if (!timeValue) return "—";

    const timeString = String(timeValue).substring(0, 5);
    const [hours, minutes] = timeString.split(":");

    let hour = Number(hours);
    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minutes} ${period}`;
}

function getStatusClass(status) {
    return String(status || "").toLowerCase();
}

function DoctorDashboard() {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const doctorUser = JSON.parse(
        localStorage.getItem("cliniccare_user") || "null"
    );

    const doctorName = doctorUser?.name || "Doctor";

    const loadAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/appointments/doctor");

            setAppointments(response.data.appointments || []);
        } catch (err) {
            console.error("Failed to load doctor appointments:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load appointments."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAppointments();
    }, []);

    const stats = useMemo(() => {
        return {
            total: appointments.length,
            pending: appointments.filter(
                (appointment) => appointment.status === "PENDING"
            ).length,
            accepted: appointments.filter(
                (appointment) => appointment.status === "ACCEPTED"
            ).length,
            completed: appointments.filter(
                (appointment) => appointment.status === "COMPLETED"
            ).length,
            rejected: appointments.filter(
                (appointment) => appointment.status === "REJECTED"
            ).length,
        };
    }, [appointments]);

    const updateAppointmentStatus = async (appointmentId, status) => {
        try {
            setActionLoading(`${appointmentId}-${status}`);
            setError("");
            setSuccessMessage("");

            await api.patch(
                `/appointments/doctor/${appointmentId}/status`,
                { status }
            );

            if (status === "ACCEPTED") {
                setSuccessMessage("Appointment accepted successfully.");
            } else if (status === "REJECTED") {
                setSuccessMessage("Appointment rejected.");
            } else if (status === "COMPLETED") {
                setSuccessMessage("Consultation marked as completed.");
            }

            await loadAppointments();
        } catch (err) {
            console.error("Failed to update appointment:", err);

            setError(
                err.response?.data?.message ||
                "Failed to update appointment."
            );
        } finally {
            setActionLoading(null);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("cliniccare_token");
        localStorage.removeItem("cliniccare_user");

        navigate("/login");
    };

    if (loading) {
        return (
            <div className="doctor-dashboard-page">
                <div className="doctor-loading">
                    Loading doctor dashboard...
                </div>
            </div>
        );
    }

    return (
        <div className="doctor-dashboard-page">

            <header className="doctor-dashboard-header">

                <div>
                    <p className="doctor-dashboard-eyebrow">
                        ClinicCare
                    </p>

                    <h1>
                        Doctor Dashboard
                    </h1>

                    <p className="doctor-welcome">
                        Welcome, <strong>{doctorName}</strong>
                    </p>
                </div>

                <button
                    type="button"
                    className="doctor-logout-button"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>

            <main className="doctor-dashboard-content">

                {error && (
                    <div className="doctor-alert doctor-alert-error">
                        {error}
                    </div>
                )}

                {successMessage && (
                    <div className="doctor-alert doctor-alert-success">
                        {successMessage}
                    </div>
                )}

                {/* Statistics */}

                <section className="doctor-stats-grid">

                    <div className="doctor-stat-card">
                        <span className="doctor-stat-icon">📋</span>
                        <div>
                            <p>Total Appointments</p>
                            <h2>{stats.total}</h2>
                        </div>
                    </div>

                    <div className="doctor-stat-card pending">
                        <span className="doctor-stat-icon">⏳</span>
                        <div>
                            <p>Pending</p>
                            <h2>{stats.pending}</h2>
                        </div>
                    </div>

                    <div className="doctor-stat-card accepted">
                        <span className="doctor-stat-icon">✅</span>
                        <div>
                            <p>Accepted</p>
                            <h2>{stats.accepted}</h2>
                        </div>
                    </div>

                    <div className="doctor-stat-card completed">
                        <span className="doctor-stat-icon">🩺</span>
                        <div>
                            <p>Completed</p>
                            <h2>{stats.completed}</h2>
                        </div>
                    </div>

                </section>

                {/* Quick navigation */}

                <section className="doctor-quick-actions">

                    <button
                        type="button"
                        onClick={() => navigate("/doctor/appointments")}
                    >
                        📅 Manage Appointments
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/doctor/availability")}
                    >
                        🕐 Manage Availability
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/doctor/prescriptions")}
                    >
                        💊 Prescriptions
                    </button>

                </section>

                {/* Appointments */}

                <section className="doctor-appointments-section">

                    <div className="doctor-section-header">
                        <div>
                            <h2>My Appointments</h2>
                            <p>
                                Review and manage your patient appointments.
                            </p>
                        </div>

                        <button
                            type="button"
                            className="refresh-button"
                            onClick={loadAppointments}
                        >
                            ↻ Refresh
                        </button>
                    </div>

                    {appointments.length === 0 ? (
                        <div className="doctor-empty-state">
                            <div className="doctor-empty-icon">
                                📅
                            </div>

                            <h3>No appointments found</h3>

                            <p>
                                You currently have no appointments assigned
                                to your account.
                            </p>
                        </div>
                    ) : (
                        <div className="doctor-appointments-list">

                            {appointments.map((appointment) => {

                                const appointmentId = appointment.id;

                                return (
                                    <article
                                        className="doctor-appointment-card"
                                        key={appointmentId}
                                    >

                                        <div className="doctor-appointment-top">

                                            <div>
                                                <span className="appointment-label">
                                                    Appointment #{appointmentId}
                                                </span>

                                                <h3>
                                                    {appointment.patient_name ||
                                                        "Patient"}
                                                </h3>
                                            </div>

                                            <span
                                                className={`appointment-status ${getStatusClass(
                                                    appointment.status
                                                )}`}
                                            >
                                                {appointment.status}
                                            </span>

                                        </div>

                                        <div className="doctor-appointment-info">

                                            <div>
                                                <span>📅 Date</span>
                                                <strong>
                                                    {formatDate(
                                                        appointment.appointment_date
                                                    )}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>🕐 Time</span>
                                                <strong>
                                                    {formatTime(
                                                        appointment.appointment_time
                                                    )}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>🏥 Hospital</span>
                                                <strong>
                                                    {appointment.hospital_name ||
                                                        "—"}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>📧 Patient Email</span>
                                                <strong>
                                                    {appointment.patient_email ||
                                                        "—"}
                                                </strong>
                                            </div>

                                        </div>

                                        {appointment.reason && (
                                            <div className="doctor-reason">
                                                <span>Reason for visit</span>
                                                <p>
                                                    {appointment.reason}
                                                </p>
                                            </div>
                                        )}

                                        <div className="doctor-appointment-actions">

                                            <button
                                                type="button"
                                                className="details-button"
                                                onClick={() =>
                                                    navigate(
                                                        `/doctor/appointments/${appointmentId}`
                                                    )
                                                }
                                            >
                                                View Details
                                            </button>

                                            {appointment.status ===
                                                "PENDING" && (
                                                <>
                                                    <button
                                                        type="button"
                                                        className="accept-button"
                                                        disabled={
                                                            actionLoading !==
                                                            null
                                                        }
                                                        onClick={() =>
                                                            updateAppointmentStatus(
                                                                appointmentId,
                                                                "ACCEPTED"
                                                            )
                                                        }
                                                    >
                                                        {actionLoading ===
                                                        `${appointmentId}-ACCEPTED`
                                                            ? "Accepting..."
                                                            : "✓ Accept"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="reject-button"
                                                        disabled={
                                                            actionLoading !==
                                                            null
                                                        }
                                                        onClick={() =>
                                                            updateAppointmentStatus(
                                                                appointmentId,
                                                                "REJECTED"
                                                            )
                                                        }
                                                    >
                                                        {actionLoading ===
                                                        `${appointmentId}-REJECTED`
                                                            ? "Rejecting..."
                                                            : "✕ Reject"}
                                                    </button>
                                                </>
                                            )}

                                            {appointment.status ===
                                                "ACCEPTED" && (
                                                <button
                                                    type="button"
                                                    className="complete-button"
                                                    disabled={
                                                        actionLoading !== null
                                                    }
                                                    onClick={() =>
                                                        updateAppointmentStatus(
                                                            appointmentId,
                                                            "COMPLETED"
                                                        )
                                                    }
                                                >
                                                    {actionLoading ===
                                                    `${appointmentId}-COMPLETED`
                                                        ? "Completing..."
                                                        : "🩺 Complete Consultation"}
                                                </button>
                                            )}

                                            {appointment.status ===
                                                "COMPLETED" && (
                                                <button
                                                    type="button"
                                                    className="prescription-button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/doctor/appointments/${appointmentId}/prescription`
                                                        )
                                                    }
                                                >
                                                    💊 Create Prescription
                                                </button>
                                            )}

                                        </div>

                                    </article>
                                );
                            })}

                        </div>
                    )}

                </section>

            </main>

        </div>
    );
}

export default DoctorDashboard;