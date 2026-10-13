import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./PatientAppointmentDetails.css";

const PatientAppointmentDetails = () => {
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

                if (response.data?.success) {
                    setAppointment(response.data.appointment);
                } else {
                    setError(
                        response.data?.message ||
                        "Unable to load appointment details."
                    );
                }
            } catch (err) {
                console.error(
                    "Patient appointment details error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load appointment details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAppointment();
    }, [appointmentId]);

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "Not available";
        }

        const dateText = String(dateValue).split("T")[0];
        const parts = dateText.split("-");

        if (parts.length !== 3) {
            return dateValue;
        }

        const [year, month, day] = parts;

        return `${day}-${month}-${year}`;
    };

    const formatTime = (timeValue) => {
        if (!timeValue) {
            return "Not available";
        }

        const timeText = String(timeValue).substring(0, 5);
        const parts = timeText.split(":");

        if (parts.length < 2) {
            return timeValue;
        }

        let hour = Number(parts[0]);
        const minute = parts[1];

        if (Number.isNaN(hour)) {
            return timeValue;
        }

        const period = hour >= 12 ? "PM" : "AM";

        hour = hour % 12;

        if (hour === 0) {
            hour = 12;
        }

        return `${hour}:${minute} ${period}`;
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "PENDING":
                return "patient-appointment-status pending";

            case "ACCEPTED":
                return "patient-appointment-status accepted";

            case "COMPLETED":
                return "patient-appointment-status completed";

            case "REJECTED":
                return "patient-appointment-status rejected";

            case "CANCELLED":
                return "patient-appointment-status cancelled";

            case "NO_SHOW":
                return "patient-appointment-status no-show";

            default:
                return "patient-appointment-status";
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case "PENDING":
                return "Waiting for Doctor";

            case "ACCEPTED":
                return "Appointment Confirmed";

            case "COMPLETED":
                return "Consultation Completed";

            case "REJECTED":
                return "Appointment Rejected";

            case "CANCELLED":
                return "Appointment Cancelled";

            case "NO_SHOW":
                return "Patient Did Not Attend";

            default:
                return status || "Unknown";
        }
    };

    if (loading) {
        return (
            <div className="patient-appointment-details-page">
                <div className="patient-appointment-loading">
                    <div className="patient-loading-icon">
                        ⏳
                    </div>

                    <h2>Loading appointment...</h2>

                    <p>
                        Please wait while we retrieve your appointment
                        details.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="patient-appointment-details-page">

                <button
                    type="button"
                    className="patient-back-button"
                    onClick={() => navigate("/appointments")}
                >
                    ← Back to Appointments
                </button>

                <div className="patient-appointment-error">

                    <div className="patient-error-icon">
                        ⚠
                    </div>

                    <h2>
                        Unable to load appointment
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        className="patient-primary-button"
                        onClick={() => navigate("/appointments")}
                    >
                        Back to Appointments
                    </button>

                </div>

            </div>
        );
    }

    if (!appointment) {
        return (
            <div className="patient-appointment-details-page">

                <button
                    type="button"
                    className="patient-back-button"
                    onClick={() => navigate("/appointments")}
                >
                    ← Back to Appointments
                </button>

                <div className="patient-appointment-error">

                    <div className="patient-error-icon">
                        📅
                    </div>

                    <h2>
                        Appointment not found
                    </h2>

                    <p>
                        The requested appointment could not be found.
                    </p>

                </div>

            </div>
        );
    }

    return (
        <div className="patient-appointment-details-page">

            {/* ==================================================
                BACK
            =================================================== */}

            <button
                type="button"
                className="patient-back-button"
                onClick={() => navigate("/appointments")}
            >
                ← Back to Appointments
            </button>


            {/* ==================================================
                HEADER
            =================================================== */}

            <div className="patient-appointment-header">

                <div>
                    <p className="patient-appointment-eyebrow">
                        APPOINTMENT DETAILS
                    </p>

                    <h1>
                        Appointment #{appointment.id}
                    </h1>

                    <p>
                        Review your appointment information and
                        consultation status.
                    </p>
                </div>

                <div
                    className={getStatusClass(
                        appointment.status
                    )}
                >
                    {getStatusText(appointment.status)}
                </div>

            </div>


            {/* ==================================================
                APPOINTMENT SUMMARY
            =================================================== */}

            <div className="patient-appointment-summary">

                <div className="patient-summary-date">

                    <span className="summary-label">
                        APPOINTMENT DATE
                    </span>

                    <strong>
                        {formatDate(
                            appointment.appointment_date
                        )}
                    </strong>

                    <span>
                        {formatTime(
                            appointment.appointment_time
                        )}
                    </span>

                </div>


                <div className="patient-summary-divider" />


                <div className="patient-summary-info">

                    <span className="summary-label">
                        STATUS
                    </span>

                    <strong>
                        {getStatusText(
                            appointment.status
                        )}
                    </strong>

                </div>

            </div>


            {/* ==================================================
                MAIN GRID
            =================================================== */}

            <div className="patient-appointment-grid">

                {/* ==================================================
                    DOCTOR
                =================================================== */}

                <section className="patient-detail-card">

                    <div className="patient-detail-card-header">

                        <div className="patient-detail-icon">
                            D
                        </div>

                        <div>
                            <h2>
                                Doctor Information
                            </h2>

                            <p>
                                Your consulting doctor
                            </p>
                        </div>

                    </div>


                    <div className="patient-detail-content">

                        <div className="patient-doctor-avatar">
                            {(appointment.doctor_name || "D")
                                .charAt(0)
                                .toUpperCase()}
                        </div>

                        <div className="patient-doctor-information">

                            <h3>
                                {appointment.doctor_name ||
                                    "Doctor"}
                            </h3>

                            <p className="patient-doctor-specialization">
                                {appointment.specialization ||
                                    "Medical Specialist"}
                            </p>

                            {appointment.qualification && (
                                <p>
                                    {appointment.qualification}
                                </p>
                            )}

                            {appointment.doctor_email && (
                                <p>
                                    {appointment.doctor_email}
                                </p>
                            )}

                        </div>

                    </div>

                </section>


                {/* ==================================================
                    HOSPITAL
                =================================================== */}

                <section className="patient-detail-card">

                    <div className="patient-detail-card-header">

                        <div className="patient-detail-icon">
                            H
                        </div>

                        <div>
                            <h2>
                                Hospital Information
                            </h2>

                            <p>
                                Where your appointment will take place
                            </p>
                        </div>

                    </div>


                    <div className="patient-hospital-information">

                        <h3>
                            {appointment.hospital_name ||
                                "Hospital"}
                        </h3>

                        {appointment.hospital_address && (
                            <p>
                                {appointment.hospital_address}
                            </p>
                        )}

                        {appointment.hospital_phone && (
                            <p>
                                📞 {appointment.hospital_phone}
                            </p>
                        )}

                    </div>

                </section>


                {/* ==================================================
                    APPOINTMENT INFORMATION
                =================================================== */}

                <section className="patient-detail-card">

                    <div className="patient-detail-card-header">

                        <div className="patient-detail-icon">
                            A
                        </div>

                        <div>
                            <h2>
                                Appointment Information
                            </h2>

                            <p>
                                Your scheduled consultation
                            </p>
                        </div>

                    </div>


                    <div className="patient-information-list">

                        <div className="patient-information-row">
                            <span>
                                Appointment ID
                            </span>

                            <strong>
                                #{appointment.id}
                            </strong>
                        </div>


                        <div className="patient-information-row">
                            <span>
                                Date
                            </span>

                            <strong>
                                {formatDate(
                                    appointment.appointment_date
                                )}
                            </strong>
                        </div>


                        <div className="patient-information-row">
                            <span>
                                Time
                            </span>

                            <strong>
                                {formatTime(
                                    appointment.appointment_time
                                )}
                            </strong>
                        </div>


                        <div className="patient-information-row">
                            <span>
                                Status
                            </span>

                            <strong>
                                {appointment.status}
                            </strong>
                        </div>

                    </div>

                </section>


                {/* ==================================================
                    CONSULTATION REASON
                =================================================== */}

                <section className="patient-detail-card">

                    <div className="patient-detail-card-header">

                        <div className="patient-detail-icon">
                            ?
                        </div>

                        <div>
                            <h2>
                                Consultation Reason
                            </h2>

                            <p>
                                Information provided while booking
                            </p>
                        </div>

                    </div>


                    <div className="patient-reason-box">

                        {appointment.reason ? (
                            <p>
                                {appointment.reason}
                            </p>
                        ) : (
                            <p className="patient-muted-text">
                                No reason was provided when this
                                appointment was booked.
                            </p>
                        )}

                    </div>

                </section>


                {/* ==================================================
                    DOCTOR NOTES
                =================================================== */}

                {appointment.doctor_notes && (
                    <section className="patient-detail-card patient-full-width">

                        <div className="patient-detail-card-header">

                            <div className="patient-detail-icon">
                                N
                            </div>

                            <div>
                                <h2>
                                    Doctor Notes
                                </h2>

                                <p>
                                    Notes added by your doctor
                                </p>
                            </div>

                        </div>


                        <div className="patient-reason-box">
                            <p>
                                {appointment.doctor_notes}
                            </p>
                        </div>

                    </section>
                )}

            </div>


            {/* ==================================================
                ACCEPTED INFORMATION
            =================================================== */}

            {appointment.status === "ACCEPTED" && (
                <div className="patient-confirmation-banner">

                    <div className="patient-confirmation-icon">
                        ✓
                    </div>

                    <div>

                        <h3>
                            Your appointment is confirmed
                        </h3>

                        <p>
                            Your doctor has accepted the appointment.
                            Please arrive at the hospital on the scheduled
                            date and time.
                        </p>

                    </div>

                </div>
            )}


            {/* ==================================================
                PENDING INFORMATION
            =================================================== */}

            {appointment.status === "PENDING" && (
                <div className="patient-pending-banner">

                    <div className="patient-pending-icon">
                        ⏳
                    </div>

                    <div>

                        <h3>
                            Waiting for doctor confirmation
                        </h3>

                        <p>
                            Your appointment request has been sent to
                            the doctor. You will see the confirmation
                            here after the doctor responds.
                        </p>

                    </div>

                </div>
            )}


            {/* ==================================================
                COMPLETED INFORMATION
            =================================================== */}

            {appointment.status === "COMPLETED" && (
                <div className="patient-completed-banner">

                    <div className="patient-completed-icon">
                        ✓
                    </div>

                    <div>

                        <h3>
                            Consultation completed
                        </h3>

                        <p>
                            Your consultation has been completed.
                            Check your prescriptions and payment
                            sections for the next steps.
                        </p>

                        <div className="patient-completed-actions">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/prescriptions")
                                }
                            >
                                View Prescriptions
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/payments")
                                }
                            >
                                View Payments
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/reviews")
                                }
                            >
                                Give Feedback
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
};

export default PatientAppointmentDetails;