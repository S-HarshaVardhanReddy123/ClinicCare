import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./DoctorAppointments.css";

function formatDate(dateValue) {
    if (!dateValue) return "—";

    const value = String(dateValue).split("T")[0];
    const parts = value.split("-");

    if (parts.length !== 3) {
        return value;
    }

    const [year, month, day] = parts;

    return `${day}-${month}-${year}`;
}

function formatTime(timeValue) {
    if (!timeValue) return "—";

    const value = String(timeValue).substring(0, 5);
    const [hours, minutes] = value.split(":");

    let hour = Number(hours);

    if (Number.isNaN(hour)) {
        return value;
    }

    const period = hour >= 12 ? "PM" : "AM";

    hour = hour % 12 || 12;

    return `${hour}:${minutes} ${period}`;
}

function DoctorAppointments() {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState("ALL");
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const loadAppointments = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/appointments/doctor");

            setAppointments(response.data.appointments || []);
        } catch (err) {
            console.error(
                "Doctor appointments error:",
                err
            );

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

    const filteredAppointments = useMemo(() => {
        if (selectedStatus === "ALL") {
            return appointments;
        }

        return appointments.filter(
            (appointment) =>
                appointment.status === selectedStatus
        );
    }, [appointments, selectedStatus]);

    const counts = useMemo(() => {
        return {
            all: appointments.length,

            pending: appointments.filter(
                (item) => item.status === "PENDING"
            ).length,

            accepted: appointments.filter(
                (item) => item.status === "ACCEPTED"
            ).length,

            completed: appointments.filter(
                (item) => item.status === "COMPLETED"
            ).length,

            rejected: appointments.filter(
                (item) => item.status === "REJECTED"
            ).length,
        };
    }, [appointments]);

    const updateStatus = async (
        appointmentId,
        status
    ) => {
        try {
            setActionLoading(
                `${appointmentId}-${status}`
            );

            setError("");
            setSuccessMessage("");

            await api.patch(
                `/appointments/doctor/${appointmentId}/status`,
                { status }
            );

            if (status === "ACCEPTED") {
                setSuccessMessage(
                    "Appointment accepted successfully."
                );
            }

            if (status === "REJECTED") {
                setSuccessMessage(
                    "Appointment rejected successfully."
                );
            }

            if (status === "COMPLETED") {
                setSuccessMessage(
                    "Consultation completed successfully."
                );
            }

            await loadAppointments();
        } catch (err) {
            console.error(
                "Update appointment error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to update appointment."
            );
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <div className="doctor-appointments-page">
                <div className="doctor-appointments-loading">
                    Loading appointments...
                </div>
            </div>
        );
    }

    return (
        <div className="doctor-appointments-page">

            {/* PAGE HEADER */}

            <div className="doctor-appointments-header">

                <div>
                    <div className="doctor-page-label">
                        DOCTOR PORTAL
                    </div>

                    <h1>
                        Appointments
                    </h1>

                    <p>
                        Manage your patient appointments
                        and consultations.
                    </p>
                </div>

                <button
                    type="button"
                    className="doctor-refresh-button"
                    onClick={loadAppointments}
                >
                    ↻ Refresh
                </button>

            </div>


            {/* ALERTS */}

            {error && (
                <div className="doctor-appointment-alert error">
                    {error}
                </div>
            )}

            {successMessage && (
                <div className="doctor-appointment-alert success">
                    {successMessage}
                </div>
            )}


            {/* FILTERS */}

            <div className="doctor-appointment-filters">

                <button
                    type="button"
                    className={
                        selectedStatus === "ALL"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedStatus("ALL")
                    }
                >
                    All
                    <span>{counts.all}</span>
                </button>

                <button
                    type="button"
                    className={
                        selectedStatus === "PENDING"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedStatus("PENDING")
                    }
                >
                    Pending
                    <span>{counts.pending}</span>
                </button>

                <button
                    type="button"
                    className={
                        selectedStatus === "ACCEPTED"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedStatus("ACCEPTED")
                    }
                >
                    Accepted
                    <span>{counts.accepted}</span>
                </button>

                <button
                    type="button"
                    className={
                        selectedStatus === "COMPLETED"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedStatus("COMPLETED")
                    }
                >
                    Completed
                    <span>{counts.completed}</span>
                </button>

                <button
                    type="button"
                    className={
                        selectedStatus === "REJECTED"
                            ? "active"
                            : ""
                    }
                    onClick={() =>
                        setSelectedStatus("REJECTED")
                    }
                >
                    Rejected
                    <span>{counts.rejected}</span>
                </button>

            </div>


            {/* APPOINTMENTS */}

            {filteredAppointments.length === 0 ? (

                <div className="doctor-no-appointments">

                    <div className="doctor-no-appointments-icon">
                        📅
                    </div>

                    <h2>
                        No appointments
                    </h2>

                    <p>
                        There are no appointments in the
                        selected category.
                    </p>

                </div>

            ) : (

                <div className="doctor-appointments-grid">

                    {filteredAppointments.map(
                        (appointment) => {

                            const appointmentId =
                                appointment.id;

                            return (
                                <article
                                    key={appointmentId}
                                    className="doctor-appointment-item"
                                >

                                    {/* HEADER */}

                                    <div className="appointment-item-header">

                                        <div>
                                            <span className="appointment-number">
                                                APPOINTMENT #
                                                {appointmentId}
                                            </span>

                                            <h2>
                                                {appointment.patient_name ||
                                                    "Patient"}
                                            </h2>
                                        </div>

                                        <span
                                            className={`appointment-badge ${String(
                                                appointment.status
                                            ).toLowerCase()}`}
                                        >
                                            {appointment.status}
                                        </span>

                                    </div>


                                    {/* PATIENT */}

                                    <div className="appointment-patient">

                                        <div className="patient-avatar">
                                            {(
                                                appointment.patient_name ||
                                                "P"
                                            )
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <strong>
                                                {appointment.patient_name ||
                                                    "Patient"}
                                            </strong>

                                            <span>
                                                {appointment.patient_email ||
                                                    "No email available"}
                                            </span>

                                            {appointment.patient_phone && (
                                                <span>
                                                    {
                                                        appointment.patient_phone
                                                    }
                                                </span>
                                            )}
                                        </div>

                                    </div>


                                    {/* APPOINTMENT DETAILS */}

                                    <div className="appointment-details">

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
                                                    "—"}
                                            </strong>
                                        </div>

                                    </div>


                                    {/* REASON */}

                                    {appointment.reason && (
                                        <div className="appointment-reason">

                                            <span>
                                                Reason for visit
                                            </span>

                                            <p>
                                                {appointment.reason}
                                            </p>

                                        </div>
                                    )}


                                    {/* ACTIONS */}

                                    <div className="appointment-actions">

                                        <button
                                            type="button"
                                            className="view-button"
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
                                                        updateStatus(
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
                                                        updateStatus(
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
                                                    actionLoading !==
                                                    null
                                                }
                                                onClick={() =>
                                                    updateStatus(
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
                        }
                    )}

                </div>
            )}

        </div>
    );
}

export default DoctorAppointments;