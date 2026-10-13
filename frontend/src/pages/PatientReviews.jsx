import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "./PatientReviews.css";

const PatientReviews = () => {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [reviews, setReviews] = useState([]);

    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [selectedAppointment, setSelectedAppointment] =
        useState(null);

    const [hospitalRating, setHospitalRating] = useState(0);
    const [doctorRating, setDoctorRating] = useState(0);
    const [comment, setComment] = useState("");

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const [appointmentsResponse, reviewsResponse] =
                await Promise.all([
                    api.get("/appointments/my"),
                    api.get("/reviews/my"),
                ]);

            const appointmentList =
                appointmentsResponse.data?.appointments || [];

            const reviewList =
                reviewsResponse.data?.reviews || [];

            setAppointments(appointmentList);
            setReviews(reviewList);
        } catch (err) {
            console.error(
                "Failed to load reviews:",
                err
            );

            setError(
                err.response?.data?.message ||
                    "Failed to load reviews"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const hasReview = (appointmentId) => {
        return reviews.some(
            (review) =>
                Number(review.appointment_id) ===
                Number(appointmentId)
        );
    };

    const completedAppointments = appointments.filter(
        (appointment) =>
            appointment.status === "COMPLETED"
    );

    const reviewableAppointments =
        completedAppointments.filter(
            (appointment) =>
                !hasReview(appointment.id)
        );

    const openReviewForm = (appointment) => {
        setSelectedAppointment(appointment);

        setHospitalRating(0);
        setDoctorRating(0);
        setComment("");

        setError("");
        setSuccess("");
    };

    const closeReviewForm = () => {
        if (submitting) {
            return;
        }

        setSelectedAppointment(null);
        setHospitalRating(0);
        setDoctorRating(0);
        setComment("");
    };

    const submitReview = async (event) => {
        event.preventDefault();

        if (!selectedAppointment) {
            return;
        }

        if (
            hospitalRating === 0 &&
            doctorRating === 0
        ) {
            setError(
                "Please provide at least one rating."
            );

            return;
        }

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            await api.post("/reviews", {
                appointmentId:
                    selectedAppointment.id,

                hospitalRating:
                    hospitalRating || undefined,

                doctorRating:
                    doctorRating || undefined,

                comment:
                    comment.trim() || undefined,
            });

            setSuccess(
                "Review submitted successfully."
            );

            setSelectedAppointment(null);

            setHospitalRating(0);
            setDoctorRating(0);
            setComment("");

            await loadData();
        } catch (err) {
            console.error(
                "Submit review error:",
                err
            );

            setError(
                err.response?.data?.message ||
                    "Failed to submit review"
            );
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (
        rating,
        setRating,
        disabled = false
    ) => {
        return (
            <div className="review-stars">
                {[1, 2, 3, 4, 5].map(
                    (star) => (
                        <button
                            key={star}
                            type="button"
                            className={
                                star <= rating
                                    ? "review-star active"
                                    : "review-star"
                            }
                            onClick={() =>
                                setRating(star)
                            }
                            disabled={disabled}
                            aria-label={`Rate ${star} out of 5`}
                        >
                            ★
                        </button>
                    )
                )}
            </div>
        );
    };

    const formatDate = (value) => {
        if (!value) {
            return "Date unavailable";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return value;
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    return (
        <div className="patient-reviews-page">

            <div className="patient-reviews-header">

                <div>
                    <button
                        type="button"
                        className="reviews-back-button"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        ← Back
                    </button>

                    <div className="reviews-eyebrow">
                        PATIENT REVIEWS
                    </div>

                    <h1>
                        Your Reviews
                    </h1>

                    <p>
                        Rate your completed
                        consultations and share
                        your experience.
                    </p>
                </div>

            </div>

            {error && (
                <div className="reviews-message error">
                    {error}
                </div>
            )}

            {success && (
                <div className="reviews-message success">
                    {success}
                </div>
            )}

            {loading ? (
                <div className="reviews-loading">
                    <div className="reviews-spinner">
                        ⏳
                    </div>

                    <p>
                        Loading your reviews...
                    </p>
                </div>
            ) : (
                <>

                    <section className="reviews-section">

                        <div className="reviews-section-heading">
                            <div>
                                <h2>
                                    Appointments
                                    to Review
                                </h2>

                                <p>
                                    Completed
                                    appointments
                                    waiting for
                                    your feedback.
                                </p>
                            </div>

                            <span className="reviews-count">
                                {
                                    reviewableAppointments.length
                                }
                            </span>
                        </div>

                        {reviewableAppointments.length ===
                        0 ? (
                            <div className="reviews-empty">
                                <div className="reviews-empty-icon">
                                    ⭐
                                </div>

                                <h3>
                                    No pending reviews
                                </h3>

                                <p>
                                    Completed
                                    appointments
                                    that have not
                                    been reviewed
                                    will appear
                                    here.
                                </p>
                            </div>
                        ) : (
                            <div className="review-appointment-list">

                                {reviewableAppointments.map(
                                    (appointment) => (
                                        <article
                                            key={
                                                appointment.id
                                            }
                                            className="review-appointment-card"
                                        >

                                            <div className="review-card-icon">
                                                👨‍⚕️
                                            </div>

                                            <div className="review-card-content">

                                                <div className="review-card-top">

                                                    <div>
                                                        <h3>
                                                            {appointment.doctor_name ||
                                                                "Doctor"}
                                                        </h3>

                                                        <p className="review-specialization">
                                                            {appointment.specialization ||
                                                                "Medical Specialist"}
                                                        </p>
                                                    </div>

                                                    <span className="completed-badge">
                                                        COMPLETED
                                                    </span>

                                                </div>

                                                <div className="review-card-details">

                                                    <div>
                                                        <span>
                                                            🏥
                                                        </span>

                                                        <strong>
                                                            {appointment.hospital_name ||
                                                                "Hospital"}
                                                        </strong>
                                                    </div>

                                                    <div>
                                                        <span>
                                                            📅
                                                        </span>

                                                        <span>
                                                            {formatDate(
                                                                appointment.appointment_date
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div>
                                                        <span>
                                                            🕐
                                                        </span>

                                                        <span>
                                                            {appointment.appointment_time ||
                                                                "Time unavailable"}
                                                        </span>
                                                    </div>

                                                </div>

                                                <button
                                                    type="button"
                                                    className="write-review-button"
                                                    onClick={() =>
                                                        openReviewForm(
                                                            appointment
                                                        )
                                                    }
                                                >
                                                    ⭐ Write Review
                                                </button>

                                            </div>

                                        </article>
                                    )
                                )}

                            </div>
                        )}

                    </section>

                    <section className="reviews-section">

                        <div className="reviews-section-heading">
                            <div>
                                <h2>
                                    Submitted Reviews
                                </h2>

                                <p>
                                    Your previous
                                    feedback.
                                </p>
                            </div>

                            <span className="reviews-count">
                                {reviews.length}
                            </span>
                        </div>

                        {reviews.length === 0 ? (
                            <div className="reviews-empty compact">
                                <div className="reviews-empty-icon">
                                    💬
                                </div>

                                <h3>
                                    No reviews yet
                                </h3>

                                <p>
                                    Your submitted
                                    reviews will
                                    appear here.
                                </p>
                            </div>
                        ) : (
                            <div className="submitted-review-list">

                                {reviews.map(
                                    (review) => (
                                        <article
                                            key={
                                                review.id
                                            }
                                            className="submitted-review-card"
                                        >

                                            <div className="submitted-review-header">

                                                <div>
                                                    <h3>
                                                        {review.doctor_name ||
                                                            "Doctor"}
                                                    </h3>

                                                    <p>
                                                        {
                                                            review.hospital_name
                                                        }
                                                    </p>
                                                </div>

                                                <span>
                                                    {formatDate(
                                                        review.created_at
                                                    )}
                                                </span>

                                            </div>

                                            <div className="submitted-ratings">

                                                {review.hospital_rating && (
                                                    <div>
                                                        <strong>
                                                            Hospital
                                                        </strong>

                                                        <span>
                                                            {"★".repeat(
                                                                Number(
                                                                    review.hospital_rating
                                                                )
                                                            )}
                                                            {"☆".repeat(
                                                                5 -
                                                                    Number(
                                                                        review.hospital_rating
                                                                    )
                                                            )}
                                                        </span>
                                                    </div>
                                                )}

                                                {review.doctor_rating && (
                                                    <div>
                                                        <strong>
                                                            Doctor
                                                        </strong>

                                                        <span>
                                                            {"★".repeat(
                                                                Number(
                                                                    review.doctor_rating
                                                                )
                                                            )}
                                                            {"☆".repeat(
                                                                5 -
                                                                    Number(
                                                                        review.doctor_rating
                                                                    )
                                                            )}
                                                        </span>
                                                    </div>
                                                )}

                                            </div>

                                            {review.comment && (
                                                <p className="submitted-review-comment">
                                                    “
                                                    {
                                                        review.comment
                                                    }
                                                    ”
                                                </p>
                                            )}

                                        </article>
                                    )
                                )}

                            </div>
                        )}

                    </section>

                </>
            )}

            {selectedAppointment && (
                <div
                    className="review-modal-overlay"
                    onMouseDown={(event) => {
                        if (
                            event.target ===
                            event.currentTarget
                        ) {
                            closeReviewForm();
                        }
                    }}
                >

                    <div className="review-modal">

                        <div className="review-modal-header">

                            <div>
                                <div className="reviews-eyebrow">
                                    SHARE EXPERIENCE
                                </div>

                                <h2>
                                    Write a Review
                                </h2>

                                <p>
                                    {selectedAppointment.doctor_name}
                                    {" • "}
                                    {
                                        selectedAppointment.hospital_name
                                    }
                                </p>
                            </div>

                            <button
                                type="button"
                                className="review-modal-close"
                                onClick={
                                    closeReviewForm
                                }
                                disabled={submitting}
                            >
                                ×
                            </button>

                        </div>

                        <form
                            className="review-form"
                            onSubmit={
                                submitReview
                            }
                        >

                            <div className="rating-field">

                                <label>
                                    Hospital Rating
                                </label>

                                {renderStars(
                                    hospitalRating,
                                    setHospitalRating,
                                    submitting
                                )}

                                <span className="rating-helper">
                                    {hospitalRating
                                        ? `${hospitalRating}/5`
                                        : "Select a rating"}
                                </span>

                            </div>

                            <div className="rating-field">

                                <label>
                                    Doctor Rating
                                </label>

                                {renderStars(
                                    doctorRating,
                                    setDoctorRating,
                                    submitting
                                )}

                                <span className="rating-helper">
                                    {doctorRating
                                        ? `${doctorRating}/5`
                                        : "Select a rating"}
                                </span>

                            </div>

                            <div className="comment-field">

                                <label htmlFor="review-comment">
                                    Comment
                                </label>

                                <textarea
                                    id="review-comment"
                                    value={comment}
                                    onChange={(event) =>
                                        setComment(
                                            event.target
                                                .value
                                        )
                                    }
                                    placeholder="Share your experience..."
                                    rows="5"
                                    maxLength="1000"
                                    disabled={
                                        submitting
                                    }
                                />

                                <span>
                                    {comment.length}
                                    /1000
                                </span>

                            </div>

                            {error && (
                                <div className="reviews-message error">
                                    {error}
                                </div>
                            )}

                            <div className="review-form-actions">

                                <button
                                    type="button"
                                    className="review-cancel-button"
                                    onClick={
                                        closeReviewForm
                                    }
                                    disabled={
                                        submitting
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="review-submit-button"
                                    disabled={
                                        submitting ||
                                        (hospitalRating ===
                                            0 &&
                                            doctorRating ===
                                                0)
                                    }
                                >
                                    {submitting
                                        ? "Submitting..."
                                        : "Submit Review"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>
            )}

        </div>
    );
};

export default PatientReviews;