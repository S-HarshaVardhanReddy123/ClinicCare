import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./PatientPrescriptions.css";

const PatientPrescriptions = () => {
    const navigate = useNavigate();

    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    "/prescriptions/my"
                );

                if (response.data.success) {
                    setPrescriptions(
                        response.data.prescriptions || []
                    );
                } else {
                    setError(
                        response.data.message ||
                        "Failed to load prescriptions."
                    );
                }
            } catch (err) {
                console.error(
                    "Failed to fetch prescriptions:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Unable to load prescriptions. Please try again."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, []);

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "N/A";
        }

        const dateString = String(dateValue).split("T")[0];

        const parts = dateString.split("-");

        if (parts.length !== 3) {
            return dateValue;
        }

        const [year, month, day] = parts;

        return `${day}/${month}/${year}`;
    };

    const formatTime = (timeValue) => {
        if (!timeValue) {
            return "N/A";
        }

        const timeString = String(timeValue).substring(
            0,
            5
        );

        const [hours, minutes] =
            timeString.split(":");

        const hour = Number(hours);

        if (Number.isNaN(hour)) {
            return timeString;
        }

        const suffix = hour >= 12 ? "PM" : "AM";
        const displayHour =
            hour % 12 === 0 ? 12 : hour % 12;

        return `${displayHour}:${minutes} ${suffix}`;
    };

    if (loading) {
        return (
            <div className="patient-prescriptions-page">
                <div className="prescriptions-loading">
                    <div className="loading-spinner"></div>
                    <p>Loading your prescriptions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="patient-prescriptions-page">

            <div className="prescriptions-header">
                <div>
                    <h1>My Prescriptions</h1>
                    <p>
                        View prescriptions provided by your doctors.
                    </p>
                </div>

                <button
                    className="prescriptions-back-button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Dashboard
                </button>
            </div>

            {error && (
                <div className="prescriptions-alert error">
                    {error}
                </div>
            )}

            {!error &&
                prescriptions.length === 0 && (
                    <div className="empty-prescriptions">
                        <div className="empty-icon">
                            💊
                        </div>

                        <h2>No prescriptions yet</h2>

                        <p>
                            Your prescriptions will appear here
                            after your doctor creates one.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/appointments")
                            }
                        >
                            View My Appointments
                        </button>
                    </div>
                )}

            {prescriptions.length > 0 && (
                <div className="prescription-list">

                    {prescriptions.map(
                        (prescription) => (
                            <div
                                className="prescription-card"
                                key={prescription.id}
                            >
                                <div className="prescription-card-header">
                                    <div>
                                        <span className="prescription-label">
                                            Prescription
                                        </span>

                                        <h2>
                                            #{prescription.id}
                                        </h2>
                                    </div>

                                    <span className="prescription-date">
                                        {formatDate(
                                            prescription.created_at
                                        )}
                                    </span>
                                </div>

                                <div className="prescription-doctor">
                                    <div className="doctor-avatar">
                                        👨‍⚕️
                                    </div>

                                    <div>
                                        <h3>
                                            {
                                                prescription.doctor_name
                                            }
                                        </h3>

                                        <p>
                                            {
                                                prescription.specialization
                                            }
                                        </p>

                                        {prescription.qualification && (
                                            <p>
                                                {
                                                    prescription.qualification
                                                }
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="prescription-hospital">
                                    <strong>
                                        Hospital
                                    </strong>

                                    <span>
                                        {
                                            prescription.hospital_name
                                        }
                                    </span>

                                    {prescription.hospital_address && (
                                        <small>
                                            {
                                                prescription.hospital_address
                                            }
                                        </small>
                                    )}
                                </div>

                                <div className="prescription-appointment">
                                    <div>
                                        <strong>
                                            Appointment
                                        </strong>

                                        <span>
                                            {formatDate(
                                                prescription.appointment_date
                                            )}
                                        </span>
                                    </div>

                                    <div>
                                        <strong>
                                            Time
                                        </strong>

                                        <span>
                                            {formatTime(
                                                prescription.appointment_time
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {prescription.diagnosis && (
                                    <div className="prescription-diagnosis">
                                        <strong>
                                            Diagnosis
                                        </strong>

                                        <p>
                                            {
                                                prescription.diagnosis
                                            }
                                        </p>
                                    </div>
                                )}

                                <div className="prescription-card-footer">
                                    <span>
                                        {
                                            prescription.medicines?.length ||
                                            0
                                        }{" "}
                                        medicine
                                        {
                                            prescription.medicines?.length ===
                                            1
                                                ? ""
                                                : "s"
                                        }
                                    </span>

                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/prescriptions/${prescription.id}`
                                            )
                                        }
                                    >
                                        View Prescription →
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

export default PatientPrescriptions;