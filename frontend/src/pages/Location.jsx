import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";

import "./Location.css";


const Location = () => {
    const navigate = useNavigate();


    // ============================================================
    // STATE
    // ============================================================

    const [locations, setLocations] = useState([]);

    const [states, setStates] = useState([]);

    const [cities, setCities] = useState([]);

    const [selectedState, setSelectedState] =
        useState("");

    const [selectedCity, setSelectedCity] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // ============================================================
    // FETCH LOCATIONS
    // ============================================================

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                setLoading(true);

                setError("");

                const response =
                    await api.get("/locations");

                console.log(
                    "ClinicCare locations response:",
                    response.data
                );


                const locationData =
                    response.data?.locations ||
                    response.data?.data ||
                    [];


                setLocations(locationData);


                // ------------------------------------------------
                // GET UNIQUE STATES
                // ------------------------------------------------

                const uniqueStates = [
                    ...new Set(
                        locationData
                            .map(
                                (location) =>
                                    location.state
                            )
                            .filter(Boolean)
                    ),
                ];


                setStates(
                    uniqueStates
                );


                // ------------------------------------------------
                // RESTORE PREVIOUSLY SELECTED LOCATION
                // ------------------------------------------------

                const savedLocation =
                    localStorage.getItem(
                        "cliniccare_location"
                    );


                if (savedLocation) {
                    try {
                        const parsedLocation =
                            JSON.parse(
                                savedLocation
                            );


                        if (
                            parsedLocation?.state &&
                            parsedLocation?.city
                        ) {
                            setSelectedState(
                                parsedLocation.state
                            );


                            const restoredCities = [
                                ...new Set(
                                    locationData
                                        .filter(
                                            (
                                                location
                                            ) =>
                                                location.state ===
                                                parsedLocation.state
                                        )
                                        .map(
                                            (
                                                location
                                            ) =>
                                                location.city
                                        )
                                        .filter(
                                            Boolean
                                        )
                                ),
                            ];


                            setCities(
                                restoredCities
                            );


                            setSelectedCity(
                                parsedLocation.city
                            );
                        }

                    } catch (storageError) {
                        console.error(
                            "Unable to restore saved location:",
                            storageError
                        );

                        localStorage.removeItem(
                            "cliniccare_location"
                        );
                    }
                }

            } catch (err) {
                console.error(
                    "Location fetch error:",
                    err
                );


                setError(
                    err.response?.data
                        ?.message ||
                    "Unable to load locations."
                );

            } finally {
                setLoading(false);
            }
        };


        fetchLocations();

    }, []);


    // ============================================================
    // STATE CHANGE
    // ============================================================

    const handleStateChange = (e) => {
        const state =
            e.target.value;


        setSelectedState(
            state
        );


        setSelectedCity("");


        setError("");


        // --------------------------------------------------------
        // GET CITIES FOR SELECTED STATE
        // --------------------------------------------------------

        const stateCities = [
            ...new Set(
                locations
                    .filter(
                        (location) =>
                            location.state ===
                            state
                    )
                    .map(
                        (location) =>
                            location.city
                    )
                    .filter(Boolean)
            ),
        ];


        setCities(
            stateCities
        );


        // --------------------------------------------------------
        // Remove previous saved location because the state changed
        // --------------------------------------------------------

        localStorage.removeItem(
            "cliniccare_location"
        );
    };


    // ============================================================
    // CITY CHANGE
    // ============================================================

    const handleCityChange = (e) => {
        const city =
            e.target.value;


        setSelectedCity(
            city
        );


        setError("");
    };


    // ============================================================
    // FIND HOSPITALS
    // ============================================================

    const handleFindHospitals = () => {

        // --------------------------------------------------------
        // VALIDATE STATE + CITY
        // --------------------------------------------------------

        if (
            !selectedState ||
            !selectedCity
        ) {
            setError(
                "Please select both state and city."
            );

            return;
        }


        // --------------------------------------------------------
        // FIND LOCATION RECORD
        // --------------------------------------------------------

        const selectedLocation =
            locations.find(
                (location) =>
                    location.state ===
                        selectedState &&
                    location.city ===
                        selectedCity
            );


        if (!selectedLocation) {
            setError(
                "Location not found."
            );

            return;
        }


        // ========================================================
        // SAVE LOCATION
        //
        // This is the important change.
        //
        // Hospitals, Doctors and other patient pages can now
        // retrieve the selected location from localStorage.
        // ========================================================

        const locationToSave = {
            id:
                selectedLocation.id,

            locationId:
                selectedLocation.id,

            state:
                selectedLocation.state,

            district:
                selectedLocation.district ||
                "",

            city:
                selectedLocation.city,
        };


        localStorage.setItem(
            "cliniccare_location",
            JSON.stringify(
                locationToSave
            )
        );


        // --------------------------------------------------------
        // Also save individual values for compatibility
        // --------------------------------------------------------

        localStorage.setItem(
            "cliniccare_location_id",
            String(
                selectedLocation.id
            )
        );


        localStorage.setItem(
            "cliniccare_state",
            selectedLocation.state
        );


        localStorage.setItem(
            "cliniccare_city",
            selectedLocation.city
        );


        console.log(
            "ClinicCare selected location:",
            locationToSave
        );


        // --------------------------------------------------------
        // GO TO HOSPITALS
        // --------------------------------------------------------

        navigate(
            `/hospitals?locationId=${selectedLocation.id}`
        );
    };


    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="location-page">

                <div className="location-loading">

                    <div className="location-loading-icon">
                        📍
                    </div>


                    <h2>
                        Loading locations...
                    </h2>


                    <p>
                        Please wait while we
                        load available
                        locations.
                    </p>

                </div>

            </div>
        );
    }


    // ============================================================
    // PAGE
    // ============================================================

    return (
        <div className="location-page">

            {/* ====================================================
                HEADER
            ===================================================== */}

            <div className="location-header">

                <div>

                    <div className="location-label">
                        FIND HEALTHCARE
                    </div>


                    <h1>
                        Select Your Location
                    </h1>


                    <p>
                        Choose your state and
                        city to find hospitals
                        and doctors near you.
                    </p>

                </div>


                <div className="location-header-icon">
                    📍
                </div>

            </div>


            {/* ====================================================
                ERROR
            ===================================================== */}

            {error && (
                <div className="location-error">
                    {error}
                </div>
            )}


            {/* ====================================================
                LOCATION CARD
            ===================================================== */}

            <div className="location-card">

                <div className="location-card-header">

                    <div className="location-card-icon">
                        📍
                    </div>


                    <div>

                        <h2>
                            Choose Location
                        </h2>


                        <p>
                            Select where you want
                            to find healthcare
                            services.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    FORM
                ================================================== */}

                <div className="location-form">

                    {/* =============================================
                        STATE
                    ============================================== */}

                    <div className="location-field">

                        <label htmlFor="state">
                            State
                        </label>


                        <select
                            id="state"
                            value={
                                selectedState
                            }
                            onChange={
                                handleStateChange
                            }
                        >

                            <option value="">
                                Select State
                            </option>


                            {states.map(
                                (state) => (
                                    <option
                                        key={state}
                                        value={state}
                                    >
                                        {state}
                                    </option>
                                )
                            )}

                        </select>

                    </div>


                    {/* =============================================
                        CITY
                    ============================================== */}

                    <div className="location-field">

                        <label htmlFor="city">
                            City
                        </label>


                        <select
                            id="city"
                            value={
                                selectedCity
                            }
                            onChange={
                                handleCityChange
                            }
                            disabled={
                                !selectedState
                            }
                        >

                            <option value="">
                                Select City
                            </option>


                            {cities.map(
                                (city) => (
                                    <option
                                        key={city}
                                        value={city}
                                    >
                                        {city}
                                    </option>
                                )
                            )}

                        </select>

                    </div>

                </div>


                {/* =================================================
                    BUTTON
                ================================================== */}

                <button
                    type="button"
                    className="location-button"
                    onClick={
                        handleFindHospitals
                    }
                    disabled={
                        !selectedState ||
                        !selectedCity
                    }
                >

                    Find Hospitals

                    <span>
                        →
                    </span>

                </button>

            </div>


            {/* ====================================================
                QUICK INFORMATION
            ===================================================== */}

            <div className="location-info-grid">

                {/* =================================================
                    HOSPITALS
                ================================================== */}

                <div className="location-info-card">

                    <div className="info-icon">
                        🏥
                    </div>


                    <div>

                        <h3>
                            Hospitals
                        </h3>


                        <p>
                            Find hospitals
                            available in your
                            selected city.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    DOCTORS
                ================================================== */}

                <div className="location-info-card">

                    <div className="info-icon">
                        👨‍⚕️
                    </div>


                    <div>

                        <h3>
                            Doctors
                        </h3>


                        <p>
                            Browse doctors and
                            medical specialists.
                        </p>

                    </div>

                </div>


                {/* =================================================
                    APPOINTMENTS
                ================================================== */}

                <div className="location-info-card">

                    <div className="info-icon">
                        📅
                    </div>


                    <div>

                        <h3>
                            Appointments
                        </h3>


                        <p>
                            Check availability
                            and book
                            appointments.
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};


export default Location;