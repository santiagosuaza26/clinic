package app.clinic.application.dto.medical;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Data Transfer Object for creating new medical records.
 * Contains validation annotations for input data.
 */
public class CreateMedicalRecordDTO {

    @NotBlank(message = "Patient cedula is required")
    @Size(max = 20, message = "Patient cedula must not exceed 20 characters")
    private String patientCedula;

    @NotBlank(message = "Doctor cedula is required")
    @Size(max = 10, message = "Doctor cedula must not exceed 10 characters")
    private String doctorCedula;

    @NotBlank(message = "Consultation reason is required")
    @Size(max = 200, message = "Consultation reason must not exceed 200 characters")
    private String consultationReason;

    @NotBlank(message = "Symptoms are required")
    @Size(max = 500, message = "Symptoms must not exceed 500 characters")
    private String symptoms;

    @NotBlank(message = "Diagnosis is required")
    @Size(max = 300, message = "Diagnosis must not exceed 300 characters")
    private String diagnosis;

    // Default constructor
    public CreateMedicalRecordDTO() {}

    // Constructor with parameters
    public CreateMedicalRecordDTO(String patientCedula, String doctorCedula,
                                 String consultationReason, String symptoms, String diagnosis) {
        this.patientCedula = patientCedula;
        this.doctorCedula = doctorCedula;
        this.consultationReason = consultationReason;
        this.symptoms = symptoms;
        this.diagnosis = diagnosis;
    }

    // Getters and Setters
    public String getPatientCedula() {
        return patientCedula;
    }

    public void setPatientCedula(String patientCedula) {
        this.patientCedula = patientCedula;
    }

    public String getDoctorCedula() {
        return doctorCedula;
    }

    public void setDoctorCedula(String doctorCedula) {
        this.doctorCedula = doctorCedula;
    }

    public String getConsultationReason() {
        return consultationReason;
    }

    public void setConsultationReason(String consultationReason) {
        this.consultationReason = consultationReason;
    }

    public String getSymptoms() {
        return symptoms;
    }

    public void setSymptoms(String symptoms) {
        this.symptoms = symptoms;
    }

    public String getDiagnosis() {
        return diagnosis;
    }

    public void setDiagnosis(String diagnosis) {
        this.diagnosis = diagnosis;
    }

    @Override
    public String toString() {
        return String.format("CreateMedicalRecordDTO{patientCedula='%s', doctorCedula='%s', consultationReason='%s'}",
                           patientCedula, doctorCedula, consultationReason);
    }
}