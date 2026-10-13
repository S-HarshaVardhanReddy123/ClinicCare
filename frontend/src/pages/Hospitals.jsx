import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";

const Hospitals = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const locationId = searchParams.get("locationId");

    const [hospitals, setHospitals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadHospitals = async () => {
            if (!locationId) {
                setError("Location was not selected.");
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError("");

                const response = await api.get(
                    `/hospitals/location/${locationId}`
                );

                console.log(
                    "Hospitals API response:",
                    response.data
                );

                if (response.data?.success) {
                    setHospitals(response.data.hospitals || []);
                } else {
                    setError(
                        response.data?.message ||
                        "Unable to load hospitals."
                    );
                }
            } catch (err) {
                console.error(
                    "Hospitals loading error:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    err.message ||
                    "Unable to load hospitals."
                );
            } finally {
                setLoading(false);
            }
        };

        loadHospitals();
    }, [locationId]);


    // ------------------------------------------------------------
    // Loading
    // ------------------------------------------------------------

    if (loading) {
        return (
            <div className="hospitals-page">
                <div className="hospitals-loading">
                    Loading hospitals...
                </div>
            </div>
        );
    }


    // ------------------------------------------------------------
    // Error
    // ------------------------------------------------------------

    if (error) {
        return (
            <div className="hospitals-page">
                <div className="hospitals-error">
                    <h2>Unable to load hospitals</h2>

                    <p>{error}</p>

                    <button
                        type="button"
                        onClick={() => navigate("/location")}
                    >
                        ← Change Location
                    </button>
                </div>
            </div>
        );
    }


    // ------------------------------------------------------------
    // Empty
    // ------------------------------------------------------------

    if (hospitals.length === 0) {
        return (
            <div className="hospitals-page">

                <div className="hospitals-header">
                    <div>
                        <div className="hospitals-eyebrow">
                            CLINICCARE
                        </div>

                        <h1>
                            Hospitals
                        </h1>

                        <p>
                            No hospitals were found for this location.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="change-location-button"
                        onClick={() => navigate("/location")}
                    >
                        Change Location
                    </button>
                </div>

            </div>
        );
    }


    // ------------------------------------------------------------
    // Hospital List
    // ------------------------------------------------------------

    return (
        <div className="hospitals-page">

            {/* Header */}

            <div className="hospitals-header">

                <div>

                    <div className="hospitals-eyebrow">
                        CLINICCARE
                    </div>

                    <h1>
                        Hospitals
                    </h1>

                    <p>
                        Hospitals available in your selected location.
                    </p>

                </div>

                <button
                    type="button"
                    className="change-location-button"
                    onClick={() => navigate("/location")}
                >
                    Change Location
                </button>

            </div>


            {/* Hospital Grid */}

            <div className="hospital-grid">

                {hospitals.map((hospital) => {

                    /*
                     * The backend returns the hospital ID
                     * as hospital.id.
                     *
                     * Convert it to a string so routing is
                     * always safe.
                     */

                    const hospitalId = hospital.id;

                    return (
                        <div
                            className="hospital-card"
                            key={hospitalId}
                        >

                            {/* Hospital Top */}

                            <div className="hospital-card-top">

                                <div className="hospital-icon">
                                    🏥
                                </div>

                                <div className="hospital-rating">
                                    ⭐{" "}
                                    {Number(
                                        hospital.rating || 0
                                    ).toFixed(1)}
                                </div>

                            </div>


                            {/* Hospital Name */}

                            <h2>
                                {hospital.name}
                            </h2>


                            {/* Address */}

                            <p className="hospital-address">
                                📍 {hospital.address}
                            </p>


                            {/* Information */}

                            <div className="hospital-card-info">

                                <div>

                                    <span>
                                        Emergency
                                    </span>

                                    <strong>
                                        {hospital.emergency_available
                                            ? "Available"
                                            : "Not Available"}
                                    </strong>

                                </div>


                                <div>

                                    <span>
                                        Reviews
                                    </span>

                                    <strong>
                                        {hospital.review_count || 0}
                                    </strong>

                                </div>

                            </div>


                            {/* View Hospital */}

                            <button
                                type="button"
                                className="view-hospital-button"
                                onClick={() => {

                                    console.log(
                                        "Selected hospital:",
                                        hospital
                                    );

                                    console.log(
                                        "Selected hospital ID:",
                                        hospitalId
                                    );

                                    if (!hospitalId) {
                                        console.error(
                                            "Hospital ID is missing:",
                                            hospital
                                        );

                                        return;
                                    }

                                    navigate(
                                        `/hospitals/${hospitalId}`
                                    );
                                }}
                            >
                                View Hospital →
                            </button>

                        </div>
                    );
                })}

            </div>

        </div>
    );
};

export default Hospitals;