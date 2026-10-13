import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./DoctorDetails.css";

const DoctorDetails = () => {
    const { doctorId } = useParams();
    const navigate = useNavigate();

    const [doctor, setDoctor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await api.get(`/doctors/${doctorId}`);

                if (response.data?.success) {
                    setDoctor(response.data.doctor);
                } else {
                    setError(
                        response.data?.message ||
                        "Unable to load doctor details."
                    );
                }
            } catch (err) {
                console.error("Doctor details error:", err);

                setError(
                    err.response?.data?.message ||
                    "Unable to load doctor details."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDoctor();
    }, [doctorId]);

    const formatLanguages = (languages) => {
        if (!languages) {
            return ["English"];
        }

        return String(languages)
            .split(",")
            .map((language) => language.trim())
            .filter(Boolean);
    };

    const formatCurrency = (amount) => {
        const value = Number(amount);

        if (!Number.isFinite(value)) {
            return "Not available";
        }

        return `₹${value.toLocaleString("en-IN")}`;
    };

    if (loading) {
        return (
            <div className="doctor-details-page">
                <div className="doctor-details-loading">
                    <div className="doctor-loading-icon">
                        Doctor
                    </div>

                    <h2>Loading doctor details...</h2>

                    <p>Please wait.</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="doctor-details-page">
                <button
                    className="doctor-back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Doctors
                </button>

                <div className="doctor-details-error">
                    <div className="doctor-error-icon">
                        !
                    </div>

                    <h2>Unable to load doctor</h2>

                    <p>{error}</p>

                    <button
                        className="doctor-primary-button"
                        onClick={() => navigate(-1)}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!doctor) {
        return (
            <div className="doctor-details-page">
                <button
                    className="doctor-back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back to Doctors
                </button>

                <div className="doctor-details-error">
                    <div className="doctor-error-icon">
                        !
                    </div>

                    <h2>Doctor not found</h2>

                    <p>
                        The requested doctor could not be found.
                    </p>
                </div>
            </div>
        );
    }

    const languages = formatLanguages(doctor.languages);

    return (
        <div className="doctor-details-page">

            {/* Back */}

            <button
                className="doctor-back-button"
                onClick={() => navigate(-1)}
            >
                ← Back to Doctors
            </button>

            {/* Doctor Profile */}

            <section className="doctor-profile-card">

                <div className="doctor-profile-avatar">
                    DR
                </div>

                <div className="doctor-profile-content">

                    <div className="doctor-profile-label">
                        DOCTOR PROFILE
                    </div>

                    <h1>{doctor.name}</h1>

                    <p className="doctor-profile-specialization">
                        {doctor.specialization || "Medical Specialist"}
                    </p>

                    <div className="doctor-profile-rating">

                        <span className="rating-stars">
                            ★
                        </span>

                        <strong>
                            {Number(doctor.rating || 0).toFixed(1)}
                        </strong>

                        <span className="rating-reviews">
                            ({doctor.review_count || 0} reviews)
                        </span>

                    </div>

                    {doctor.is_verified && (
                        <div className="doctor-verified-badge">
                            ✓ Verified Doctor
                        </div>
                    )}

                </div>

            </section>

            {/* Main Information */}

            <div className="doctor-information-grid">

                {/* Professional Information */}

                <section className="doctor-information-card">

                    <div className="doctor-section-heading">

                        <div className="doctor-section-icon">
                            PRO
                        </div>

                        <div>
                            <h2>Professional Information</h2>

                            <p>
                                Doctor qualification and experience
                            </p>
                        </div>

                    </div>

                    <div className="doctor-information-list">

                        <div className="doctor-information-row">
                            <span>Qualification</span>
                            <strong>
                                {doctor.qualification || "Not available"}
                            </strong>
                        </div>

                        <div className="doctor-information-row">
                            <span>Specialization</span>
                            <strong>
                                {doctor.specialization || "Not available"}
                            </strong>
                        </div>

                        <div className="doctor-information-row">
                            <span>Experience</span>
                            <strong>
                                {doctor.experience_years !== null &&
                                doctor.experience_years !== undefined
                                    ? `${doctor.experience_years} years`
                                    : "Not available"}
                            </strong>
                        </div>

                        <div className="doctor-information-row">
                            <span>Consultation Fee</span>
                            <strong className="doctor-fee">
                                {formatCurrency(
                                    doctor.consultation_fee
                                )}
                            </strong>
                        </div>

                        <div className="doctor-information-row">
                            <span>Verification</span>
                            <strong
                                className={
                                    doctor.is_verified
                                        ? "doctor-verified"
                                        : "doctor-not-verified"
                                }
                            >
                                {doctor.is_verified
                                    ? "Verified"
                                    : "Not verified"}
                            </strong>
                        </div>

                    </div>

                </section>

                {/* Expertise */}

                <section className="doctor-information-card">

                    <div className="doctor-section-heading">

                        <div className="doctor-section-icon">
                            EXP
                        </div>

                        <div>
                            <h2>Expertise</h2>

                            <p>
                                Areas of medical expertise
                            </p>
                        </div>

                    </div>

                    <div className="doctor-description">
                        {doctor.expertise ||
                            "No expertise information available."}
                    </div>

                </section>

                {/* Diseases Treated */}

                <section className="doctor-information-card">

                    <div className="doctor-section-heading">

                        <div className="doctor-section-icon">
                            CARE
                        </div>

                        <div>
                            <h2>Diseases Treated</h2>

                            <p>
                                Conditions commonly treated
                            </p>
                        </div>

                    </div>

                    <div className="doctor-description">
                        {doctor.diseases_treated ||
                            "No disease information available."}
                    </div>

                </section>

                {/* Languages */}

                <section className="doctor-information-card">

                    <div className="doctor-section-heading">

                        <div className="doctor-section-icon">
                            LANG
                        </div>

                        <div>
                            <h2>Languages</h2>

                            <p>
                                Languages spoken by the doctor
                            </p>
                        </div>

                    </div>

                    <div className="doctor-language-list">

                        {languages.map((language, index) => (
                            <span
                                key={`${language}-${index}`}
                                className="doctor-language-tag"
                            >
                                {language}
                            </span>
                        ))}

                    </div>

                </section>

            </div>

            {/* Appointment */}

            <section className="doctor-appointment-card">

                <div>

                    <div className="doctor-appointment-label">
                        APPOINTMENT
                    </div>

                    <h2>
                        Book an appointment
                    </h2>

                    <p>
                        Check this doctor's available slots and
                        book your consultation.
                    </p>

                    <div className="doctor-appointment-fee">
                        Consultation fee:{" "}
                        <strong>
                            {formatCurrency(
                                doctor.consultation_fee
                            )}
                        </strong>
                    </div>

                </div>

                <button
                    className="doctor-appointment-button"
                    onClick={() =>
                        navigate(
                            `/appointments/book/${doctor.id}`
                        )
                    }
                >
                    Check Availability →
                </button>

            </section>

        </div>
    );
};

export default DoctorDetails;