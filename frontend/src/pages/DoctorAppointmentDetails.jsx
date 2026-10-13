import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./DoctorAppointmentDetails.css";

const DoctorAppointmentDetails = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);
    const [doctorNotes, setDoctorNotes] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const fetchAppointment = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/appointments/${appointmentId}`
            );

            if (response.data?.success) {
                setAppointment(response.data.appointment);

                setDoctorNotes(
                    response.data.appointment?.doctor_notes || ""
                );
            } else {
                setError(
                    response.data?.message ||
                    "Unable to load appointment."
                );
            }
        } catch (err) {
            console.error(
                "Appointment details error:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to load appointment."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (appointmentId) {
            fetchAppointment();
        }
    }, [appointmentId]);

    const updateStatus = async (status) => {
        try {
            setUpdating(true);
            setError("");
            setSuccess("");

            const response = await api.patch(
                `/appointments/doctor/${appointmentId}/status`,
                {
                    status,
                    doctorNotes,
                }
            );

            if (response.data?.success) {
                setSuccess(
                    response.data.message ||
                    `Appointment ${status.toLowerCase()} successfully.`
                );

                await fetchAppointment();
            } else {
                setError(
                    response.data?.message ||
                    "Unable to update appointment."
                );
            }
        } catch (err) {
            console.error(
                "Appointment status update error:",
                err
            );

            setError(
                err.response?.data?.message ||
                err.message ||
                "Unable to update appointment."
            );
        } finally {
            setUpdating(false);
        }
    };

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "Not specified";
        }

        const datePart = String(dateValue).split("T")[0];

        const parts = datePart.split("-").map(Number);

        if (parts.length !== 3) {
            return dateValue;
        }

        const [year, month, day] = parts;

        const date = new Date(
            year,
            month - 1,
            day
        );

        return date.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const formatTime = (timeValue) => {
        if (!timeValue) {
            return "Not specified";
        }

        const parts = String(timeValue)
            .substring(0, 5)
            .split(":");

        const hour = Number(parts[0]);
        const minute = Number(parts[1]);

        if (Number.isNaN(hour)) {
            return timeValue;
        }

        const suffix = hour >= 12 ? "PM" : "AM";

        const displayHour =
            hour % 12 === 0 ? 12 : hour % 12;

        return `${displayHour}:${String(
            minute || 0
        ).padStart(2, "0")} ${suffix}`;
    };

    const getStatusClass = (status) => {
        return String(status || "")
            .toLowerCase()
            .replace("_", "-");
    };

    if (loading) {
        return (
            <div className="doctor-appointment-details-page">
                <div className="doctor-appointment-loading">
                    <div className="doctor-loading-icon">
                        A
                    </div>

                    <h2>
                        Loading appointment...
                    </h2>

                    <p>
                        Please wait.
                    </p>
                </div>
            </div>
        );
    }

    if (error && !appointment) {
        return (
            <div className="doctor-appointment-details-page">

                <button
                    type="button"
                    className="doctor-appointment-back"
                    onClick={() =>
                        navigate("/doctor/dashboard")
                    }
                >
                    Back to Dashboard
                </button>

                <div className="doctor-appointment-error">

                    <div className="doctor-error-icon">
                        !
                    </div>

                    <h2>
                        Unable to load appointment
                    </h2>

                    <p>
                        {error}
                    </p>

                </div>
            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="doctor-appointment-details-page">

                <button
                    type="button"
                    className="doctor-appointment-back"
                    onClick={() =>
                        navigate("/doctor/dashboard")
                    }
                >
                    Back to Dashboard
                </button>

                <div className="doctor-appointment-error">

                    <div className="doctor-error-icon">
                        ?
                    </div>

                    <h2>
                        Appointment not found
                    </h2>

                    <p>
                        The requested appointment could not
                        be found.
                    </p>

                </div>
            </div>
        );
    }

    return (
        <div className="doctor-appointment-details-page">

            {/* HEADER */}

            <div className="doctor-appointment-page-header">

                <div>

                    <button
                        type="button"
                        className="doctor-appointment-back"
                        onClick={() =>
                            navigate("/doctor/dashboard")
                        }
                    >
                        Back to Dashboard
                    </button>

                    <div className="doctor-page-label">
                        APPOINTMENT DETAILS
                    </div>

                    <h1>
                        Appointment #{appointment.id}
                    </h1>

                </div>

                <span
                    className={`doctor-status-badge ${getStatusClass(
                        appointment.status
                    )}`}
                >
                    {appointment.status}
                </span>

            </div>


            {/* MESSAGES */}

            {error && (
                <div className="doctor-message doctor-message-error">
                    {error}
                </div>
            )}

            {success && (
                <div className="doctor-message doctor-message-success">
                    {success}
                </div>
            )}


            {/* MAIN GRID */}

            <div className="doctor-appointment-grid">

                {/* PATIENT */}

                <section className="doctor-appointment-card">

                    <div className="doctor-card-heading">

                        <div className="doctor-card-icon">
                            P
                        </div>

                        <div>
                            <h2>
                                Patient Information
                            </h2>

                            <p>
                                Patient details
                            </p>
                        </div>

                    </div>


                    <div className="doctor-info-list">

                        <div className="doctor-info-row">
                            <span>
                                Name
                            </span>

                            <strong>
                                {appointment.patient_name ||
                                    "Not available"}
                            </strong>
                        </div>

                        <div className="doctor-info-row">
                            <span>
                                Email
                            </span>

                            <strong>
                                {appointment.patient_email ||
                                    "Not available"}
                            </strong>
                        </div>

                        <div className="doctor-info-row">
                            <span>
                                Phone
                            </span>

                            <strong>
                                {appointment.patient_phone ||
                                    "Not available"}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* APPOINTMENT */}

                <section className="doctor-appointment-card">

                    <div className="doctor-card-heading">

                        <div className="doctor-card-icon">
                            A
                        </div>

                        <div>
                            <h2>
                                Appointment Information
                            </h2>

                            <p>
                                Scheduled consultation
                            </p>
                        </div>

                    </div>


                    <div className="doctor-info-list">

                        <div className="doctor-info-row">
                            <span>
                                Date
                            </span>

                            <strong>
                                {formatDate(
                                    appointment.appointment_date
                                )}
                            </strong>
                        </div>

                        <div className="doctor-info-row">
                            <span>
                                Time
                            </span>

                            <strong>
                                {formatTime(
                                    appointment.appointment_time
                                )}
                            </strong>
                        </div>

                        <div className="doctor-info-row">
                            <span>
                                Hospital
                            </span>

                            <strong>
                                {appointment.hospital_name ||
                                    "Not available"}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* REASON */}

                <section className="doctor-appointment-card doctor-full-width">

                    <div className="doctor-card-heading">

                        <div className="doctor-card-icon">
                            R
                        </div>

                        <div>
                            <h2>
                                Reason for Visit
                            </h2>

                            <p>
                                Patient's consultation request
                            </p>
                        </div>

                    </div>

                    <div className="doctor-reason-box">
                        {appointment.reason ||
                            "No reason was provided."}
                    </div>

                </section>


                {/* NOTES */}

                <section className="doctor-appointment-card doctor-full-width">

                    <div className="doctor-card-heading">

                        <div className="doctor-card-icon">
                            N
                        </div>

                        <div>
                            <h2>
                                Doctor Notes
                            </h2>

                            <p>
                                Add notes for this appointment
                            </p>
                        </div>

                    </div>

                    <textarea
                        className="doctor-notes-input"
                        value={doctorNotes}
                        onChange={(event) =>
                            setDoctorNotes(
                                event.target.value
                            )
                        }
                        placeholder="Enter consultation notes..."
                        rows={5}
                        disabled={
                            appointment.status ===
                                "REJECTED" ||
                            appointment.status ===
                                "COMPLETED" ||
                            appointment.status ===
                                "NO_SHOW"
                        }
                    />

                </section>

            </div>


            {/* ACTIONS */}

            <section className="doctor-appointment-actions">

                <div>
                    <h2>
                        Appointment Actions
                    </h2>

                    <p>
                        Update the status of this patient appointment.
                    </p>
                </div>


                <div className="doctor-action-buttons">

                    {appointment.status === "PENDING" && (
                        <>
                            <button
                                type="button"
                                className="doctor-reject-button"
                                disabled={updating}
                                onClick={() =>
                                    updateStatus("REJECTED")
                                }
                            >
                                {updating
                                    ? "Updating..."
                                    : "Reject Appointment"}
                            </button>

                            <button
                                type="button"
                                className="doctor-accept-button"
                                disabled={updating}
                                onClick={() =>
                                    updateStatus("ACCEPTED")
                                }
                            >
                                {updating
                                    ? "Updating..."
                                    : "Accept Appointment"}
                            </button>
                        </>
                    )}


                    {appointment.status === "ACCEPTED" && (
                        <button
                            type="button"
                            className="doctor-complete-button"
                            disabled={updating}
                            onClick={() =>
                                updateStatus("COMPLETED")
                            }
                        >
                            {updating
                                ? "Completing..."
                                : "Complete Consultation"}
                        </button>
                    )}


                    {appointment.status === "COMPLETED" && (
                        <button
                            type="button"
                            className="doctor-prescription-button"
                            onClick={() =>
                                navigate(
                                    `/doctor/appointments/${appointment.id}/prescription`
                                )
                            }
                        >
                            Create Prescription
                        </button>
                    )}

                </div>

            </section>

        </div>
    );
};

export default DoctorAppointmentDetails;