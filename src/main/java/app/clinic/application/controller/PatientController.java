package app.clinic.application.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.clinic.application.dto.patient.CreatePatientDTO;
import app.clinic.application.dto.patient.PatientDTO;
import app.clinic.application.dto.patient.UpdatePatientDTO;
import app.clinic.application.service.PatientApplicationService;
import jakarta.validation.Valid;

/**
 * REST Controller for patient management operations.
 * Provides HTTP endpoints for registering, reading, updating, and deleting patients.
 * Handles patient information, emergency contacts, and insurance policies.
 */
@RestController
@RequestMapping("/api/patients")
public class PatientController {

    private final PatientApplicationService patientApplicationService;

    public PatientController(PatientApplicationService patientApplicationService) {
        this.patientApplicationService = patientApplicationService;
    }

    /**
     * Registers a new patient.
     * Only accessible by Administrative Staff role.
     */
    @PostMapping
    public ResponseEntity<PatientDTO> registerPatient(@Valid @RequestBody CreatePatientDTO createPatientDTO) {
        PatientDTO registeredPatient = patientApplicationService.registerPatient(createPatientDTO);
        return new ResponseEntity<>(registeredPatient, HttpStatus.CREATED);
    }

    /**
     * Updates an existing patient.
     * Only accessible by Administrative Staff role.
     */
    @PutMapping("/{cedula}")
    public ResponseEntity<PatientDTO> updatePatient(@PathVariable String cedula,
                                                   @Valid @RequestBody UpdatePatientDTO updatePatientDTO) {
        // Ensure the cedula in path matches the one in request body
        if (!cedula.equals(updatePatientDTO.getCedula())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        PatientDTO updatedPatient = patientApplicationService.updatePatient(updatePatientDTO);
        return ResponseEntity.ok(updatedPatient);
    }

    /**
     * Finds a patient by their cedula.
     */
    @GetMapping("/cedula/{cedula}")
    public ResponseEntity<PatientDTO> findPatientByCedula(@PathVariable String cedula) {
        return patientApplicationService.findPatientByCedula(cedula)
                .map(patient -> ResponseEntity.ok(patient))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Finds a patient by their username.
     */
    @GetMapping("/username/{username}")
    public ResponseEntity<PatientDTO> findPatientByUsername(@PathVariable String username) {
        return patientApplicationService.findPatientByUsername(username)
                .map(patient -> ResponseEntity.ok(patient))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Finds a patient by their ID.
     */
    @GetMapping("/id/{patientId}")
    public ResponseEntity<PatientDTO> findPatientById(@PathVariable String patientId) {
        return patientApplicationService.findPatientById(patientId)
                .map(patient -> ResponseEntity.ok(patient))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * Finds all patients.
     */
    @GetMapping
    public ResponseEntity<List<PatientDTO>> findAllPatients() {
        List<PatientDTO> patients = patientApplicationService.findAllPatients();
        return ResponseEntity.ok(patients);
    }

    /**
     * Deletes a patient by their cedula.
     * Only accessible by Administrative Staff role.
     */
    @DeleteMapping("/cedula/{cedula}")
    public ResponseEntity<Void> deletePatientByCedula(@PathVariable String cedula) {
        patientApplicationService.deletePatientByCedula(cedula);
        return ResponseEntity.noContent().build();
    }

    /**
     * Deletes a patient by their ID.
     * Only accessible by Administrative Staff role.
     */
    @DeleteMapping("/id/{patientId}")
    public ResponseEntity<Void> deletePatientById(@PathVariable String patientId) {
        patientApplicationService.deletePatientById(patientId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Checks if a patient has active insurance.
     */
    @GetMapping("/{cedula}/has-active-insurance")
    public ResponseEntity<Boolean> hasActiveInsurance(@PathVariable String cedula) {
        boolean hasActiveInsurance = patientApplicationService.hasActiveInsurance(cedula);
        return ResponseEntity.ok(hasActiveInsurance);
    }

    /**
     * Gets the age of a patient.
     */
    @GetMapping("/{cedula}/age")
    public ResponseEntity<Integer> getPatientAge(@PathVariable String cedula) {
        int age = patientApplicationService.getPatientAge(cedula);
        if (age > 0) {
            return ResponseEntity.ok(age);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}