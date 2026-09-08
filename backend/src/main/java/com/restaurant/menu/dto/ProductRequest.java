package com.restaurant.menu.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;

public class ProductRequest {

    @NotNull
    private Long categoryId;

    @NotBlank
    private String nameAr;

    @NotBlank
    private String nameEn;

    private String descriptionAr;
    private String descriptionEn;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal price;

    private String image;
    private Boolean isVisible;
    private Boolean isAvailable;
    private String badge;
    private String ingredientsAr;
    private String ingredientsEn;
    private String allergensAr;
    private String allergensEn;

    public ProductRequest() {
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
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
}
