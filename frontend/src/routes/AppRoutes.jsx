import React from "react";
import {
    Navigate,
    Outlet,
    Route,
    Routes,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";


// ============================================================
// LAYOUTS
// ============================================================

import PatientLayout from "../components/PatientLayout";
import DoctorLayout from "../layouts/DoctorLayout";


// ============================================================
// AUTH PAGES
// ============================================================

import Login from "../pages/Login";
import Register from "../pages/Register";


// ============================================================
// PATIENT PAGES
// ============================================================

import PatientDashboard from "../pages/PatientDashboard";
import Location from "../pages/Location";
import Hospitals from "../pages/Hospitals";
import HospitalDetails from "../pages/HospitalDetails";
import HospitalDoctors from "../pages/HospitalDoctors";
import Doctors from "../pages/Doctors";
import DoctorDetails from "../pages/DoctorDetails";

import Appointments from "../pages/Appointments";
import AppointmentBooking from "../pages/AppointmentBooking";
import PatientAppointmentDetails from "../pages/PatientAppointmentDetails";

import PatientPrescriptions from "../pages/PatientPrescriptions";
import PatientPrescriptionDetails from "../pages/PatientPrescriptionDetails";

import PatientPayments from "../pages/PatientPayments";
import PatientReviews from "../pages/PatientReviews";


// ============================================================
// DOCTOR PAGES
// ============================================================

import DoctorDashboard from "../pages/DoctorDashboard";
import DoctorAppointments from "../pages/DoctorAppointments";
import DoctorAppointmentDetails from "../pages/DoctorAppointmentDetails";
import DoctorPrescription from "../pages/DoctorPrescription";


// ============================================================
// ADMIN PAGES
// ============================================================

import AdminDashboard from "../pages/AdminDashboard";
import AdminUsers from "../pages/AdminUsers";


// ============================================================
// COMING SOON COMPONENT
// ============================================================

const ComingSoon = ({
    title = "This page",
}) => {
    return (
        <div
            style={{
                minHeight: "70vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "30px",
                textAlign: "center",
            }}
        >
            <div>

                <h1
                    style={{
                        marginBottom: "10px",
                        color: "#172033",
                    }}
                >
                    {title}
                </h1>

                <p
                    style={{
                        margin: 0,
                        color: "#64748b",
                    }}
                >
                    This feature is coming soon.
                </p>

            </div>
        </div>
    );
};


// ============================================================
// PATIENT PROTECTED ROUTE
// ============================================================

const PatientProtected = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (user.role !== "PATIENT") {

        if (user.role === "DOCTOR") {
            return (
                <Navigate
                    to="/doctor/dashboard"
                    replace
                />
            );
        }

        if (user.role === "ADMIN") {
            return (
                <Navigate
                    to="/admin/dashboard"
                    replace
                />
            );
        }

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
};


// ============================================================
// DOCTOR PROTECTED ROUTE
// ============================================================

const DoctorProtected = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (user.role !== "DOCTOR") {

        if (user.role === "PATIENT") {
            return (
                <Navigate
                    to="/dashboard"
                    replace
                />
            );
        }

        if (user.role === "ADMIN") {
            return (
                <Navigate
                    to="/admin/dashboard"
                    replace
                />
            );
        }

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
};


// ============================================================
// ADMIN PROTECTED ROUTE
// ============================================================

const AdminProtected = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null;
    }

    if (!user) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    if (user.role !== "ADMIN") {

        if (user.role === "PATIENT") {
            return (
                <Navigate
                    to="/dashboard"
                    replace
                />
            );
        }

        if (user.role === "DOCTOR") {
            return (
                <Navigate
                    to="/doctor/dashboard"
                    replace
                />
            );
        }

        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }

    return <Outlet />;
};


// ============================================================
// APP ROUTES
// ============================================================

const AppRoutes = () => {
    return (
        <Routes>

            {/* ==================================================
                PUBLIC ROUTES
            ================================================== */}

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* ==================================================
                PATIENT ROUTES
            ================================================== */}

            <Route element={<PatientProtected />}>

                <Route
                    element={<PatientLayout />}
                >

                    {/* Dashboard */}

                    <Route
                        path="/dashboard"
                        element={
                            <PatientDashboard />
                        }
                    />


                    {/* Location */}

                    <Route
                        path="/location"
                        element={
                            <Location />
                        }
                    />


                    {/* Hospitals */}

                    <Route
                        path="/hospitals"
                        element={
                            <Hospitals />
                        }
                    />


                    <Route
                        path="/hospitals/:hospitalId"
                        element={
                            <HospitalDetails />
                        }
                    />


                    <Route
                        path="/hospitals/:hospitalId/doctors"
                        element={
                            <HospitalDoctors />
                        }
                    />


                    {/* Doctors */}

                    <Route
                        path="/doctors"
                        element={
                            <Doctors />
                        }
                    />


                    <Route
                        path="/doctors/:doctorId"
                        element={
                            <DoctorDetails />
                        }
                    />


                    {/* Appointments */}

                    <Route
                        path="/appointments"
                        element={
                            <Appointments />
                        }
                    />


                    <Route
                        path="/appointments/book/:doctorId"
                        element={
                            <AppointmentBooking />
                        }
                    />


                    <Route
                        path="/appointments/:appointmentId"
                        element={
                            <PatientAppointmentDetails />
                        }
                    />


                    {/* Prescriptions */}

                    <Route
                        path="/prescriptions"
                        element={
                            <PatientPrescriptions />
                        }
                    />


                    <Route
                        path="/prescriptions/:prescriptionId"
                        element={
                            <PatientPrescriptionDetails />
                        }
                    />


                    {/* Payments */}

                    <Route
                        path="/payments"
                        element={
                            <PatientPayments />
                        }
                    />


                    {/* Reviews */}

                    <Route
                        path="/reviews"
                        element={
                            <PatientReviews />
                        }
                    />


                    {/* Patient Profile */}

                    <Route
                        path="/profile"
                        element={
                            <ComingSoon
                                title="Patient Profile"
                            />
                        }
                    />

                </Route>

            </Route>


            {/* ==================================================
                DOCTOR ROUTES
            ================================================== */}

            <Route element={<DoctorProtected />}>

                <Route
                    element={<DoctorLayout />}
                >

                    {/* Doctor Dashboard */}

                    <Route
                        path="/doctor/dashboard"
                        element={
                            <DoctorDashboard />
                        }
                    />


                    {/* Doctor Appointments */}

                    <Route
                        path="/doctor/appointments"
                        element={
                            <DoctorAppointments />
                        }
                    />


                    <Route
                        path="/doctor/appointments/:appointmentId"
                        element={
                            <DoctorAppointmentDetails />
                        }
                    />


                    {/* Doctor Prescription */}

                    <Route
                        path="/doctor/appointments/:appointmentId/prescription"
                        element={
                            <DoctorPrescription />
                        }
                    />


                    {/* Doctor Availability */}

                    <Route
                        path="/doctor/availability"
                        element={
                            <ComingSoon
                                title="Doctor Availability"
                            />
                        }
                    />


                    {/* Doctor Patients */}

                    <Route
                        path="/doctor/patients"
                        element={
                            <ComingSoon
                                title="Doctor Patients"
                            />
                        }
                    />


                    {/* Doctor Prescriptions */}

                    <Route
                        path="/doctor/prescriptions"
                        element={
                            <ComingSoon
                                title="Doctor Prescriptions"
                            />
                        }
                    />


                    {/* Doctor Profile */}

                    <Route
                        path="/doctor/profile"
                        element={
                            <ComingSoon
                                title="Doctor Profile"
                            />
                        }
                    />

                </Route>

            </Route>


            {/* ==================================================
                ADMIN ROUTES
            ================================================== */}

            <Route element={<AdminProtected />}>

                {/* Admin Dashboard */}

                <Route
                    path="/admin/dashboard"
                    element={
                        <AdminDashboard />
                    }
                />


                {/* ==================================================
                    ADMIN USER MANAGEMENT
                ================================================== */}

                <Route
                    path="/admin/users"
                    element={
                        <AdminUsers />
                    }
                />


                {/* Admin Hospitals */}

                <Route
                    path="/admin/hospitals"
                    element={
                        <ComingSoon
                            title="Manage Hospitals"
                        />
                    }
                />


                {/* Admin Doctors */}

                <Route
                    path="/admin/doctors"
                    element={
                        <ComingSoon
                            title="Manage Doctors"
                        />
                    }
                />


                {/* Admin Locations */}

                <Route
                    path="/admin/locations"
                    element={
                        <ComingSoon
                            title="Manage Locations"
                        />
                    }
                />


                {/* Admin Reviews */}

                <Route
                    path="/admin/reviews"
                    element={
                        <ComingSoon
                            title="Manage Reviews"
                        />
                    }
                />


                {/* Admin Appointments */}

                <Route
                    path="/admin/appointments"
                    element={
                        <ComingSoon
                            title="Manage Appointments"
                        />
                    }
                />

            </Route>


            {/* ==================================================
                ROOT ROUTE
            ================================================== */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />


            {/* ==================================================
                FALLBACK ROUTE
            ================================================== */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
};

export default AppRoutes;
