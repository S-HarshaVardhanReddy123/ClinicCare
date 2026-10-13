import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./DoctorPrescription.css";

const DoctorPrescription = () => {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [diagnosis, setDiagnosis] = useState("");
    const [instructions, setInstructions] = useState("");

    const [medicines, setMedicines] = useState([
        {
            medicineName: "",
            dosage: "",
            frequency: "",
            duration: "",
            instructions: "",
        },
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleMedicineChange = (index, field, value) => {
        setMedicines((current) =>
            current.map((medicine, medicineIndex) =>
                medicineIndex === index
                    ? {
                          ...medicine,
                          [field]: value,
                      }
                    : medicine
            )
        );
    };

    const addMedicine = () => {
        setMedicines((current) => [
            ...current,
            {
                medicineName: "",
                dosage: "",
                frequency: "",
                duration: "",
                instructions: "",
            },
        ]);
    };

    const removeMedicine = (index) => {
        if (medicines.length === 1) {
            return;
        }

        setMedicines((current) =>
            current.filter(
                (_, medicineIndex) => medicineIndex !== index
            )
        );
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setSuccess("");

        if (!appointmentId) {
            setError("Appointment ID is missing.");
            return;
        }

        const incompleteMedicine = medicines.some(
            (medicine) =>
                !medicine.medicineName.trim() ||
                !medicine.dosage.trim() ||
                !medicine.frequency.trim() ||
                !medicine.duration.trim()
        );

        if (incompleteMedicine) {
            setError(
                "Please complete medicine name, dosage, frequency and duration for every medicine."
            );
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/prescriptions", {
                appointmentId: Number(appointmentId),
                diagnosis: diagnosis.trim(),
                instructions: instructions.trim(),
                medicines,
            });

            if (response.data?.success) {
                setSuccess(
                    response.data.message ||
                        "Prescription created successfully."
                );

                setTimeout(() => {
                    navigate("/doctor/prescriptions");
                }, 1000);
            } else {
                setError(
                    response.data?.message ||
                        "Unable to create prescription."
                );
            }
        } catch (err) {
            console.error("Create prescription error:", err);

            setError(
                err.response?.data?.message ||
                    "Failed to create prescription."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="doctor-prescription-page">
            <div className="doctor-prescription-header">
                <div>
                    <div className="doctor-prescription-eyebrow">
                        DOCTOR PORTAL
                    </div>

                    <h1>Create Prescription</h1>

                    <p>
                        Create a prescription for completed appointment #
                        {appointmentId}
                    </p>
                </div>

                <button
                    type="button"
                    className="doctor-prescription-back"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
            </div>

            {error && (
                <div className="doctor-prescription-alert error">
                    {error}
                </div>
            )}

            {success && (
                <div className="doctor-prescription-alert success">
                    {success}
                </div>
            )}

            <form
                className="doctor-prescription-form"
                onSubmit={handleSubmit}
            >
                <section className="prescription-section">
                    <div className="section-heading">
                        <span className="section-icon">🩺</span>

                        <div>
                            <h2>Consultation Summary</h2>
                            <p>
                                Enter the diagnosis and general treatment
                                instructions.
                            </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="diagnosis">
                            Diagnosis
                        </label>

                        <input
                            id="diagnosis"
                            type="text"
                            value={diagnosis}
                            onChange={(event) =>
                                setDiagnosis(event.target.value)
                            }
                            placeholder="e.g. Acute viral fever"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="instructions">
                            General Instructions
                        </label>

                        <textarea
                            id="instructions"
                            rows="4"
                            value={instructions}
                            onChange={(event) =>
                                setInstructions(event.target.value)
                            }
                            placeholder="Enter general advice, diet, rest, follow-up instructions, etc."
                        />
                    </div>
                </section>

                <section className="prescription-section">
                    <div className="medicine-section-header">
                        <div className="section-heading">
                            <span className="section-icon">💊</span>

                            <div>
                                <h2>Medicines</h2>
                                <p>
                                    Add each prescribed medicine with
                                    dosage, frequency and duration.
                                </p>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="add-medicine-button"
                            onClick={addMedicine}
                        >
                            + Add Medicine
                        </button>
                    </div>

                    <div className="medicine-list">
                        {medicines.map((medicine, index) => (
                            <div
                                className="medicine-card"
                                key={index}
                            >
                                <div className="medicine-card-header">
                                    <h3>
                                        Medicine {index + 1}
                                    </h3>

                                    {medicines.length > 1 && (
                                        <button
                                            type="button"
                                            className="remove-medicine-button"
                                            onClick={() =>
                                                removeMedicine(index)
                                            }
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                <div className="medicine-grid">
                                    <div className="form-group medicine-wide">
                                        <label>
                                            Medicine Name *
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                medicine.medicineName
                                            }
                                            onChange={(event) =>
                                                handleMedicineChange(
                                                    index,
                                                    "medicineName",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="e.g. Paracetamol"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Dosage *
                                        </label>

                                        <input
                                            type="text"
                                            value={medicine.dosage}
                                            onChange={(event) =>
                                                handleMedicineChange(
                                                    index,
                                                    "dosage",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="e.g. 500 mg"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Frequency *
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                medicine.frequency
                                            }
                                            onChange={(event) =>
                                                handleMedicineChange(
                                                    index,
                                                    "frequency",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="e.g. Twice daily"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>
                                            Duration *
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                medicine.duration
                                            }
                                            onChange={(event) =>
                                                handleMedicineChange(
                                                    index,
                                                    "duration",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="e.g. 5 days"
                                        />
                                    </div>

                                    <div className="form-group medicine-wide">
                                        <label>
                                            Medicine Instructions
                                        </label>

                                        <input
                                            type="text"
                                            value={
                                                medicine.instructions
                                            }
                                            onChange={(event) =>
                                                handleMedicineChange(
                                                    index,
                                                    "instructions",
                                                    event.target.value
                                                )
                                            }
                                            placeholder="e.g. Take after food"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="prescription-form-actions">
                    <button
                        type="button"
                        className="cancel-prescription-button"
                        onClick={() => navigate(-1)}
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="save-prescription-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving Prescription..."
                            : "💊 Save Prescription"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DoctorPrescription;