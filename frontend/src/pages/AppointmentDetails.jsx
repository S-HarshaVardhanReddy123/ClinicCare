import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./AppointmentDetails.css";

const AppointmentDetails = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [appointment, setAppointment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/appointments/${appointmentId}`
                );

                setAppointment(response.data.appointment);
            } catch (err) {
                console.error("Failed to load appointment:", err);

                setError(
                    err.response?.data?.message ||
                    "Failed to load appointment details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [appointmentId]);

    const formatDate = (dateValue) => {
        if (!dateValue) return "Not available";

        const datePart = String(dateValue).split("T")[0];

        const [year, month, day] = datePart
            .split("-")
            .map(Number);

        if (!year || !month || !day) {
            return dateValue;
        }

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
        if (!timeValue) return "Not available";

        const [hours, minutes] = String(timeValue)
            .split(":")
            .map(Number);

        if (
            Number.isNaN(hours) ||
            Number.isNaN(minutes)
        ) {
            return timeValue;
        }

        const date = new Date();

        date.setHours(hours, minutes, 0, 0);

        return date.toLocaleTimeString("en-IN", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    };

    const getStatusClass = (status) => {
        return String(status || "")
            .toLowerCase()
            .replace(/\s+/g, "-");
    };

    if (loading) {
        return (
            <div className="appointment-details-page">
                <div className="appointment-details-loading">
                    Loading appointment details...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="appointment-details-page">

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/appointments")}
                >
                    ← Back to Appointments
                </button>

                <div className="appointment-details-error">
                    {error}
                </div>

            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="appointment-details-page">

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate("/appointments")}
                >
                    ← Back to Appointments
                </button>

                <div className="appointment-details-error">
                    Appointment not found.
                </div>

            </div>
        );
    }

    return (
        <div className="appointment-details-page">

            {/* Header */}

            <div className="appointment-details-header">

                <div>

                    <button
                        type="button"
                        className="back-button"
                        onClick={() => navigate("/appointments")}
                    >
                        ← Back to Appointments
                    </button>

                    <h1>
                        Appointment Details
                    </h1>

                    <p>
                        View your appointment information and status.
                    </p>

                </div>

                <div
                    className={`appointment-status ${getStatusClass(
                        appointment.status
                    )}`}
                >
                    {appointment.status}
                </div>

            </div>


            {/* Appointment Information */}

            <section className="details-card">

                <div className="details-card-title">
                    <span className="details-card-icon">
                        📅
                    </span>

                    <div>
                        <h2>
                            Appointment Information
                        </h2>

                        <p>
                            Appointment #{appointment.id}
                        </p>
                    </div>
                </div>


                <div className="details-grid">

                    <div className="detail-item">

                        <span className="detail-label">
                            Appointment Date
                        </span>

                        <strong>
                            {formatDate(
                                appointment.appointment_date
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span className="detail-label">
                            Appointment Time
                        </span>

                        <strong>
                            {formatTime(
                                appointment.appointment_time
                            )}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span className="detail-label">
                            Status
                        </span>

                        <strong>
                            {appointment.status}
                        </strong>

                    </div>


                    <div className="detail-item">

                        <span className="detail-label">
                            Booking ID
                        </span>

                        <strong>
                            #{appointment.id}
                        </strong>

                    </div>

                </div>

            </section>


            {/* Doctor Information */}

            <section className="details-card">

                <div className="details-card-title">

                    <span className="details-card-icon">
                        👨‍⚕️
                    </span>

                    <div>
                        <h2>
                            Doctor Information
                        </h2>

                        <p>
                            Your selected healthcare professional
                        </p>
                    </div>

                </div>


                <div className="doctor-detail-profile">

                    <div className="doctor-detail-avatar">
                        {appointment.doctor_name
                            ?.charAt(0)
                            ?.toUpperCase() || "D"}
                    </div>


                    <div className="doctor-detail-info">

                        <h3>
                            {appointment.doctor_name ||
                                "Doctor"}
                        </h3>

                        <p>
                            {appointment.specialization ||
                                "Medical Specialist"}
                        </p>

                        {appointment.qualification && (
                            <span>
                                {appointment.qualification}
                            </span>
                        )}

                    </div>

                </div>

            </section>


            {/* Hospital Information */}

            <section className="details-card">

                <div className="details-card-title">

                    <span className="details-card-icon">
                        🏥
                    </span>

                    <div>
                        <h2>
                            Hospital Information
                        </h2>

                        <p>
                            Appointment location
                        </p>
                    </div>

                </div>


                <div className="hospital-detail-content">

                    <h3>
                        {appointment.hospital_name ||
                            "Hospital"}
                    </h3>

                    {appointment.hospital_address && (
                        <p>
                            📍 {appointment.hospital_address}
                        </p>
                    )}

                    {appointment.hospital_phone && (
                        <p>
                            📞 {appointment.hospital_phone}
                        </p>
                    )}

                </div>

            </section>


            {/* Reason */}

            <section className="details-card">

                <div className="details-card-title">

                    <span className="details-card-icon">
                        📝
                    </span>

                    <div>
                        <h2>
                            Consultation Reason
                        </h2>

                        <p>
                            Information provided during booking
                        </p>
                    </div>

                </div>


                <div className="reason-box">

                    {appointment.reason ? (
                        <p>
                            {appointment.reason}
                        </p>
                    ) : (
                        <p className="empty-text">
                            No consultation reason provided.
                        </p>
                    )}

                </div>

            </section>


            {/* Doctor Notes */}

            {appointment.doctor_notes && (
                <section className="details-card">

                    <div className="details-card-title">

                        <span className="details-card-icon">
                            🩺
                        </span>

                        <div>
                            <h2>
                                Doctor Notes
                            </h2>

                            <p>
                                Notes added by your doctor
                            </p>
                        </div>

                    </div>


                    <div className="reason-box">

                        <p>
                            {appointment.doctor_notes}
                        </p>

                    </div>

                </section>
            )}


            {/* Status Information */}

            <section className="appointment-info-banner">

                {appointment.status === "PENDING" && (
                    <>
                        <strong>
                            ⏳ Appointment Pending
                        </strong>

                        <p>
                            Your appointment request has been
                            submitted. The doctor needs to accept
                            the appointment before it is confirmed.
                        </p>
                    </>
                )}


                {appointment.status === "ACCEPTED" && (
                    <>
                        <strong>
                            ✅ Appointment Confirmed
                        </strong>

                        <p>
                            Your appointment has been accepted
                            by the doctor. Please arrive on time
                            for your consultation.
                        </p>
                    </>
                )}


                {appointment.status === "REJECTED" && (
                    <>
                        <strong>
                            ❌ Appointment Rejected
                        </strong>

                        <p>
                            This appointment request was rejected
                            by the doctor.
                        </p>
                    </>
                )}


                {appointment.status === "COMPLETED" && (
                    <>
                        <strong>
                            ✔ Consultation Completed
                        </strong>

                        <p>
                            This appointment has been completed.
                        </p>
                    </>
                )}


                {appointment.status === "CANCELLED" && (
                    <>
                        <strong>
                            ⚠ Appointment Cancelled
                        </strong>

                        <p>
                            This appointment has been cancelled.
                        </p>
                    </>
                )}

            </section>

        </div>
    );
};

export default AppointmentDetails;