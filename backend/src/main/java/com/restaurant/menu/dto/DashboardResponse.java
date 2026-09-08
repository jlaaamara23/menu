package com.restaurant.menu.dto;

import java.util.List;

public class DashboardResponse {

    private long totalProducts;
    private long visibleProducts;
    private long hiddenProducts;
    private long totalCategories;
    private List<ProductResponse> recentCreated;
    private List<ProductResponse> recentUpdated;

    public DashboardResponse() {
    }

    public static Builder builder() {
        return new Builder();
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public void setTotalProducts(long totalProducts) {
        this.totalProducts = totalProducts;
    }

    public long getVisibleProducts() {
        return visibleProducts;
    }

    public void setVisibleProducts(long visibleProducts) {
        this.visibleProducts = visibleProducts;
    }

    public long getHiddenProducts() {
        return hiddenProducts;
    }

    public void setHiddenProducts(long hiddenProducts) {
        this.hiddenProducts = hiddenProducts;
    }

    public long getTotalCategories() {
        return totalCategories;
    }

    public void setTotalCategories(long totalCategories) {
        this.totalCategories = totalCategories;
    }

    public List<ProductResponse> getRecentCreated() {
        return recentCreated;
    }

    public void setRecentCreated(List<ProductResponse> recentCreated) {
        this.recentCreated = recentCreated;
    }

    public List<ProductResponse> getRecentUpdated() {
        return recentUpdated;
    }

    public void setRecentUpdated(List<ProductResponse> recentUpdated) {
        this.recentUpdated = recentUpdated;
    }

    public static final class Builder {

        private long totalProducts;
        private long visibleProducts;
        private long hiddenProducts;
        private long totalCategories;
        private List<ProductResponse> recentCreated;
        private List<ProductResponse> recentUpdated;

        public Builder totalProducts(long totalProducts) {
            this.totalProducts = totalProducts;
            return this;
        }

        public Builder visibleProducts(long visibleProducts) {
            this.visibleProducts = visibleProducts;
            return this;
        }

        public Builder hiddenProducts(long hiddenProducts) {
            this.hiddenProducts = hiddenProducts;
            return this;
        }

        public Builder totalCategories(long totalCategories) {
            this.totalCategories = totalCategories;
            return this;
        }

        public Builder recentCreated(List<ProductResponse> recentCreated) {
            this.recentCreated = recentCreated;
            return this;
        }

        public Builder recentUpdated(List<ProductResponse> recentUpdated) {
            this.recentUpdated = recentUpdated;
            return this;
        }

        public DashboardResponse build() {
            DashboardResponse response = new DashboardResponse();
            response.totalProducts = totalProducts;
            response.visibleProducts = visibleProducts;
            response.hiddenProducts = hiddenProducts;
            response.totalCategories = totalCategories;
            response.recentCreated = recentCreated;
            response.recentUpdated = recentUpdated;
            return response;
        }
    }
}
