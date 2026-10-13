import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./HospitalDetails.css";

const HospitalDetails = () => {
    const { hospitalId } = useParams();
    const navigate = useNavigate();

    const [hospital, setHospital] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [doctorsLoading, setDoctorsLoading] = useState(true);
    const [error, setError] = useState("");
    const [doctorsError, setDoctorsError] = useState("");

    useEffect(() => {
        const loadHospital = async () => {
            if (!hospitalId) {
                setError("Hospital ID is missing from the URL.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/hospitals/${hospitalId}`
                );

                if (
                    response.data?.success &&
                    response.data?.hospital
                ) {
                    setHospital(response.data.hospital);
                } else {
                    setError(
                        response.data?.message ||
                        "Hospital details were not returned by the server."
                    );
                }
            } catch (err) {
                console.error(
                    "Hospital details request failed:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to fetch hospital details."
                );
            } finally {
                setLoading(false);
            }
        };

        loadHospital();
    }, [hospitalId]);

    useEffect(() => {
        const loadDoctors = async () => {
            if (!hospitalId) {
                return;
            }

            try {
                setDoctorsLoading(true);
                setDoctorsError("");

                const response = await api.get(
                    `/hospitals/${hospitalId}/doctors`
                );

                if (response.data?.success) {
                    setDoctors(
                        Array.isArray(response.data.doctors)
                            ? response.data.doctors
                            : []
                    );
                } else {
                    setDoctorsError(
                        response.data?.message ||
                        "Unable to load doctors."
                    );
                }
            } catch (err) {
                console.error(
                    "Hospital doctors request failed:",
                    err
                );

                setDoctorsError(
                    err.response?.data?.message ||
                    "Unable to load doctors."
                );
            } finally {
                setDoctorsLoading(false);
            }
        };

        loadDoctors();
    }, [hospitalId]);

    // ------------------------------------------------------------
    // Loading
    // ------------------------------------------------------------

    if (loading) {
        return (
            <div className="hospital-details-page">
                <div className="hospital-details-loading">
                    <div className="hospital-loading-icon">
                        🏥
                    </div>

                    <h2>
                        Loading hospital details...
                    </h2>

                    <p>
                        Please wait while we load the hospital information.
                    </p>
                </div>
            </div>
        );
    }

    // ------------------------------------------------------------
    // Error
    // ------------------------------------------------------------

    if (error) {
        return (
            <div className="hospital-details-page">
                <div className="hospital-details-error">
                    <div className="hospital-error-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to load hospital
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        className="hospital-primary-button"
                        onClick={() => navigate("/hospitals")}
                    >
                        ← Back to Hospitals
                    </button>
                </div>
            </div>
        );
    }

    // ------------------------------------------------------------
    // No hospital
    // ------------------------------------------------------------

    if (!hospital) {
        return (
            <div className="hospital-details-page">
                <div className="hospital-details-error">
                    <div className="hospital-error-icon">
                        🏥
                    </div>

                    <h2>
                        Hospital not found
                    </h2>

                    <p>
                        The requested hospital could not be found.
                    </p>

                    <button
                        type="button"
                        className="hospital-primary-button"
                        onClick={() => navigate("/hospitals")}
                    >
                        ← Back to Hospitals
                    </button>
                </div>
            </div>
        );
    }

    const rating = Number(hospital.rating || 0);
    const reviewCount = Number(hospital.review_count || 0);

    return (
        <div className="hospital-details-page">

            {/* ========================================================
                HEADER
            ======================================================== */}

            <div className="hospital-details-header">

                <button
                    type="button"
                    className="back-button"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

                <div className="hospital-details-title">

                    <div className="hospital-large-icon">
                        🏥
                    </div>

                    <div className="hospital-title-content">

                        <div className="hospitals-eyebrow">
                            HOSPITAL DETAILS
                        </div>

                        <h1>
                            {hospital.name}
                        </h1>

                        <p className="hospital-address">
                            📍 {hospital.address || "Address not available"}
                        </p>

                        <p className="hospital-location">
                            {hospital.city}

                            {hospital.district &&
                                `, ${hospital.district}`}

                            {hospital.state &&
                                `, ${hospital.state}`}
                        </p>

                    </div>

                </div>

            </div>


            {/* ========================================================
                QUICK SUMMARY
            ======================================================== */}

            <div className="hospital-summary-grid">

                <div className="hospital-summary-card">

                    <div className="summary-icon">
                        ⭐
                    </div>

                    <div>
                        <span>
                            Patient Rating
                        </span>

                        <strong>
                            {rating.toFixed(1)} / 5
                        </strong>

                        <small>
                            {reviewCount} review
                            {reviewCount === 1 ? "" : "s"}
                        </small>
                    </div>

                </div>


                <div className="hospital-summary-card">

                    <div className="summary-icon">
                        🚑
                    </div>

                    <div>
                        <span>
                            Emergency
                        </span>

                        <strong
                            className={
                                hospital.emergency_available
                                    ? "summary-success"
                                    : "summary-danger"
                            }
                        >
                            {hospital.emergency_available
                                ? "Available"
                                : "Not Available"}
                        </strong>

                        <small>
                            Emergency services
                        </small>
                    </div>

                </div>


                <div className="hospital-summary-card">

                    <div className="summary-icon">
                        🏢
                    </div>

                    <div>
                        <span>
                            Departments
                        </span>

                        <strong>
                            {Array.isArray(hospital.departments)
                                ? hospital.departments.length
                                : 0}
                        </strong>

                        <small>
                            Medical departments
                        </small>
                    </div>

                </div>


                <div className="hospital-summary-card">

                    <div className="summary-icon">
                        👨‍⚕️
                    </div>

                    <div>
                        <span>
                            Doctors
                        </span>

                        <strong>
                            {doctors.length}
                        </strong>

                        <small>
                            Doctors at this hospital
                        </small>
                    </div>

                </div>

            </div>


            {/* ========================================================
                BASIC INFORMATION
            ======================================================== */}

            <div className="hospital-details-grid">

                {/* ABOUT */}

                <section className="hospital-info-card">

                    <div className="hospital-card-heading">
                        <span className="hospital-card-icon">
                            🏥
                        </span>

                        <div>
                            <h2>
                                About the Hospital
                            </h2>

                            <p>
                                Hospital overview
                            </p>
                        </div>
                    </div>

                    <p className="hospital-description">
                        {hospital.description ||
                            "Hospital information is available through ClinicCare."}
                    </p>

                </section>


                {/* RATING */}

                <section className="hospital-info-card">

                    <div className="hospital-card-heading">
                        <span className="hospital-card-icon">
                            ⭐
                        </span>

                        <div>
                            <h2>
                                Patient Rating
                            </h2>

                            <p>
                                Feedback from ClinicCare patients
                            </p>
                        </div>
                    </div>

                    <div className="hospital-rating-display">

                        <div className="rating-number">
                            {rating.toFixed(1)}
                        </div>

                        <div className="rating-details">

                            <div className="rating-stars">
                                {"★★★★★".split("").map(
                                    (star, index) => (
                                        <span
                                            key={index}
                                            className={
                                                index < Math.round(rating)
                                                    ? "star-active"
                                                    : "star-inactive"
                                            }
                                        >
                                            {star}
                                        </span>
                                    )
                                )}
                            </div>

                            <p>
                                Based on {reviewCount} patient
                                review
                                {reviewCount === 1 ? "" : "s"}
                            </p>

                        </div>

                    </div>

                </section>


                {/* CONTACT */}

                <section className="hospital-info-card">

                    <div className="hospital-card-heading">
                        <span className="hospital-card-icon">
                            📞
                        </span>

                        <div>
                            <h2>
                                Contact Information
                            </h2>

                            <p>
                                Hospital contact details
                            </p>
                        </div>
                    </div>

                    <div className="hospital-contact-list">

                        {hospital.phone && (
                            <div className="hospital-contact-item">
                                <span>
                                    📞
                                </span>

                                <div>
                                    <small>
                                        Phone
                                    </small>

                                    <strong>
                                        {hospital.phone}
                                    </strong>
                                </div>
                            </div>
                        )}

                        {hospital.email && (
                            <div className="hospital-contact-item">
                                <span>
                                    ✉️
                                </span>

                                <div>
                                    <small>
                                        Email
                                    </small>

                                    <strong>
                                        {hospital.email}
                                    </strong>
                                </div>
                            </div>
                        )}

                        {hospital.website && (
                            <div className="hospital-contact-item">
                                <span>
                                    🌐
                                </span>

                                <div>
                                    <small>
                                        Website
                                    </small>

                                    <a
                                        href={hospital.website}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        {hospital.website}
                                    </a>
                                </div>
                            </div>
                        )}

                    </div>

                </section>


                {/* EMERGENCY */}

                <section className="hospital-info-card">

                    <div className="hospital-card-heading">
                        <span className="hospital-card-icon">
                            🚑
                        </span>

                        <div>
                            <h2>
                                Emergency Services
                            </h2>

                            <p>
                                Emergency availability
                            </p>
                        </div>
                    </div>

                    <div
                        className={
                            hospital.emergency_available
                                ? "emergency-available"
                                : "emergency-unavailable"
                        }
                    >
                        <span>
                            {hospital.emergency_available
                                ? "✓"
                                : "!"}
                        </span>

                        {hospital.emergency_available
                            ? "Emergency services available"
                            : "Emergency services not available"}
                    </div>

                </section>

            </div>


            {/* ========================================================
                DEPARTMENTS
            ======================================================== */}

            <section className="hospital-section-card">

                <div className="hospital-section-header">

                    <div>
                        <div className="section-eyebrow">
                            MEDICAL SERVICES
                        </div>

                        <h2>
                            Departments
                        </h2>

                        <p>
                            Medical departments available at this hospital.
                        </p>
                    </div>

                    <div className="section-count">
                        {Array.isArray(hospital.departments)
                            ? hospital.departments.length
                            : 0}
                    </div>

                </div>

                {Array.isArray(hospital.departments) &&
                hospital.departments.length > 0 ? (

                    <div className="hospital-tag-grid">

                        {hospital.departments.map(
                            (department) => (
                                <div
                                    className="hospital-tag-card"
                                    key={department.id}
                                >
                                    <div className="tag-icon">
                                        🩺
                                    </div>

                                    <div>
                                        <strong>
                                            {department.name}
                                        </strong>

                                        {department.description && (
                                            <p>
                                                {department.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        )}

                    </div>

                ) : (

                    <p className="empty-section">
                        Department information is not available.
                    </p>

                )}

            </section>


            {/* ========================================================
                FACILITIES
            ======================================================== */}

            <section className="hospital-section-card">

                <div className="hospital-section-header">

                    <div>
                        <div className="section-eyebrow">
                            HOSPITAL SERVICES
                        </div>

                        <h2>
                            Facilities & Equipment
                        </h2>

                        <p>
                            Facilities and healthcare services available
                            at this hospital.
                        </p>
                    </div>

                    <div className="section-count">
                        {Array.isArray(hospital.facilities)
                            ? hospital.facilities.length
                            : 0}
                    </div>

                </div>

                {Array.isArray(hospital.facilities) &&
                hospital.facilities.length > 0 ? (

                    <div className="hospital-tag-grid">

                        {hospital.facilities.map(
                            (facility) => (
                                <div
                                    className="hospital-tag-card"
                                    key={facility.id}
                                >
                                    <div className="tag-icon">
                                        🧪
                                    </div>

                                    <div>
                                        <strong>
                                            {facility.name}
                                        </strong>

                                        {facility.description && (
                                            <p>
                                                {facility.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )
                        )}

                    </div>

                ) : (

                    <p className="empty-section">
                        Facility information is not available.
                    </p>

                )}

            </section>


            {/* ========================================================
                DOCTORS
            ======================================================== */}

            <section className="hospital-section-card">

                <div className="hospital-section-header">

                    <div>
                        <div className="section-eyebrow">
                            MEDICAL PROFESSIONALS
                        </div>

                        <h2>
                            Doctors
                        </h2>

                        <p>
                            Doctors practicing at this hospital.
                        </p>
                    </div>

                    <div className="section-count">
                        {doctors.length}
                    </div>

                </div>


                {doctorsLoading ? (

                    <div className="doctors-loading">
                        <div className="small-spinner"></div>
                        <span>
                            Loading doctors...
                        </span>
                    </div>

                ) : doctorsError ? (

                    <div className="doctors-error">
                        <p>
                            {doctorsError}
                        </p>

                        <button
                            type="button"
                            onClick={() =>
                                navigate(
                                    `/hospitals/${hospital.id}/doctors`
                                )
                            }
                        >
                            View Doctors
                        </button>
                    </div>

                ) : doctors.length === 0 ? (

                    <div className="empty-doctors">
                        <div>
                            👨‍⚕️
                        </div>

                        <h3>
                            No doctors available
                        </h3>

                        <p>
                            Doctor information is not currently
                            available for this hospital.
                        </p>
                    </div>

                ) : (

                    <div className="doctor-card-grid">

                        {doctors.map((doctor) => {

                            const doctorRating = Number(
                                doctor.rating || 0
                            );

                            return (
                                <article
                                    className="hospital-doctor-card"
                                    key={doctor.id}
                                >

                                    <div className="doctor-card-top">

                                        <div className="doctor-avatar">
                                            👨‍⚕️
                                        </div>

                                        <div className="doctor-card-title">

                                            <h3>
                                                {doctor.name}
                                            </h3>

                                            <p className="doctor-specialization">
                                                {doctor.specialization ||
                                                    "Medical Specialist"}
                                            </p>

                                            {doctor.is_verified && (
                                                <span className="verified-badge">
                                                    ✓ Verified
                                                </span>
                                            )}

                                        </div>

                                    </div>


                                    <div className="doctor-rating-row">

                                        <span className="doctor-rating">
                                            ⭐{" "}
                                            {doctorRating.toFixed(1)}
                                        </span>

                                        <span className="doctor-review-count">
                                            ({doctor.review_count || 0} reviews)
                                        </span>

                                    </div>


                                    <div className="doctor-info-list">

                                        <div>
                                            <span>
                                                Qualification
                                            </span>

                                            <strong>
                                                {doctor.qualification ||
                                                    "Not available"}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>
                                                Experience
                                            </span>

                                            <strong>
                                                {doctor.experience_years != null
                                                    ? `${doctor.experience_years} years`
                                                    : "Not available"}
                                            </strong>
                                        </div>

                                        <div>
                                            <span>
                                                Consultation Fee
                                            </span>

                                            <strong className="doctor-fee">
                                                ₹
                                                {Number(
                                                    doctor.consultation_fee || 0
                                                ).toLocaleString("en-IN")}
                                            </strong>
                                        </div>

                                    </div>


                                    {doctor.expertise && (
                                        <div className="doctor-card-section">

                                            <span className="doctor-field-label">
                                                Expertise
                                            </span>

                                            <p>
                                                {doctor.expertise}
                                            </p>

                                        </div>
                                    )}


                                    {doctor.diseases_treated && (
                                        <div className="doctor-card-section">

                                            <span className="doctor-field-label">
                                                Diseases Treated
                                            </span>

                                            <p>
                                                {doctor.diseases_treated}
                                            </p>

                                        </div>
                                    )}


                                    {doctor.languages && (
                                        <div className="doctor-card-section">

                                            <span className="doctor-field-label">
                                                Languages
                                            </span>

                                            <div className="doctor-language-tags">

                                                {doctor.languages
                                                    .split(",")
                                                    .map(
                                                        (
                                                            language,
                                                            index
                                                        ) => (
                                                            <span
                                                                key={index}
                                                            >
                                                                {language.trim()}
                                                            </span>
                                                        )
                                                    )}

                                            </div>

                                        </div>
                                    )}


                                    <button
                                        type="button"
                                        className="doctor-view-button"
                                        onClick={() =>
                                            navigate(
                                                `/doctors/${doctor.id}`
                                            )
                                        }
                                    >
                                        View Doctor Details →
                                    </button>

                                </article>
                            );
                        })}

                    </div>

                )}


                <div className="hospital-doctors-footer">

                    <button
                        type="button"
                        className="view-doctors-button"
                        onClick={() =>
                            navigate(
                                `/hospitals/${hospital.id}/doctors`
                            )
                        }
                    >
                        View All Doctors →
                    </button>

                </div>

            </section>

        </div>
    );
};

export default HospitalDetails;