import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

const HospitalDoctors = () => {
    const { hospitalId } = useParams();
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadDoctors = async () => {
            if (!hospitalId) {
                setError("Hospital ID is missing.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/hospitals/${hospitalId}/doctors`
                );

                console.log("Doctors API response:", response.data);

                if (response.data?.success) {
                    setDoctors(response.data.doctors || []);
                } else {
                    setError(
                        response.data?.message ||
                        "Unable to load doctors."
                    );
                }
            } catch (err) {
                console.error("Doctors loading error:", err);

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to load doctors."
                );
            } finally {
                setLoading(false);
            }
        };

        loadDoctors();
    }, [hospitalId]);

    if (loading) {
        return (
            <div className="hospital-doctors-page">
                <div className="hospital-doctors-loading">
                    Loading doctors...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="hospital-doctors-page">
                <div className="hospital-doctors-error">
                    <h2>Unable to load doctors</h2>
                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(`/hospitals/${hospitalId}`)
                        }
                    >
                        ← Back to Hospital
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="hospital-doctors-page">

            <div className="hospital-doctors-header">

                <button
                    type="button"
                    className="back-button"
                    onClick={() =>
                        navigate(`/hospitals/${hospitalId}`)
                    }
                >
                    ← Back to Hospital
                </button>

                <div>
                    <div className="hospitals-eyebrow">
                        CLINICCARE
                    </div>

                    <h1>Doctors</h1>

                    <p>
                        Doctors available at this hospital.
                    </p>
                </div>

            </div>


            {doctors.length === 0 ? (
                <div className="hospital-doctors-empty">
                    <h2>No doctors available</h2>
                    <p>
                        There are currently no active doctors
                        listed for this hospital.
                    </p>
                </div>
            ) : (

                <div className="doctor-grid">

                    {doctors.map((doctor) => (

                        <div
                            className="doctor-card"
                            key={doctor.id}
                        >

                            <div className="doctor-card-top">

                                <div className="doctor-avatar">
                                    👨‍⚕️
                                </div>

                                <div className="doctor-rating">
                                    ⭐{" "}
                                    {Number(
                                        doctor.rating || 0
                                    ).toFixed(1)}
                                </div>

                            </div>


                            <h2>
                                {doctor.name}
                            </h2>


                            <p className="doctor-specialization">
                                {doctor.specialization ||
                                    "Medical Specialist"}
                            </p>


                            <div className="doctor-details">

                                {doctor.qualification && (
                                    <div>
                                        <span>
                                            Qualification
                                        </span>

                                        <strong>
                                            {doctor.qualification}
                                        </strong>
                                    </div>
                                )}

                                {doctor.experience_years !==
                                    undefined && (
                                    <div>
                                        <span>
                                            Experience
                                        </span>

                                        <strong>
                                            {doctor.experience_years}{" "}
                                            year(s)
                                        </strong>
                                    </div>
                                )}

                                {doctor.consultation_fee !==
                                    undefined && (
                                    <div>
                                        <span>
                                            Consultation Fee
                                        </span>

                                        <strong>
                                            ₹
                                            {
                                                doctor.consultation_fee
                                            }
                                        </strong>
                                    </div>
                                )}

                            </div>


                            <div className="doctor-card-footer">

                                <span>
                                    {doctor.review_count || 0}{" "}
                                    review(s)
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(
                                            `/doctors/${doctor.id}`
                                        )
                                    }
                                >
                                    View Doctor →
                                </button>

                            </div>

                        </div>

                    ))}

                </div>
            )}

        </div>
    );
};

export default HospitalDoctors;