package com.restaurant.menu.dto;

import java.math.BigDecimal;
import java.time.Instant;

public class ProductResponse {

    private Long id;
    private Long categoryId;
    private String categoryNameAr;
    private String categoryNameEn;
    private String nameAr;
    private String nameEn;
    private String descriptionAr;
    private String descriptionEn;
    private BigDecimal price;
    private String image;
    private Boolean isVisible;
    private Boolean isAvailable;
    private String badge;
    private String ingredientsAr;
    private String ingredientsEn;
    private String allergensAr;
    private String allergensEn;
    private Instant createdAt;
    private Instant updatedAt;

    public ProductResponse() {
    }

    public static Builder builder() {
        return new Builder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryNameAr() {
        return categoryNameAr;
    }

    public void setCategoryNameAr(String categoryNameAr) {
        this.categoryNameAr = categoryNameAr;
    }

    public String getCategoryNameEn() {
        return categoryNameEn;
    }

    public void setCategoryNameEn(String categoryNameEn) {
        this.categoryNameEn = categoryNameEn;
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

    public static final class Builder {

        private Long id;
        private Long categoryId;
        private String categoryNameAr;
        private String categoryNameEn;
        private String nameAr;
        private String nameEn;
        private String descriptionAr;
        private String descriptionEn;
        private BigDecimal price;
        private String image;
        private Boolean isVisible;
        private Boolean isAvailable;
        private String badge;
        private String ingredientsAr;
        private String ingredientsEn;
        private String allergensAr;
        private String allergensEn;
        private Instant createdAt;
        private Instant updatedAt;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder categoryId(Long categoryId) {
            this.categoryId = categoryId;
            return this;
        }

        public Builder categoryNameAr(String categoryNameAr) {
            this.categoryNameAr = categoryNameAr;
            return this;
        }

        public Builder categoryNameEn(String categoryNameEn) {
            this.categoryNameEn = categoryNameEn;
            return this;
        }

        public Builder nameAr(String nameAr) {
            this.nameAr = nameAr;
            return this;
        }

        public Builder nameEn(String nameEn) {
            this.nameEn = nameEn;
            return this;
        }

        public Builder descriptionAr(String descriptionAr) {
            this.descriptionAr = descriptionAr;
            return this;
        }

        public Builder descriptionEn(String descriptionEn) {
            this.descriptionEn = descriptionEn;
            return this;
        }

        public Builder price(BigDecimal price) {
            this.price = price;
            return this;
        }

        public Builder image(String image) {
            this.image = image;
            return this;
        }

        public Builder isVisible(Boolean isVisible) {
            this.isVisible = isVisible;
            return this;
        }

        public Builder isAvailable(Boolean isAvailable) {
            this.isAvailable = isAvailable;
            return this;
        }

        public Builder badge(String badge) {
            this.badge = badge;
            return this;
        }

        public Builder ingredientsAr(String ingredientsAr) {
            this.ingredientsAr = ingredientsAr;
            return this;
        }

        public Builder ingredientsEn(String ingredientsEn) {
            this.ingredientsEn = ingredientsEn;
            return this;
        }

        public Builder allergensAr(String allergensAr) {
            this.allergensAr = allergensAr;
            return this;
        }

        public Builder allergensEn(String allergensEn) {
            this.allergensEn = allergensEn;
            return this;
        }

        public Builder createdAt(Instant createdAt) {
            this.createdAt = createdAt;
            return this;
        }

        public Builder updatedAt(Instant updatedAt) {
            this.updatedAt = updatedAt;
            return this;
        }

        public ProductResponse build() {
            ProductResponse response = new ProductResponse();
            response.id = id;
            response.categoryId = categoryId;
            response.categoryNameAr = categoryNameAr;
            response.categoryNameEn = categoryNameEn;
            response.nameAr = nameAr;
            response.nameEn = nameEn;
            response.descriptionAr = descriptionAr;
            response.descriptionEn = descriptionEn;
            response.price = price;
            response.image = image;
            response.isVisible = isVisible;
            response.isAvailable = isAvailable;
            response.badge = badge;
            response.ingredientsAr = ingredientsAr;
            response.ingredientsEn = ingredientsEn;
            response.allergensAr = allergensAr;
            response.allergensEn = allergensEn;
            response.createdAt = createdAt;
            response.updatedAt = updatedAt;
            return response;
        }
    }
}
