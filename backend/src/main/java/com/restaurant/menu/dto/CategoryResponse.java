package com.restaurant.menu.dto;

import java.time.Instant;
import java.util.List;

public class CategoryResponse {

    private Long id;
    private String nameAr;
    private String nameEn;
    private String image;
    private Boolean isVisible;
    private Integer sortOrder;
    private Instant createdAt;
    private Instant updatedAt;
    private List<ProductResponse> products;

    public CategoryResponse() {
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

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
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

    public List<ProductResponse> getProducts() {
        return products;
    }

    public void setProducts(List<ProductResponse> products) {
        this.products = products;
    }

    public static final class Builder {

        private Long id;
        private String nameAr;
        private String nameEn;
        private String image;
        private Boolean isVisible;
        private Integer sortOrder;
        private Instant createdAt;
        private Instant updatedAt;
        private List<ProductResponse> products;

        public Builder id(Long id) {
            this.id = id;
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

        public Builder image(String image) {
            this.image = image;
            return this;
        }

        public Builder isVisible(Boolean isVisible) {
            this.isVisible = isVisible;
            return this;
        }

        public Builder sortOrder(Integer sortOrder) {
            this.sortOrder = sortOrder;
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

        public Builder products(List<ProductResponse> products) {
            this.products = products;
            return this;
        }

        public CategoryResponse build() {
            CategoryResponse response = new CategoryResponse();
            response.id = id;
            response.nameAr = nameAr;
            response.nameEn = nameEn;
            response.image = image;
            response.isVisible = isVisible;
            response.sortOrder = sortOrder;
            response.createdAt = createdAt;
            response.updatedAt = updatedAt;
            response.products = products;
            return response;
        }
    }
}
