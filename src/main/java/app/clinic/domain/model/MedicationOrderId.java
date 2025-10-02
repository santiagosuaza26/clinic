package app.clinic.domain.model;

import java.util.Objects;

/**
 * Value Object representing a unique identifier for medication orders.
 */
public class MedicationOrderId {
    private final String value;

    private MedicationOrderId(String value) {
        if (value == null || value.trim().isEmpty()) {
            throw new IllegalArgumentException("Medication order ID cannot be null or empty");
        }
        this.value = value.trim();
    }

    public static MedicationOrderId of(String value) {
        return new MedicationOrderId(value);
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MedicationOrderId that = (MedicationOrderId) o;
        return Objects.equals(value, that.value);
    }

    @Override
    public int hashCode() {
        return Objects.hash(value);
    }

    @Override
    public String toString() {
        return value;
    }
}