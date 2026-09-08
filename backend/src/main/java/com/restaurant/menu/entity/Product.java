package com.restaurant.menu.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String nameAr;

    @Column(nullable = false)
    private String nameEn;

    @Column(length = 2000)
    private String descriptionAr;

    @Column(length = 2000)
    private String descriptionEn;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    private String image;

    @Column(nullable = false)
    private Boolean isVisible = true;

    @Column(nullable = false)
    private Boolean isAvailable = true;

    private String badge;

    @Column(length = 2000)
    private String ingredientsAr;

    @Column(length = 2000)
    private String ingredientsEn;

    @Column(length = 1000)
    private String allergensAr;

    @Column(length = 1000)
    private String allergensEn;

    @Column(nullable = false, updatable = false)
    private Instant createdAt;

    @Column(nullable = false)
    private Instant updatedAt;

    public Product() {
    }

    @PrePersist
    protected void onCreate() {
        Instant now = Instant.now();
        createdAt = now;
        updatedAt = now;
        if (isVisible == null) {
            isVisible = true;
        }
        if (isAvailable == null) {
            isAvailable = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getNameAr() {
        return nameAr;
    }

    public void setNameAr(String nameAr) {
        this.nameAr = nameAr;
    }

    public String getNameEn() {
        return nameEn;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getDescriptionAr() {
        return descriptionAr;
    }

    public void setDescriptionAr(String descriptionAr) {
        this.descriptionAr = descriptionAr;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getIsVisible() {
        return isVisible;
    }

    public void setIsVisible(Boolean isVisible) {
        this.isVisible = isVisible;
    }

    public Boolean getIsAvailable() {
        return isAvailable;
    }

    public void setIsAvailable(Boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public String getBadge() {
        return badge;
    }

    public void setBadge(String badge) {
        this.badge = badge;
    }

    public String getIngredientsAr() {
        return ingredientsAr;
    }

    public void setIngredientsAr(String ingredientsAr) {
        this.ingredientsAr = ingredientsAr;
    }

    public String getIngredientsEn() {
        return ingredientsEn;
    }

    public void setIngredientsEn(String ingredientsEn) {
        this.ingredientsEn = ingredientsEn;
    }

    public String getAllergensAr() {
        return allergensAr;
    }

    public void setAllergensAr(String allergensAr) {
        this.allergensAr = allergensAr;
    }

    public String getAllergensEn() {
        return allergensEn;
    }

    public void setAllergensEn(String allergensEn) {
        this.allergensEn = allergensEn;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }
}
