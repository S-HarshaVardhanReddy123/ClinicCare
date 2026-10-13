import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jsPDF from "jspdf";
import api from "../services/api";
import "./PatientPrescriptionDetails.css";

function PatientPrescriptionDetails() {
    const { prescriptionId } = useParams();
    const navigate = useNavigate();

    const [prescription, setPrescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPrescription();
    }, [prescriptionId]);

    const fetchPrescription = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get(
                `/prescriptions/${prescriptionId}`
            );

            setPrescription(response.data.prescription);
        } catch (err) {
            console.error("Failed to fetch prescription:", err);

            setError(
                err.response?.data?.message ||
                "Failed to load prescription."
            );
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return "-";

        const dateString = String(date).split("T")[0];
        const [year, month, day] = dateString.split("-");

        if (!year || !month || !day) return date;

        return `${day}-${month}-${year}`;
    };

    const formatTime = (time) => {
        if (!time) return "-";

        const parts = String(time).split(":");
        const hour = Number(parts[0]);
        const minute = parts[1] || "00";

        const period = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;

        return `${displayHour}:${minute} ${period}`;
    };

    const downloadPDF = () => {
        if (!prescription) return;

        const doc = new jsPDF();

        const pageWidth = doc.internal.pageSize.getWidth();
        const margin = 20;
        let y = 20;

        const doctorName =
            prescription.doctor_name || "Doctor";

        const hospitalName =
            prescription.hospital_name || "ClinicCare Hospital";

        const patientName =
            prescription.patient_name || "Patient";

        const diagnosis =
            prescription.diagnosis || "Not specified";

        const instructions =
            prescription.instructions || "No additional instructions.";

        // Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("CLINICCARE", pageWidth / 2, y, {
            align: "center",
        });

        y += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Medical Prescription", pageWidth / 2, y, {
            align: "center",
        });

        y += 15;

        doc.line(margin, y, pageWidth - margin, y);

        y += 12;

        // Patient information
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Patient Information", margin, y);

        y += 8;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        doc.text(`Patient: ${patientName}`, margin, y);
        y += 6;

        doc.text(`Doctor: ${doctorName}`, margin, y);
        y += 6;

        doc.text(`Hospital: ${hospitalName}`, margin, y);
        y += 6;

        if (prescription.appointment_date) {
            doc.text(
                `Appointment Date: ${formatDate(
                    prescription.appointment_date
                )}`,
                margin,
                y
            );
            y += 6;
        }

        if (prescription.appointment_time) {
            doc.text(
                `Appointment Time: ${formatTime(
                    prescription.appointment_time
                )}`,
                margin,
                y
            );
            y += 6;
        }

        y += 6;

        // Diagnosis
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Diagnosis", margin, y);

        y += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        const diagnosisLines = doc.splitTextToSize(
            diagnosis,
            pageWidth - margin * 2
        );

        doc.text(diagnosisLines, margin, y);

        y += diagnosisLines.length * 5 + 10;

        // Medicines
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Medicines", margin, y);

        y += 8;

        if (
            prescription.medicines &&
            prescription.medicines.length > 0
        ) {
            prescription.medicines.forEach((medicine, index) => {
                doc.setFont("helvetica", "bold");
                doc.setFontSize(10);

                doc.text(
                    `${index + 1}. ${medicine.medicine_name}`,
                    margin,
                    y
                );

                y += 6;

                doc.setFont("helvetica", "normal");

                doc.text(
                    `Dosage: ${medicine.dosage || "-"}`,
                    margin + 5,
                    y
                );

                y += 5;

                doc.text(
                    `Frequency: ${medicine.frequency || "-"}`,
                    margin + 5,
                    y
                );

                y += 5;

                doc.text(
                    `Duration: ${medicine.duration || "-"}`,
                    margin + 5,
                    y
                );

                y += 5;

                doc.text(
                    `Instructions: ${
                        medicine.instructions || "-"
                    }`,
                    margin + 5,
                    y
                );

                y += 9;

                // Create a new page if necessary
                if (y > 260) {
                    doc.addPage();
                    y = 20;
                }
            });
        } else {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.text(
                "No medicines prescribed.",
                margin,
                y
            );

            y += 10;
        }

        // Doctor instructions
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.text("Doctor Instructions", margin, y);

        y += 7;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);

        const instructionLines = doc.splitTextToSize(
            instructions,
            pageWidth - margin * 2
        );

        doc.text(instructionLines, margin, y);

        y += instructionLines.length * 5 + 15;

        // Footer / doctor signature
        if (y > 260) {
            doc.addPage();
            y = 20;
        }

        doc.line(margin, y, pageWidth - margin, y);

        y += 10;

        doc.setFont("helvetica", "bold");
        doc.text(doctorName, pageWidth - margin, y, {
            align: "right",
        });

        y += 5;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);

        doc.text(
            "Doctor",
            pageWidth - margin,
            y,
            {
                align: "right",
            }
        );

        y += 15;

        doc.setFontSize(8);
        doc.text(
            "This prescription was generated through ClinicCare.",
            pageWidth / 2,
            y,
            {
                align: "center",
            }
        );

        // Download
        const fileName = `ClinicCare-Prescription-${prescriptionId}.pdf`;

        doc.save(fileName);
    };

    if (loading) {
        return (
            <div className="prescription-details-page">
                <div className="prescription-loading">
                    Loading prescription...
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="prescription-details-page">
                <div className="prescription-error">
                    <h2>Unable to load prescription</h2>
                    <p>{error}</p>

                    <button
                        onClick={() => navigate("/prescriptions")}
                        className="back-button"
                    >
                        Back to Prescriptions
                    </button>
                </div>
            </div>
        );
    }

    if (!prescription) {
        return (
            <div className="prescription-details-page">
                <div className="prescription-error">
                    <h2>Prescription not found</h2>

                    <button
                        onClick={() => navigate("/prescriptions")}
                        className="back-button"
                    >
                        Back to Prescriptions
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="prescription-details-page">
            <div className="prescription-topbar">
                <button
                    onClick={() => navigate("/prescriptions")}
                    className="back-button"
                >
                    ← Back
                </button>

                <div className="prescription-actions">
                    <button
                        onClick={downloadPDF}
                        className="download-pdf-button"
                    >
                        📄 Download PDF
                    </button>

                    <button
                        onClick={() => window.print()}
                        className="print-button"
                    >
                        🖨️ Print
                    </button>
                </div>
            </div>

            <div className="prescription-document">
                <div className="prescription-header">
                    <h1>CLINICCARE</h1>
                    <p>Medical Prescription</p>
                </div>

                <div className="prescription-divider" />

                <div className="prescription-info-grid">
                    <div>
                        <span className="info-label">
                            Patient
                        </span>
                        <strong>
                            {prescription.patient_name || "-"}
                        </strong>
                    </div>

                    <div>
                        <span className="info-label">
                            Doctor
                        </span>
                        <strong>
                            {prescription.doctor_name || "-"}
                        </strong>
                    </div>

                    <div>
                        <span className="info-label">
                            Hospital
                        </span>
                        <strong>
                            {prescription.hospital_name || "-"}
                        </strong>
                    </div>

                    <div>
                        <span className="info-label">
                            Appointment Date
                        </span>
                        <strong>
                            {formatDate(
                                prescription.appointment_date
                            )}
                        </strong>
                    </div>

                    <div>
                        <span className="info-label">
                            Appointment Time
                        </span>
                        <strong>
                            {formatTime(
                                prescription.appointment_time
                            )}
                        </strong>
                    </div>
                </div>

                <section className="prescription-section">
                    <h2>Diagnosis</h2>

                    <p>
                        {prescription.diagnosis ||
                            "No diagnosis provided."}
                    </p>
                </section>

                <section className="prescription-section">
                    <h2>Medicines</h2>

                    {prescription.medicines &&
                    prescription.medicines.length > 0 ? (
                        <div className="medicine-table-wrapper">
                            <table className="medicine-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Medicine</th>
                                        <th>Dosage</th>
                                        <th>Frequency</th>
                                        <th>Duration</th>
                                        <th>Instructions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {prescription.medicines.map(
                                        (medicine, index) => (
                                            <tr
                                                key={
                                                    medicine.id ||
                                                    index
                                                }
                                            >
                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>
                                                    {
                                                        medicine.medicine_name
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        medicine.dosage
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        medicine.frequency
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        medicine.duration
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        medicine.instructions ||
                                                        "-"
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>No medicines prescribed.</p>
                    )}
                </section>

                <section className="prescription-section">
                    <h2>Doctor Instructions</h2>

                    <p className="instructions-text">
                        {prescription.instructions ||
                            "No additional instructions provided."}
                    </p>
                </section>

                <div className="prescription-signature">
                    <strong>
                        {prescription.doctor_name || "Doctor"}
                    </strong>
                    <span>Doctor</span>
                </div>

                <div className="prescription-footer">
                    <p>
                        This prescription was generated through
                        ClinicCare.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default PatientPrescriptionDetails;