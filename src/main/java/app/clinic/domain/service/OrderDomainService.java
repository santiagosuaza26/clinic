
package app.clinic.domain.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import app.clinic.domain.model.DiagnosticAidOrder;
import app.clinic.domain.model.MedicationOrder;
import app.clinic.domain.model.OrderNumber;
import app.clinic.domain.model.PatientCedula;
import app.clinic.domain.model.ProcedureOrder;
import app.clinic.domain.port.OrderRepository;

/**
 * Domain service for medical order operations.
 * Contains business logic for order management following domain-driven design principles.
 */
@Service
public class OrderDomainService {

    private final OrderRepository orderRepository;

    public OrderDomainService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
     * Creates a new medication order with validation.
     */
    public MedicationOrder createMedicationOrder(MedicationOrder medicationOrder) {
        validateOrderForCreation(medicationOrder);
        return orderRepository.saveMedicationOrder(medicationOrder);
    }

    /**
     * Creates a new procedure order with validation.
     */
    public ProcedureOrder createProcedureOrder(ProcedureOrder procedureOrder) {
        validateOrderForCreation(procedureOrder);
        return orderRepository.saveProcedureOrder(procedureOrder);
    }

    /**
     * Creates a new diagnostic aid order with validation.
     */
    public DiagnosticAidOrder createDiagnosticAidOrder(DiagnosticAidOrder diagnosticAidOrder) {
        validateOrderForCreation(diagnosticAidOrder);
        return orderRepository.saveDiagnosticAidOrder(diagnosticAidOrder);
    }

    /**
     * Finds a medication order by order number.
     */
    public Optional<MedicationOrder> findMedicationOrderByNumber(OrderNumber orderNumber) {
        return orderRepository.findMedicationOrderByNumber(orderNumber);
    }

    /**
     * Finds a procedure order by order number.
     */
    public Optional<ProcedureOrder> findProcedureOrderByNumber(OrderNumber orderNumber) {
        return orderRepository.findProcedureOrderByNumber(orderNumber);
    }

    /**
     * Finds a diagnostic aid order by order number.
     */
    public Optional<DiagnosticAidOrder> findDiagnosticAidOrderByNumber(OrderNumber orderNumber) {
        return orderRepository.findDiagnosticAidOrderByNumber(orderNumber);
    }

    /**
     * Finds all medication orders for a patient.
     */
    public List<MedicationOrder> findMedicationOrdersByPatient(PatientCedula patientCedula) {
        return orderRepository.findMedicationOrdersByPatient(patientCedula);
    }

    /**
     * Finds all procedure orders for a patient.
     */
    public List<ProcedureOrder> findProcedureOrdersByPatient(PatientCedula patientCedula) {
        return orderRepository.findProcedureOrdersByPatient(patientCedula);
    }

    /**
     * Finds all diagnostic aid orders for a patient.
     */
    public List<DiagnosticAidOrder> findDiagnosticAidOrdersByPatient(PatientCedula patientCedula) {
        return orderRepository.findDiagnosticAidOrdersByPatient(patientCedula);
    }

    /**
     * Validates order data for creation.
     */
    private void validateOrderForCreation(Object order) {
        if (order instanceof MedicationOrder medicationOrder) {
            validateMedicationOrder(medicationOrder);
        } else if (order instanceof ProcedureOrder procedureOrder) {
            validateProcedureOrder(procedureOrder);
        } else if (order instanceof DiagnosticAidOrder diagnosticAidOrder) {
            validateDiagnosticAidOrder(diagnosticAidOrder);
        } else {
            throw new IllegalArgumentException("Unknown order type");
        }
    }

    /**
     * Validates medication order specific rules.
     */
    private void validateMedicationOrder(MedicationOrder medicationOrder) {
        if (medicationOrder.getMedications().isEmpty()) {
            throw new IllegalArgumentException("Medication order must contain at least one medication");
        }
        // Add additional medication order validation rules
    }

    /**
     * Validates procedure order specific rules.
     */
    private void validateProcedureOrder(ProcedureOrder procedureOrder) {
        if (procedureOrder.getProcedures().isEmpty()) {
            throw new IllegalArgumentException("Procedure order must contain at least one procedure");
        }
        // Add additional procedure order validation rules
    }

    /**
     * Validates diagnostic aid order specific rules.
     */
    private void validateDiagnosticAidOrder(DiagnosticAidOrder diagnosticAidOrder) {
        if (diagnosticAidOrder.getDiagnosticAids().isEmpty()) {
            throw new IllegalArgumentException("Diagnostic aid order must contain at least one diagnostic aid");
        }
        // Add additional diagnostic aid order validation rules
    }
}
