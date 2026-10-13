import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "./PatientDashboard.css";

const PatientDashboard = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ============================================================
    // FETCH PATIENT APPOINTMENTS
    // ============================================================

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    "/appointments/my"
                );

                console.log(
                    "Patient dashboard appointments:",
                    response.data
                );

                if (response.data?.success) {
                    setAppointments(
                        Array.isArray(
                            response.data.appointments
                        )
                            ? response.data.appointments
                            : []
                    );
                } else {
                    setAppointments([]);
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

        fetchAppointments();
    }, []);


    // ============================================================
    // HELPERS
    // ============================================================

    const formatDate = (date) => {
        if (!date) {
            return "Date not available";
        }

        const parsedDate = new Date(date);

        if (
            Number.isNaN(
                parsedDate.getTime()
            )
        ) {
            return String(date);
        }

        return parsedDate.toLocaleDateString(
            "en-IN",
            {
                weekday: "short",
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    const formatTime = (time) => {
        if (!time) {
            return "Time not available";
        }

        const timeText = String(time);

        const parts =
            timeText.split(":");

        if (parts.length < 2) {
            return timeText;
        }

        let hours = Number(
            parts[0]
        );

        const minutes =
            parts[1];

        if (
            Number.isNaN(hours)
        ) {
            return timeText;
        }

        const period =
            hours >= 12
                ? "PM"
                : "AM";

        hours =
            hours % 12 || 12;

        return `${hours}:${minutes} ${period}`;
    };


    const getStatusClass = (status) => {
        return String(
            status || ""
        )
            .toLowerCase()
            .replace("_", "-");
    };


    const getStatusLabel = (status) => {
        if (!status) {
            return "Unknown";
        }

        return String(status)
            .replaceAll("_", " ")
            .replace(
                /\b\w/g,
                (letter) =>
                    letter.toUpperCase()
            );
    };


    const getFirstName = () => {
        if (!user?.name) {
            return "Patient";
        }

        return user.name
            .trim()
            .split(" ")[0];
    };


    // ============================================================
    // SORT APPOINTMENTS
    // ============================================================

    const sortedAppointments = [
        ...appointments,
    ].sort((a, b) => {
        const dateA = new Date(
            `${a.appointment_date || ""} ${
                a.appointment_time || ""
            }`
        );

        const dateB = new Date(
            `${b.appointment_date || ""} ${
                b.appointment_time || ""
            }`
        );

        return dateA - dateB;
    });


    const upcomingAppointments =
        sortedAppointments.filter(
            (appointment) =>
                appointment.status !==
                    "COMPLETED" &&
                appointment.status !==
                    "REJECTED" &&
                appointment.status !==
                    "CANCELLED"
        );


    const recentAppointments =
        sortedAppointments.slice(
            0,
            5
        );


    // ============================================================
    // RENDER
    // ============================================================

    return (
        <div className="patient-dashboard-page">

            {/* ==================================================
                WELCOME SECTION
            ================================================== */}

            <section className="patient-dashboard-welcome">

                <div>

                    <span className="patient-dashboard-label">
                        CLINICCARE
                    </span>

                    <h1>
                        Welcome back,{" "}
                        {getFirstName()} 👋
                    </h1>

                    <p>
                        Manage your healthcare,
                        appointments and medical
                        information from one place.
                    </p>

                </div>


                <div className="patient-dashboard-welcome-icon">
                    🏥
                </div>

            </section>


            {/* ==================================================
                QUICK ACTIONS
            ================================================== */}

            <section className="patient-dashboard-section">

                <div className="patient-dashboard-section-header">

                    <div>

                        <h2>
                            Quick Actions
                        </h2>

                        <p>
                            Access ClinicCare services
                            quickly.
                        </p>

                    </div>

                </div>


                <div className="patient-dashboard-actions-grid">

                    <button
                        type="button"
                        className="patient-dashboard-action"
                        onClick={() =>
                            navigate(
                                "/location"
                            )
                        }
                    >
                        <span className="patient-dashboard-action-icon">
                            🔎
                        </span>

                        <span>

                            <strong>
                                Find Hospitals
                            </strong>

                            <small>
                                Search hospitals
                                by location
                            </small>

                        </span>

                        <span className="patient-dashboard-action-arrow">
                            →
                        </span>

                    </button>


                    <button
                        type="button"
                        className="patient-dashboard-action"
                        onClick={() =>
                            navigate(
                                "/doctors"
                            )
                        }
                    >
                        <span className="patient-dashboard-action-icon">
                            🩺
                        </span>

                        <span>

                            <strong>
                                Find Doctors
                            </strong>

                            <small>
                                Browse doctors
                                and specialists
                            </small>

                        </span>

                        <span className="patient-dashboard-action-arrow">
                            →
                        </span>

                    </button>


                    <button
                        type="button"
                        className="patient-dashboard-action"
                        onClick={() =>
                            navigate(
                                "/appointments"
                            )
                        }
                    >
                        <span className="patient-dashboard-action-icon">
                            📅
                        </span>

                        <span>

                            <strong>
                                My Appointments
                            </strong>

                            <small>
                                View appointment
                                history
                            </small>

                        </span>

                        <span className="patient-dashboard-action-arrow">
                            →
                        </span>

                    </button>


                    <button
                        type="button"
                        className="patient-dashboard-action"
                        onClick={() =>
                            navigate(
                                "/prescriptions"
                            )
                        }
                    >
                        <span className="patient-dashboard-action-icon">
                            💊
                        </span>

                        <span>

                            <strong>
                                Prescriptions
                            </strong>

                            <small>
                                View your
                                prescriptions
                            </small>

                        </span>

                        <span className="patient-dashboard-action-arrow">
                            →
                        </span>

                    </button>

                </div>

            </section>


            {/* ==================================================
                SUMMARY CARDS
            ================================================== */}

            <section className="patient-dashboard-summary-grid">

                <div className="patient-dashboard-summary-card">

                    <div className="patient-dashboard-summary-icon blue">
                        📅
                    </div>

                    <div>

                        <span>
                            Total Appointments
                        </span>

                        <strong>
                            {appointments.length}
                        </strong>

                    </div>

                </div>


                <div className="patient-dashboard-summary-card">

                    <div className="patient-dashboard-summary-icon green">
                        🟢
                    </div>

                    <div>

                        <span>
                            Upcoming
                        </span>

                        <strong>
                            {
                                upcomingAppointments.length
                            }
                        </strong>

                    </div>

                </div>


                <div className="patient-dashboard-summary-card">

                    <div className="patient-dashboard-summary-icon purple">
                        💊
                    </div>

                    <div>

                        <span>
                            Healthcare
                        </span>

                        <strong>
                            Active
                        </strong>

                    </div>

                </div>


                <div className="patient-dashboard-summary-card">

                    <div className="patient-dashboard-summary-icon orange">
                        ⭐
                    </div>

                    <div>

                        <span>
                            Reviews
                        </span>

                        <strong>
                            Available
                        </strong>

                    </div>

                </div>

            </section>


            {/* ==================================================
                APPOINTMENTS SECTION
            ================================================== */}

            <section className="patient-dashboard-section">

                <div className="patient-dashboard-section-header">

                    <div>

                        <h2>
                            My Appointments
                        </h2>

                        <p>
                            Your recent and upcoming
                            appointments.
                        </p>

                    </div>


                    <button
                        type="button"
                        className="patient-dashboard-view-all"
                        onClick={() =>
                            navigate(
                                "/appointments"
                            )
                        }
                    >
                        View All →
                    </button>

                </div>


                {loading ? (

                    <div className="patient-dashboard-loading">

                        <div className="patient-dashboard-spinner"></div>

                        <p>
                            Loading appointments...
                        </p>

                    </div>

                ) : error ? (

                    <div className="patient-dashboard-message error">

                        <strong>
                            Unable to load appointments
                        </strong>

                        <p>
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/appointments"
                                )
                            }
                        >
                            Open Appointments
                        </button>

                    </div>

                ) : recentAppointments.length ===
                  0 ? (

                    <div className="patient-dashboard-empty">

                        <div className="patient-dashboard-empty-icon">
                            📅
                        </div>

                        <h3>
                            No appointments yet
                        </h3>

                        <p>
                            Find a doctor and book
                            your first appointment.
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    "/doctors"
                                )
                            }
                        >
                            Find a Doctor
                        </button>

                    </div>

                ) : (

                    <div className="patient-dashboard-appointments">

                        {recentAppointments.map(
                            (appointment) => (
                                <button
                                    type="button"
                                    key={
                                        appointment.id
                                    }
                                    className="patient-dashboard-appointment"
                                    onClick={() =>
                                        navigate(
                                            `/appointments/${appointment.id}`
                                        )
                                    }
                                >

                                    <div className="patient-dashboard-appointment-date">

                                        <strong>
                                            {
                                                appointment.appointment_date
                                                    ? new Date(
                                                          appointment.appointment_date
                                                      ).getDate()
                                                    : "—"
                                            }
                                        </strong>

                                        <span>
                                            {
                                                appointment.appointment_date
                                                    ? new Date(
                                                          appointment.appointment_date
                                                      ).toLocaleDateString(
                                                          "en-IN",
                                                          {
                                                              month: "short",
                                                          }
                                                      )
                                                    : ""
                                            }
                                        </span>

                                    </div>


                                    <div className="patient-dashboard-appointment-info">

                                        <strong>
                                            {appointment.doctor_name ||
                                                "Doctor"}
                                        </strong>

                                        <span>
                                            {appointment.specialization ||
                                                "Medical consultation"}
                                        </span>

                                        <small>
                                            {appointment.hospital_name ||
                                                "Hospital"}
                                        </small>

                                    </div>


                                    <div className="patient-dashboard-appointment-time">

                                        <strong>
                                            {formatTime(
                                                appointment.appointment_time
                                            )}
                                        </strong>

                                        <span>
                                            {formatDate(
                                                appointment.appointment_date
                                            )}
                                        </span>

                                    </div>


                                    <span
                                        className={`patient-dashboard-status ${getStatusClass(
                                            appointment.status
                                        )}`}
                                    >
                                        {
                                            getStatusLabel(
                                                appointment.status
                                            )
                                        }
                                    </span>


                                    <span className="patient-dashboard-appointment-arrow">
                                        →
                                    </span>

                                </button>
                            )
                        )}

                    </div>

                )}

            </section>


            {/* ==================================================
                HEALTHCARE SERVICES
            ================================================== */}

            <section className="patient-dashboard-section">

                <div className="patient-dashboard-section-header">

                    <div>

                        <h2>
                            Your Healthcare
                        </h2>

                        <p>
                            Manage important healthcare
                            information.
                        </p>

                    </div>

                </div>


                <div className="patient-dashboard-services-grid">

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/prescriptions"
                            )
                        }
                    >
                        <span>
                            💊
                        </span>

                        <strong>
                            Prescriptions
                        </strong>

                        <small>
                            View medicines and
                            prescription details
                        </small>

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/payments"
                            )
                        }
                    >
                        <span>
                            💳
                        </span>

                        <strong>
                            Payments
                        </strong>

                        <small>
                            View consultation
                            payments
                        </small>

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/reviews"
                            )
                        }
                    >
                        <span>
                            ⭐
                        </span>

                        <strong>
                            Reviews
                        </strong>

                        <small>
                            Share your consultation
                            experience
                        </small>

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/hospitals"
                            )
                        }
                    >
                        <span>
                            🏥
                        </span>

                        <strong>
                            Hospitals
                        </strong>

                        <small>
                            Explore hospitals and
                            facilities
                        </small>

                    </button>

                </div>

            </section>

        </div>
    );
};

export default PatientDashboard;