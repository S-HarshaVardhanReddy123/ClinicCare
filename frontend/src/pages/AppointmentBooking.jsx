import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./AppointmentBooking.css";

const AppointmentBooking = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [availability, setAvailability] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [reason, setReason] = useState("");

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [error, setError] = useState("");
    const [bookingError, setBookingError] = useState("");

    useEffect(() => {
        const fetchAvailability = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/appointments/doctor/${doctorId}/availability`
                );

                if (response.data?.success) {
                    setDoctor(response.data.doctor);
                    setAvailability(
                        response.data.availability || []
                    );
                } else {
                    setError(
                        response.data?.message ||
                        "Unable to load available slots."
                    );
                }
            } catch (err) {
                console.error(
                    "Doctor availability error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load available slots."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchAvailability();
    }, [doctorId]);

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "Date unavailable";
        }

        try {
            const date = new Date(dateValue);

            return date.toLocaleDateString("en-IN", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
                timeZone: "Asia/Kolkata",
            });
        } catch {
            return String(dateValue);
        }
    };

    const formatTime = (timeValue) => {
        if (!timeValue) {
            return "Time unavailable";
        }

        const parts = String(timeValue).split(":");

        const hours = Number(parts[0]);
        const minutes = Number(parts[1] || 0);

        if (
            !Number.isFinite(hours) ||
            !Number.isFinite(minutes)
        ) {
            return String(timeValue);
        }

        const date = new Date();

        date.setHours(hours);
        date.setMinutes(minutes);
        date.setSeconds(0);

        return date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const formatFee = (fee) => {
        const value = Number(fee);

        if (!Number.isFinite(value)) {
            return "Not available";
        }

        return `₹${value.toLocaleString("en-IN")}`;
    };

    const groupedAvailability = useMemo(() => {
        const groups = {};

        availability.forEach((slot) => {
            const key = String(slot.available_date);

            if (!groups[key]) {
                groups[key] = [];
            }

            groups[key].push(slot);
        });

        return Object.entries(groups);
    }, [availability]);

    const handleBookAppointment = async () => {
        if (!selectedSlot) {
            setBookingError(
                "Please select an available appointment slot."
            );
            return;
        }

        try {
            setBooking(true);
            setBookingError("");

            const response = await api.post(
                "/appointments",
                {
                    doctorId: Number(doctorId),
                    availabilityId: selectedSlot.id,
                    reason: reason.trim() || null,
                }
            );

            if (response.data?.success) {
                const appointmentId =
                    response.data.appointment?.id;

                if (appointmentId) {
                    navigate(
                        `/appointments/${appointmentId}`,
                        {
                            replace: true,
                            state: {
                                bookingSuccess: true,
                            },
                        }
                    );
                } else {
                    navigate("/appointments", {
                        replace: true,
                    });
                }
            } else {
                setBookingError(
                    response.data?.message ||
                    "Unable to book appointment."
                );
            }
        } catch (err) {
            console.error(
                "Appointment booking error:",
                err
            );

            setBookingError(
                err.response?.data?.message ||
                "Unable to book appointment. The slot may no longer be available."
            );
        } finally {
            setBooking(false);
        }
    };

    if (loading) {
        return (
            <div className="appointment-booking-page">
                <div className="appointment-booking-loading">
                    <div className="booking-loading-icon">
                        APPT
                    </div>

                    <h2>Loading available slots...</h2>

                    <p>
                        Checking this doctor's latest
                        availability.
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="appointment-booking-page">

                <button
                    className="booking-back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="appointment-booking-error">

                    <div className="booking-error-icon">
                        !
                    </div>

                    <h2>
                        Unable to load availability
                    </h2>

                    <p>{error}</p>

                    <button
                        className="booking-primary-button"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>

                </div>
            </div>
        );
    }

    return (
        <div className="appointment-booking-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <button
                className="booking-back-button"
                onClick={() => navigate(-1)}
            >
                ← Back to Doctor
            </button>

            <section className="booking-header-card">

                <div className="booking-doctor-avatar">
                    DR
                </div>

                <div className="booking-doctor-info">

                    <div className="booking-label">
                        BOOK APPOINTMENT
                    </div>

                    <h1>
                        {doctor?.name || "Doctor"}
                    </h1>

                    <p>
                        {doctor?.specialization ||
                            "Medical Specialist"}
                    </p>

                    <div className="booking-fee">
                        Consultation fee
                        <strong>
                            {formatFee(
                                doctor?.consultation_fee
                            )}
                        </strong>
                    </div>

                </div>

            </section>

            {/* =================================================
                SLOT SECTION
            ================================================= */}

            <section className="booking-section">

                <div className="booking-section-heading">

                    <div className="booking-section-icon">
                        DATE
                    </div>

                    <div>
                        <h2>
                            Select an available slot
                        </h2>

                        <p>
                            Choose a date and consultation
                            time that works for you.
                        </p>
                    </div>

                </div>

                {availability.length === 0 ? (
                    <div className="no-slots">

                        <div className="no-slots-icon">
                            --
                        </div>

                        <h3>
                            No available slots
                        </h3>

                        <p>
                            This doctor currently has no
                            available appointment slots.
                        </p>

                        <button
                            className="booking-primary-button"
                            onClick={() => navigate(-1)}
                        >
                            Choose Another Doctor
                        </button>

                    </div>
                ) : (
                    <div className="availability-list">

                        {groupedAvailability.map(
                            ([dateKey, slots]) => (
                                <div
                                    className="availability-day"
                                    key={dateKey}
                                >

                                    <div className="availability-date">
                                        {formatDate(
                                            dateKey
                                        )}
                                    </div>

                                    <div className="slot-grid">

                                        {slots.map((slot) => {

                                            const selected =
                                                selectedSlot?.id ===
                                                slot.id;

                                            return (
                                                <button
                                                    key={slot.id}
                                                    type="button"
                                                    className={
                                                        selected
                                                            ? "slot-card selected"
                                                            : "slot-card"
                                                    }
                                                    onClick={() =>
                                                        setSelectedSlot(
                                                            slot
                                                        )
                                                    }
                                                >

                                                    <span className="slot-time">
                                                        {formatTime(
                                                            slot.start_time
                                                        )}
                                                    </span>

                                                    <span className="slot-end-time">
                                                        to{" "}
                                                        {formatTime(
                                                            slot.end_time
                                                        )}
                                                    </span>

                                                    <span className="slot-status">
                                                        {selected
                                                            ? "Selected"
                                                            : "Available"}
                                                    </span>

                                                </button>
                                            );
                                        })}

                                    </div>

                                </div>
                            )
                        )}

                    </div>
                )}

            </section>

            {/* =================================================
                REASON
            ================================================= */}

            {availability.length > 0 && (
                <section className="booking-section">

                    <div className="booking-section-heading">

                        <div className="booking-section-icon">
                            INFO
                        </div>

                        <div>
                            <h2>
                                Consultation information
                            </h2>

                            <p>
                                Tell the doctor briefly why
                                you are booking the appointment.
                            </p>
                        </div>

                    </div>

                    <label
                        className="booking-textarea-label"
                        htmlFor="appointment-reason"
                    >
                        Reason for consultation
                        <span>
                            Optional
                        </span>
                    </label>

                    <textarea
                        id="appointment-reason"
                        value={reason}
                        onChange={(event) =>
                            setReason(event.target.value)
                        }
                        placeholder="Example: Fever, regular check-up, follow-up consultation..."
                        rows={5}
                        maxLength={500}
                        className="booking-textarea"
                    />

                    <div className="booking-character-count">
                        {reason.length}/500
                    </div>

                </section>
            )}

            {/* =================================================
                CONFIRMATION
            ================================================= */}

            {availability.length > 0 && (
                <section className="booking-confirm-card">

                    <div className="booking-confirm-info">

                        <div className="booking-label">
                            APPOINTMENT SUMMARY
                        </div>

                        <h2>
                            Confirm your appointment
                        </h2>

                        {!selectedSlot ? (
                            <p>
                                Select an available slot above
                                to continue.
                            </p>
                        ) : (
                            <div className="selected-summary">

                                <div>
                                    <span>
                                        Doctor
                                    </span>

                                    <strong>
                                        {doctor?.name}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Date
                                    </span>

                                    <strong>
                                        {formatDate(
                                            selectedSlot.available_date
                                        )}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Time
                                    </span>

                                    <strong>
                                        {formatTime(
                                            selectedSlot.start_time
                                        )}{" "}
                                        -{" "}
                                        {formatTime(
                                            selectedSlot.end_time
                                        )}
                                    </strong>
                                </div>

                                <div>
                                    <span>
                                        Consultation Fee
                                    </span>

                                    <strong>
                                        {formatFee(
                                            doctor?.consultation_fee
                                        )}
                                    </strong>
                                </div>

                            </div>
                        )}

                        {bookingError && (
                            <div className="booking-error-message">
                                {bookingError}
                            </div>
                        )}

                    </div>

                    <button
                        type="button"
                        className="confirm-booking-button"
                        disabled={
                            !selectedSlot || booking
                        }
                        onClick={
                            handleBookAppointment
                        }
                    >
                        {booking
                            ? "Booking..."
                            : "Confirm Appointment"}
                    </button>

                </section>
            )}

        </div>
    );
};

export default AppointmentBooking;