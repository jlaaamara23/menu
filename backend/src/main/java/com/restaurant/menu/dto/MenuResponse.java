package com.restaurant.menu.dto;

import java.util.List;

public class MenuResponse {

    private SettingsResponse settings;
    private List<CategoryResponse> categories;

    public MenuResponse() {
    }

    public static Builder builder() {
        return new Builder();
    }

    public SettingsResponse getSettings() {
        return settings;
    }

    public void setSettings(SettingsResponse settings) {
        this.settings = settings;
    }

    public List<CategoryResponse> getCategories() {
        return categories;
    }

    public void setCategories(List<CategoryResponse> categories) {
        this.categories = categories;
    }

    public static final class Builder {

        private SettingsResponse settings;
        private List<CategoryResponse> categories;

        public Builder settings(SettingsResponse settings) {
            this.settings = settings;
            return this;
        }

        public Builder categories(List<CategoryResponse> categories) {
            this.categories = categories;
            return this;
        }

        public MenuResponse build() {
            MenuResponse response = new MenuResponse();
            response.settings = settings;
            response.categories = categories;
            return response;
        }
    }
}
