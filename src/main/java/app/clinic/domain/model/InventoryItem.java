package app.clinic.domain.model;

import java.util.Objects;

/**
 * Entity representing an item in the clinic's inventory.
 * Can be medication, procedure, or diagnostic aid with associated cost.
 */
public class InventoryItem {
    private final InventoryItemId id;
    private final InventoryItemName name;
    private final InventoryItemType type;
    private final Cost cost;
    private final boolean active;

    private InventoryItem(InventoryItemId id, InventoryItemName name, InventoryItemType type,
                         Cost cost, boolean active) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.active = active;
    }

    public static InventoryItem of(InventoryItemId id, InventoryItemName name, InventoryItemType type,
                                  Cost cost) {
        return new InventoryItem(id, name, type, cost, true);
    }

    public static InventoryItem of(InventoryItemId id, InventoryItemName name, InventoryItemType type,
                                  Cost cost, boolean active) {
        return new InventoryItem(id, name, type, cost, active);
    }

    public InventoryItemId getId() {
        return id;
    }

    public InventoryItemName getName() {
        return name;
    }

    public InventoryItemType getType() {
        return type;
    }

    public Cost getCost() {
        return cost;
    }

    public boolean isActive() {
        return active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InventoryItem that = (InventoryItem) o;
        return active == that.active &&
               Objects.equals(id, that.id) &&
               Objects.equals(name, that.name) &&
               type == that.type &&
               Objects.equals(cost, that.cost);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, type, cost, active);
    }

    @Override
    public String toString() {
        return String.format("InventoryItem{id=%s, name=%s, type=%s, cost=%s, active=%s}",
                           id, name, type, cost, active);
    }
}