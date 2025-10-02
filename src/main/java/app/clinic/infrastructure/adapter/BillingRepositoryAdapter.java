package app.clinic.infrastructure.adapter;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Component;

import app.clinic.domain.model.BillingCalculationResult;
import app.clinic.domain.model.BillingDetails;
import app.clinic.domain.model.BillingSummary;
import app.clinic.domain.model.Invoice;
import app.clinic.domain.model.InvoiceId;
import app.clinic.domain.model.InvoiceNumber;
import app.clinic.domain.model.PatientCedula;
import app.clinic.domain.model.Year;
import app.clinic.domain.port.BillingRepository;

/**
 * Adapter that implements the BillingRepository port.
 * Provides basic implementation for billing operations.
 */
@Component
public class BillingRepositoryAdapter implements BillingRepository {

    @Override
    public Invoice save(Invoice invoice) {
        throw new UnsupportedOperationException("Invoice persistence not yet implemented");
    }

    @Override
    public Optional<Invoice> findById(InvoiceId invoiceId) {
        return Optional.empty();
    }

    @Override
    public Optional<Invoice> findByInvoiceNumber(InvoiceNumber invoiceNumber) {
        return Optional.empty();
    }

    @Override
    public List<Invoice> findByPatientCedula(PatientCedula patientCedula) {
        return List.of();
    }

    @Override
    public List<Invoice> findAll() {
        return List.of();
    }

    @Override
    public boolean existsByInvoiceNumber(InvoiceNumber invoiceNumber) {
        return false;
    }

    @Override
    public void deleteById(InvoiceId invoiceId) {
        throw new UnsupportedOperationException("Invoice deletion not yet implemented");
    }

    @Override
    public long count() {
        return 0;
    }

    @Override
    public long countByPatient(PatientCedula patientCedula) {
        return 0;
    }

    @Override
    public BillingCalculationResult calculateAccumulatedCopayment(PatientCedula patientCedula, Year year) {
        throw new UnsupportedOperationException("Accumulated copayment calculation not yet implemented");
    }

    @Override
    public BillingSummary generateBillingSummary(PatientCedula patientCedula) {
        throw new UnsupportedOperationException("Billing summary generation not yet implemented");
    }

    @Override
    public BillingDetails generateBillingDetails(PatientCedula patientCedula) {
        throw new UnsupportedOperationException("Billing details generation not yet implemented");
    }
}