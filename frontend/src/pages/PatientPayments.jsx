import React, { useEffect, useMemo, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./PatientPayments.css";

const PatientPayments = () => {
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [payments, setPayments] = useState([]);

    const [loading, setLoading] = useState(true);
    const [paying, setPaying] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [selectedAppointment, setSelectedAppointment] =
        useState(null);

    // ============================================================
    // LOAD APPOINTMENTS + PAYMENTS
    // ============================================================

    const loadPaymentData = async () => {
        try {
            setLoading(true);
            setError("");

            const [
                appointmentsResponse,
                paymentsResponse,
            ] = await Promise.all([
                api.get("/appointments/my"),
                api.get("/payments/my"),
            ]);

            const appointmentData =
                appointmentsResponse.data?.appointments || [];

            const paymentData =
                paymentsResponse.data?.payments || [];

            setAppointments(appointmentData);
            setPayments(paymentData);

        } catch (err) {
            console.error(
                "Payment data loading error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Unable to load payment information."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPaymentData();
    }, []);

    // ============================================================
    // COMPLETED APPOINTMENTS
    // ============================================================

    const completedAppointments = useMemo(() => {
        return appointments.filter(
            (appointment) =>
                appointment.status === "COMPLETED"
        );
    }, [appointments]);

    // ============================================================
    // CHECK WHETHER APPOINTMENT IS ALREADY PAID
    // ============================================================

    const isAppointmentPaid = (appointmentId) => {
        return payments.some(
            (payment) =>
                Number(payment.appointment_id) ===
                Number(appointmentId)
        );
    };

    // ============================================================
    // GET CONSULTATION FEE
    // ============================================================

    const getAppointmentAmount = (appointment) => {
        const amount =
            appointment.consultation_fee ??
            appointment.doctor_consultation_fee ??
            appointment.fee ??
            0;

        return Number(amount);
    };

    // ============================================================
    // OPEN PAYMENT SCREEN
    // ============================================================

    const handlePayNow = (appointment) => {
        setError("");
        setSuccess("");
        setSelectedAppointment(appointment);
    };

    // ============================================================
    // CLOSE PAYMENT SCREEN
    // ============================================================

    const handleClosePayment = () => {
        if (paying) {
            return;
        }

        setSelectedAppointment(null);
        setError("");
        setSuccess("");
    };

    // ============================================================
    // CONFIRM MOCK UPI PAYMENT
    // ============================================================

    const handleConfirmPayment = async () => {
        if (!selectedAppointment) {
            return;
        }

        try {
            setPaying(true);
            setError("");
            setSuccess("");

            /*
             * The backend currently implements the payment as a
             * mock payment and marks it SUCCESS when this request
             * is made.
             *
             * We deliberately make this request only AFTER the
             * patient reaches the QR/payment confirmation screen.
             */

            const response = await api.post(
                "/payments",
                {
                    appointmentId:
                        selectedAppointment.id,

                    paymentMethod: "UPI",
                }
            );

            if (response.data?.success) {
                setSuccess(
                    "Payment completed successfully."
                );

                await loadPaymentData();

                setTimeout(() => {
                    setSelectedAppointment(null);
                    setSuccess("");
                }, 1200);
            }

        } catch (err) {
            console.error(
                "Payment confirmation error:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Payment could not be completed."
            );
        } finally {
            setPaying(false);
        }
    };

    // ============================================================
    // FORMAT DATE
    // ============================================================

    const formatDate = (dateValue) => {
        if (!dateValue) {
            return "N/A";
        }

        const date = new Date(dateValue);

        if (Number.isNaN(date.getTime())) {
            return String(dateValue);
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

    // ============================================================
    // FORMAT TIME
    // ============================================================

    const formatTime = (timeValue) => {
        if (!timeValue) {
            return "N/A";
        }

        const value = String(timeValue);

        const match = value.match(
            /^(\d{1,2}):(\d{2})/
        );

        if (!match) {
            return value;
        }

        let hours = Number(match[1]);
        const minutes = match[2];

        const suffix =
            hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${hours}:${minutes} ${suffix}`;
    };

    // ============================================================
    // LOADING
    // ============================================================

    if (loading) {
        return (
            <div className="patient-payments-page">
                <div className="payments-loading">
                    <div className="payments-spinner"></div>

                    <h2>
                        Loading payments...
                    </h2>

                    <p>
                        Please wait while we
                        retrieve your payment information.
                    </p>
                </div>
            </div>
        );
    }

    // ============================================================
    // PAYMENT SCREEN
    // ============================================================

    if (selectedAppointment) {
        const amount =
            getAppointmentAmount(
                selectedAppointment
            );

        const doctorName =
            selectedAppointment.doctor_name ||
            "ClinicCare Doctor";

        const hospitalName =
            selectedAppointment.hospital_name ||
            "ClinicCare Hospital";

        const qrValue =
            `upi://pay?pa=cliniccare@upi` +
            `&pn=ClinicCare` +
            `&am=${amount.toFixed(2)}` +
            `&cu=INR` +
            `&tn=Appointment-${selectedAppointment.id}`;

        return (
            <div className="patient-payments-page">

                <div className="payments-header">
                    <div>
                        <div className="payments-label">
                            SECURE PAYMENT
                        </div>

                        <h1>
                            Complete Payment
                        </h1>

                        <p>
                            Scan the QR code or use the
                            simulated UPI confirmation below.
                        </p>
                    </div>

                    <button
                        className="payments-back-button"
                        onClick={handleClosePayment}
                        disabled={paying}
                    >
                        ← Back to Payments
                    </button>
                </div>

                {error && (
                    <div className="payments-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="payments-success">
                        ✓ {success}
                    </div>
                )}

                <div className="payment-checkout">

                    {/* LEFT SIDE */}

                    <div className="payment-summary-card">

                        <div className="payment-card-title">
                            <span className="payment-card-icon">
                                🏥
                            </span>

                            <div>
                                <h2>
                                    Payment Summary
                                </h2>

                                <p>
                                    Appointment details
                                </p>
                            </div>
                        </div>

                        <div className="payment-detail-list">

                            <div className="payment-detail-row">
                                <span>
                                    Doctor
                                </span>

                                <strong>
                                    {doctorName}
                                </strong>
                            </div>

                            <div className="payment-detail-row">
                                <span>
                                    Hospital
                                </span>

                                <strong>
                                    {hospitalName}
                                </strong>
                            </div>

                            <div className="payment-detail-row">
                                <span>
                                    Appointment Date
                                </span>

                                <strong>
                                    {formatDate(
                                        selectedAppointment.appointment_date
                                    )}
                                </strong>
                            </div>

                            <div className="payment-detail-row">
                                <span>
                                    Appointment Time
                                </span>

                                <strong>
                                    {formatTime(
                                        selectedAppointment.appointment_time
                                    )}
                                </strong>
                            </div>

                            <div className="payment-detail-row payment-total-row">
                                <span>
                                    Amount
                                </span>

                                <strong>
                                    ₹{amount.toFixed(2)}
                                </strong>
                            </div>

                        </div>

                    </div>

                    {/* RIGHT SIDE */}

                    <div className="upi-payment-card">

                        <div className="upi-header">
                            <div className="upi-icon">
                                📱
                            </div>

                            <div>
                                <h2>
                                    Pay using UPI
                                </h2>

                                <p>
                                    Scan the QR code with
                                    your UPI application.
                                </p>
                            </div>
                        </div>

                        <div className="qr-wrapper">

                            <div className="qr-box">
                                <QRCodeSVG
                                    value={qrValue}
                                    size={230}
                                    level="M"
                                    includeMargin={true}
                                />
                            </div>

                            <div className="qr-amount">
                                ₹{amount.toFixed(2)}
                            </div>

                            <div className="qr-label">
                                ClinicCare
                            </div>

                            <div className="qr-upi-id">
                                cliniccare@upi
                            </div>

                        </div>

                        <div className="payment-instructions">

                            <div className="payment-step">
                                <span>1</span>

                                <p>
                                    Open Google Pay,
                                    PhonePe, Paytm or
                                    another UPI app.
                                </p>
                            </div>

                            <div className="payment-step">
                                <span>2</span>

                                <p>
                                    Scan the QR code
                                    displayed above.
                                </p>
                            </div>

                            <div className="payment-step">
                                <span>3</span>

                                <p>
                                    Verify the amount and
                                    complete the payment.
                                </p>
                            </div>

                        </div>

                        <div className="demo-payment-note">
                            <strong>
                                Demo Payment
                            </strong>

                            <span>
                                This is a simulated ClinicCare
                                payment for project testing.
                                No real money will be transferred.
                            </span>
                        </div>

                        <button
                            className="confirm-payment-button"
                            onClick={
                                handleConfirmPayment
                            }
                            disabled={paying}
                        >
                            {paying
                                ? "Processing Payment..."
                                : "✓ Confirm Payment"}
                        </button>

                        <button
                            className="cancel-payment-button"
                            onClick={handleClosePayment}
                            disabled={paying}
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            </div>
        );
    }

    // ============================================================
    // PAYMENT PAGE
    // ============================================================

    return (
        <div className="patient-payments-page">

            <div className="payments-header">

                <div>
                    <div className="payments-label">
                        BILLING & PAYMENTS
                    </div>

                    <h1>
                        Payments
                    </h1>

                    <p>
                        Pay consultation charges and
                        view your payment history.
                    </p>
                </div>

                <button
                    className="payments-dashboard-button"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >
                    ← Dashboard
                </button>

            </div>

            {error && (
                <div className="payments-error">
                    {error}
                </div>
            )}

            {/* ====================================================
                COMPLETED APPOINTMENTS
            ==================================================== */}

            <section className="payment-section">

                <div className="payment-section-header">
                    <div>
                        <h2>
                            Pending Payments
                        </h2>

                        <p>
                            Completed consultations that
                            are ready for payment.
                        </p>
                    </div>
                </div>

                {completedAppointments.length === 0 ? (
                    <div className="payments-empty">
                        <div className="payments-empty-icon">
                            ✓
                        </div>

                        <h3>
                            No completed appointments
                        </h3>

                        <p>
                            Payments will appear here after
                            your consultation is completed.
                        </p>
                    </div>
                ) : (
                    <div className="payment-appointment-grid">

                        {completedAppointments.map(
                            (appointment) => {

                                const paid =
                                    isAppointmentPaid(
                                        appointment.id
                                    );

                                const amount =
                                    getAppointmentAmount(
                                        appointment
                                    );

                                return (
                                    <div
                                        className="appointment-payment-card"
                                        key={appointment.id}
                                    >

                                        <div className="appointment-payment-top">

                                            <div className="appointment-payment-icon">
                                                🏥
                                            </div>

                                            <div>
                                                <h3>
                                                    {appointment.doctor_name ||
                                                        "Doctor"}
                                                </h3>

                                                <p>
                                                    {appointment.specialization ||
                                                        "Medical Consultation"}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="appointment-payment-info">

                                            <div>
                                                <span>
                                                    Hospital
                                                </span>

                                                <strong>
                                                    {appointment.hospital_name ||
                                                        "ClinicCare Hospital"}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>
                                                    Date
                                                </span>

                                                <strong>
                                                    {formatDate(
                                                        appointment.appointment_date
                                                    )}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>
                                                    Time
                                                </span>

                                                <strong>
                                                    {formatTime(
                                                        appointment.appointment_time
                                                    )}
                                                </strong>
                                            </div>

                                            <div>
                                                <span>
                                                    Amount
                                                </span>

                                                <strong className="appointment-payment-amount">
                                                    ₹{amount.toFixed(2)}
                                                </strong>
                                            </div>

                                        </div>

                                        {paid ? (
                                            <div className="already-paid-badge">
                                                ✓ Payment Completed
                                            </div>
                                        ) : (
                                            <button
                                                className="pay-now-button"
                                                onClick={() =>
                                                    handlePayNow(
                                                        appointment
                                                    )
                                                }
                                            >
                                                Pay Now →
                                            </button>
                                        )}

                                    </div>
                                );
                            }
                        )}

                    </div>
                )}

            </section>

            {/* ====================================================
                PAYMENT HISTORY
            ==================================================== */}

            <section className="payment-section">

                <div className="payment-section-header">
                    <div>
                        <h2>
                            Payment History
                        </h2>

                        <p>
                            Your completed ClinicCare payments.
                        </p>
                    </div>
                </div>

                {payments.length === 0 ? (
                    <div className="payments-empty">
                        <div className="payments-empty-icon">
                            💳
                        </div>

                        <h3>
                            No payment history
                        </h3>

                        <p>
                            Completed payments will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="payment-history-list">

                        {payments.map((payment) => (
                            <div
                                className="payment-history-card"
                                key={payment.id}
                            >

                                <div className="payment-history-main">

                                    <div className="payment-history-icon">
                                        ✓
                                    </div>

                                    <div>
                                        <h3>
                                            Payment #{payment.id}
                                        </h3>

                                        <p>
                                            {payment.doctor_name ||
                                                "Doctor"}
                                        </p>

                                        <span>
                                            {payment.hospital_name ||
                                                "ClinicCare Hospital"}
                                        </span>
                                    </div>

                                </div>

                                <div className="payment-history-details">

                                    <div>
                                        <span>
                                            Amount
                                        </span>

                                        <strong>
                                            ₹
                                            {Number(
                                                payment.amount || 0
                                            ).toFixed(2)}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Method
                                        </span>

                                        <strong>
                                            {payment.payment_method ||
                                                "UPI"}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Status
                                        </span>

                                        <strong className="payment-status-success">
                                            {payment.payment_status}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>
                                            Transaction
                                        </span>

                                        <strong>
                                            {payment.transaction_id ||
                                                "N/A"}
                                        </strong>
                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </section>

        </div>
    );
};

export default PatientPayments;