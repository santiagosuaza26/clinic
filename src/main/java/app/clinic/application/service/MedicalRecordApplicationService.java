package app.clinic.application.service;

import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import app.clinic.application.dto.medical.CreateMedicalRecordDTO;
import app.clinic.application.dto.medical.MedicalRecordDTO;
import app.clinic.application.dto.medical.MedicalRecordEntryDTO;
import app.clinic.domain.model.ConsultationReason;
import app.clinic.domain.model.Diagnosis;
import app.clinic.domain.model.DoctorCedula;
import app.clinic.domain.model.PatientCedula;
import app.clinic.domain.model.PatientRecord;
import app.clinic.domain.model.PatientRecordData;
import app.clinic.domain.model.PatientRecordDate;
import app.clinic.domain.model.PatientRecordEntry;
import app.clinic.domain.model.PatientRecordMap;
import app.clinic.domain.model.Symptoms;
import app.clinic.domain.service.MedicalRecordDomainService;

/**
 * Application service for medical record management operations.
 * Coordinates between REST controllers and domain services.
 * Handles medical record-related use cases and business operations.
 */
@Service
public class MedicalRecordApplicationService {

    private final MedicalRecordDomainService medicalRecordDomainService;

    public MedicalRecordApplicationService(MedicalRecordDomainService medicalRecordDomainService) {
        this.medicalRecordDomainService = medicalRecordDomainService;
    }

    /**
     * Creates a new medical record entry for a patient.
     */
    public MedicalRecordEntryDTO createMedicalRecord(CreateMedicalRecordDTO createMedicalRecordDTO) {
        // Convert DTO to domain entities
        PatientRecordEntry entry = convertToPatientRecordEntry(createMedicalRecordDTO);

        // Use today's date as the record date
        PatientRecordDate recordDate = PatientRecordDate.today();

        // Create or update patient record using domain service
        PatientRecordMap recordMap = medicalRecordDomainService.addRecordEntry(
            PatientCedula.of(createMedicalRecordDTO.getPatientCedula()),
            recordDate,
            entry
        );

        // Convert back to DTO and return
        return convertEntryToDTO(entry);
    }

    /**
     * Finds medical record for a specific patient.
     */
    public Optional<MedicalRecordDTO> findMedicalRecordByPatientCedula(String patientCedula) {
        PatientRecord patientRecord = medicalRecordDomainService.findByPatientCedula(
            PatientCedula.of(patientCedula)
        );

        if (patientRecord.isEmpty()) {
            return Optional.empty();
        }

        return Optional.of(convertToDTO(patientRecord));
    }

    /**
     * Finds a specific medical record entry by patient and date.
     */
    public Optional<MedicalRecordEntryDTO> findMedicalRecordEntry(String patientCedula, String recordDate) {
        PatientRecord patientRecord = medicalRecordDomainService.findByPatientCedula(
            PatientCedula.of(patientCedula)
        );

        if (patientRecord.isEmpty()) {
            return Optional.empty();
        }

        // TODO: Parse recordDate string to PatientRecordDate
        // PatientRecordEntry entry = patientRecord.getRecord(PatientRecordDate.of(recordDate));
        // return Optional.ofNullable(entry).map(this::convertEntryToDTO);

        return Optional.empty();
    }

    /**
     * Updates an existing medical record entry.
     */
    public MedicalRecordEntryDTO updateMedicalRecordEntry(String patientCedula, String recordDate,
                                                         CreateMedicalRecordDTO updateDTO) {
        // TODO: Implement medical record entry update
        throw new UnsupportedOperationException("Medical record update not yet implemented");
    }

    /**
     * Deletes a medical record entry.
     */
    public void deleteMedicalRecordEntry(String patientCedula, String recordDate) {
        // TODO: Implement medical record entry deletion
        throw new UnsupportedOperationException("Medical record deletion not yet implemented");
    }

    /**
     * Checks if a patient has any medical records.
     */
    public boolean hasMedicalRecords(String patientCedula) {
        PatientRecord patientRecord = medicalRecordDomainService.findByPatientCedula(
            PatientCedula.of(patientCedula)
        );
        return !patientRecord.isEmpty();
    }

    /**
     * Gets the number of medical record entries for a patient.
     */
    public int getMedicalRecordCount(String patientCedula) {
        PatientRecord patientRecord = medicalRecordDomainService.findByPatientCedula(
            PatientCedula.of(patientCedula)
        );
        return patientRecord.getRecords().size();
    }

    /**
     * Helper method to convert PatientRecord domain entity to MedicalRecordDTO.
     */
    private MedicalRecordDTO convertToDTO(PatientRecord patientRecord) {
        MedicalRecordDTO dto = new MedicalRecordDTO();
        dto.setPatientCedula(""); // TODO: Extract from patient record

        // Convert each record entry
        // TODO: Implement proper conversion logic
        dto.setRecords(patientRecord.getRecords().entrySet().stream()
            .collect(Collectors.toMap(
                entry -> entry.getKey().getValue().toString(),
                entry -> convertEntryToDTO(entry.getValue())
            )));

        return dto;
    }

    /**
     * Helper method to convert PatientRecordEntry domain entity to MedicalRecordEntryDTO.
     */
    private MedicalRecordEntryDTO convertEntryToDTO(PatientRecordEntry entry) {
        MedicalRecordEntryDTO dto = new MedicalRecordEntryDTO();
        dto.setDoctorCedula(entry.getDoctorCedula().getValue());
        dto.setConsultationReason(entry.getConsultationReason().getValue());
        dto.setSymptoms(entry.getSymptoms().getValue());
        dto.setDiagnosis(entry.getDiagnosis().getValue());

        // TODO: Convert PatientRecordData to MedicalRecordDataDTO
        // dto.setData(convertRecordDataToDTO(entry.getData()));

        return dto;
    }

    /**
     * Helper method to convert CreateMedicalRecordDTO to PatientRecordEntry domain entity.
     */
    private PatientRecordEntry convertToPatientRecordEntry(CreateMedicalRecordDTO dto) {
        // Create unstructured data map for medications, procedures, and diagnostic aids
        java.util.Map<String, Object> unstructuredData = new java.util.HashMap<>();

        // TODO: Add logic to handle medications, procedures, and diagnostic aids from DTO
        // For now, create empty data structure
        PatientRecordData data = PatientRecordData.empty();

        return PatientRecordEntry.of(
            DoctorCedula.of(dto.getDoctorCedula()),
            ConsultationReason.of(dto.getConsultationReason()),
            Symptoms.of(dto.getSymptoms()),
            Diagnosis.of(dto.getDiagnosis()),
            data
        );
    }
}