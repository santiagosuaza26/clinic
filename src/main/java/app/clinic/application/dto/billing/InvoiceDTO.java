package app.clinic.application.dto.billing;

/**
 * Data Transfer Object for invoice information.
 * Used for API responses containing invoice data.
 */
public class InvoiceDTO {
    private String invoiceNumber;
    private BillingDTO billingDetails;
    private String totalAmount;
    private String billingDate;

    // Default constructor
    public InvoiceDTO() {}

    // Constructor with parameters
    public InvoiceDTO(String invoiceNumber, BillingDTO billingDetails, String totalAmount, String billingDate) {
        this.invoiceNumber = invoiceNumber;
        this.billingDetails = billingDetails;
        this.totalAmount = totalAmount;
        this.billingDate = billingDate;
    }

    // Getters and Setters
    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public BillingDTO getBillingDetails() {
        return billingDetails;
    }

    public void setBillingDetails(BillingDTO billingDetails) {
        this.billingDetails = billingDetails;
    }

    public String getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(String totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getBillingDate() {
        return billingDate;
    }

    public void setBillingDate(String billingDate) {
        this.billingDate = billingDate;
    }

    @Override
    public String toString() {
        return String.format("InvoiceDTO{invoiceNumber='%s', totalAmount='%s', billingDate='%s'}",
                           invoiceNumber, totalAmount, billingDate);
    }
}