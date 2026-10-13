import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import api from "../services/api";

import "./Doctors.css";


const Doctors = () => {
    const navigate = useNavigate();

    const [doctors, setDoctors] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [searchTerm, setSearchTerm] = useState("");

    const [specialization, setSpecialization] =
        useState("ALL");


    // ============================================================
    // LOAD DOCTORS
    // ============================================================

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);

                setError("");

                /*
                 * Get the selected location from localStorage.
                 *
                 * Doctors should be discoverable based on the
                 * selected location.
                 */

                const storedLocation =
                    localStorage.getItem(
                        "cliniccare_location"
                    );

                let location = null;

                if (storedLocation) {
                    try {
                        location =
                            JSON.parse(
                                storedLocation
                            );
                    } catch {
                        location = null;
                    }
                }


                /*
                 * If there is no selected location,
                 * try the previously used location keys.
                 */

                if (!location) {
                    const state =
                        localStorage.getItem(
                            "cliniccare_state"
                        );

                    const city =
                        localStorage.getItem(
                            "cliniccare_city"
                        );

                    if (state || city) {
                        location = {
                            state,
                            city,
                        };
                    }
                }


                /*
                 * We already have demo doctors associated
                 * with hospitals in the database.
                 *
                 * If a location exists, load hospitals for
                 * that location and then load doctors from
                 * those hospitals.
                 */

                if (
                    location?.id ||
                    location?.locationId
                ) {
                    const locationId =
                        location.id ||
                        location.locationId;

                    const hospitalsResponse =
                        await api.get(
                            `/hospitals/location/${locationId}`
                        );

                    const hospitals =
                        hospitalsResponse.data
                            ?.hospitals || [];


                    if (
                        hospitals.length === 0
                    ) {
                        setDoctors([]);

                        setError(
                            "No hospitals were found for the selected location."
                        );

                        return;
                    }


                    const doctorResults =
                        await Promise.all(
                            hospitals.map(
                                async (hospital) => {
                                    try {
                                        const response =
                                            await api.get(
                                                `/hospitals/${hospital.id}/doctors`
                                            );

                                        return (
                                            response
                                                .data
                                                ?.doctors ||
                                            []
                                        );
                                    } catch (
                                        hospitalError
                                    ) {
                                        console.error(
                                            `Failed to load doctors for hospital ${hospital.id}:`,
                                            hospitalError
                                        );

                                        return [];
                                    }
                                }
                            )
                        );


                    const mergedDoctors =
                        doctorResults.flat();

                    setDoctors(
                        mergedDoctors
                    );

                    return;
                }


                /*
                 * No location selected.
                 *
                 * Instead of displaying the Hospitals page's
                 * "Location was not selected" error, show the
                 * user a useful Doctors page message.
                 */

                setDoctors([]);

                setError(
                    "Please select your state and city first."
                );

            } catch (err) {
                console.error(
                    "Doctors loading error:",
                    err
                );

                setDoctors([]);

                setError(
                    err.response?.data
                        ?.message ||
                    "Unable to load doctors."
                );

            } finally {
                setLoading(false);
            }
        };


        fetchDoctors();

    }, []);


    // ============================================================
    // SPECIALIZATIONS
    // ============================================================

    const specializations =
        useMemo(() => {
            const values =
                doctors
                    .map(
                        (doctor) =>
                            doctor.specialization
                    )
                    .filter(Boolean);

            return [
                "ALL",
                ...Array.from(
                    new Set(values)
                ),
            ];
        }, [doctors]);


    // ============================================================
    // FILTER DOCTORS
    // ============================================================

    const filteredDoctors =
        useMemo(() => {
            const search =
                searchTerm
                    .trim()
                    .toLowerCase();

            return doctors.filter(
                (doctor) => {
                    const matchesSearch =
                        !search ||
                        doctor.name
                            ?.toLowerCase()
                            .includes(search) ||
                        doctor.specialization
                            ?.toLowerCase()
                            .includes(search) ||
                        doctor.hospital_name
                            ?.toLowerCase()
                            .includes(search) ||
                        doctor.expertise
                            ?.toLowerCase()
                            .includes(search);

                    const matchesSpecialization =
                        specialization ===
                            "ALL" ||
                        doctor.specialization ===
                            specialization;

                    return (
                        matchesSearch &&
                        matchesSpecialization
                    );
                }
            );
        }, [
            doctors,
            searchTerm,
            specialization,
        ]);


    // ============================================================
    // FORMAT RATING
    // ============================================================

    const formatRating = (
        rating
    ) => {
        if (
            rating === null ||
            rating === undefined
        ) {
            return "New";
        }

        const numericRating =
            Number(rating);

        if (
            Number.isNaN(
                numericRating
            )
        ) {
            return "New";
        }

        if (numericRating === 0) {
            return "New";
        }

        return numericRating.toFixed(1);
    };


    // ============================================================
    // BOOK APPOINTMENT
    // ============================================================

    const handleBookAppointment = (
        doctorId
    ) => {
        navigate(
            `/appointments/book/${doctorId}`
        );
    };


    // ============================================================
    // VIEW DOCTOR
    // ============================================================

    const handleViewDoctor = (
        doctorId
    ) => {
        navigate(
            `/doctors/${doctorId}`
        );
    };


    // ============================================================
    // CHANGE LOCATION
    // ============================================================

    const handleChangeLocation = () => {
        navigate("/location");
    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="doctors-page">

                <div className="doctors-loading">

                    <div className="doctors-loading-spinner"></div>

                    <h2>
                        Loading doctors...
                    </h2>

                    <p>
                        Please wait while we
                        find doctors for you.
                    </p>

                </div>

            </div>
        );
    }


    // ============================================================
    // ERROR
    // ============================================================

    if (error) {
        return (
            <div className="doctors-page">

                <div className="doctors-error">

                    <div className="doctors-error-icon">
                        ⚕️
                    </div>

                    <h1>
                        Unable to load doctors
                    </h1>

                    <p>
                        {error}
                    </p>

                    <button
                        type="button"
                        className="doctors-primary-button"
                        onClick={
                            handleChangeLocation
                        }
                    >
                        ← Select Location
                    </button>

                </div>

            </div>
        );
    }


    // ============================================================
    // PAGE
    // ============================================================

    return (
        <div className="doctors-page">

            {/* =================================================
                HEADER
            ================================================== */}

            <div className="doctors-page-header">

                <div>

                    <p className="doctors-eyebrow">
                        DOCTOR DIRECTORY
                    </p>

                    <h1>
                        Find a Doctor
                    </h1>

                    <p className="doctors-subtitle">
                        Search doctors by
                        specialization,
                        experience,
                        hospital,
                        and consultation
                        fee.
                    </p>

                </div>


                <div className="doctors-count-card">

                    <strong>
                        {doctors.length}
                    </strong>

                    <span>
                        Doctors Available
                    </span>

                </div>

            </div>


            {/* =================================================
                SEARCH / FILTER
            ================================================== */}

            <div className="doctors-filters">

                <div className="doctor-search-box">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(
                                event.target.value
                            )
                        }
                        placeholder="Search doctor, specialization or hospital..."
                    />

                </div>


                <select
                    value={specialization}
                    onChange={(event) =>
                        setSpecialization(
                            event.target.value
                        )
                    }
                >
                    {specializations.map(
                        (item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item ===
                                "ALL"
                                    ? "All Specializations"
                                    : item}
                            </option>
                        )
                    )}
                </select>

            </div>


            {/* =================================================
                DOCTOR RESULTS
            ================================================== */}

            {filteredDoctors.length ===
                0 ? (
                <div className="doctors-empty">

                    <div className="doctors-empty-icon">
                        👨‍⚕️
                    </div>

                    <h2>
                        No doctors found
                    </h2>

                    <p>
                        Try changing your
                        search or
                        specialization
                        filter.
                    </p>

                </div>
            ) : (
                <div className="doctors-grid">

                    {filteredDoctors.map(
                        (doctor) => (
                            <div
                                className="doctor-card"
                                key={
                                    doctor.id
                                }
                            >

                                {/* =================================
                                    HEADER
                                ================================== */}

                                <div className="doctor-card-header">

                                    <div className="doctor-avatar">

                                        {(
                                            doctor.name ||
                                            "D"
                                        )
                                            .charAt(
                                                0
                                            )
                                            .toUpperCase()}

                                    </div>


                                    <div className="doctor-basic-info">

                                        <div className="doctor-name-row">

                                            <h2>
                                                {
                                                    doctor.name
                                                }
                                            </h2>

                                            {doctor.is_verified && (
                                                <span className="doctor-verified">
                                                    VERIFIED
                                                </span>
                                            )}

                                        </div>


                                        <p className="doctor-specialization">
                                            {
                                                doctor.specialization ||
                                                "Medical Specialist"
                                            }
                                        </p>

                                        <p className="doctor-qualification">
                                            {
                                                doctor.qualification ||
                                                "Medical Qualification"
                                            }
                                        </p>

                                    </div>

                                </div>


                                {/* =================================
                                    RATING
                                ================================== */}

                                <div className="doctor-rating">

                                    <span className="doctor-rating-star">
                                        ★
                                    </span>

                                    <strong>
                                        {formatRating(
                                            doctor.rating
                                        )}
                                    </strong>

                                    <span>
                                        (
                                        {
                                            doctor.review_count ||
                                            0
                                        }{" "}
                                        reviews)
                                    </span>

                                </div>


                                {/* =================================
                                    INFO
                                ================================== */}

                                <div className="doctor-info-grid">

                                    <div className="doctor-info-item">

                                        <span>
                                            EXPERIENCE
                                        </span>

                                        <strong>
                                            {
                                                doctor.experience_years ??
                                                0
                                            }{" "}
                                            years
                                        </strong>

                                    </div>


                                    <div className="doctor-info-item">

                                        <span>
                                            CONSULTATION
                                        </span>

                                        <strong>
                                            Rs.{" "}
                                            {
                                                doctor.consultation_fee ??
                                                0
                                            }
                                        </strong>

                                    </div>

                                </div>


                                {/* =================================
                                    HOSPITAL
                                ================================== */}

                                <div className="doctor-hospital">

                                    <span>
                                        HOSPITAL
                                    </span>

                                    <strong>
                                        {
                                            doctor.hospital_name ||
                                            "Hospital"
                                        }
                                    </strong>

                                </div>


                                {/* =================================
                                    EXPERTISE / LANGUAGES
                                ================================== */}

                                <div className="doctor-extra-grid">

                                    <div>

                                        <span>
                                            EXPERTISE
                                        </span>

                                        <p>
                                            {
                                                doctor.expertise ||
                                                "General medical consultation"
                                            }
                                        </p>

                                    </div>


                                    <div>

                                        <span>
                                            LANGUAGES
                                        </span>

                                        <p>
                                            {
                                                doctor.languages ||
                                                "English"
                                            }
                                        </p>

                                    </div>

                                </div>


                                {/* =================================
                                    ACTIONS
                                ================================== */}

                                <div className="doctor-card-actions">

                                    <button
                                        type="button"
                                        className="doctor-view-button"
                                        onClick={() =>
                                            handleViewDoctor(
                                                doctor.id
                                            )
                                        }
                                    >
                                        View Details
                                    </button>


                                    <button
                                        type="button"
                                        className="doctor-book-button"
                                        onClick={() =>
                                            handleBookAppointment(
                                                doctor.id
                                            )
                                        }
                                    >
                                        Book Appointment
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


export default Doctors;