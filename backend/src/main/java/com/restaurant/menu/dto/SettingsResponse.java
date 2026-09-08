package com.restaurant.menu.dto;

public class SettingsResponse {

    private Long id;
    private String restaurantNameAr;
    private String restaurantNameEn;
    private String taglineAr;
    private String taglineEn;
    private Boolean isOpen;
    private String openHoursAr;
    private String openHoursEn;
    private String addressAr;
    private String addressEn;
    private String phone;
    private String whatsapp;
    private String instagram;
    private String googleMapsUrl;
    private String logoUrl;

    public SettingsResponse() {
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

    public String getRestaurantNameAr() {
        return restaurantNameAr;
    }

    public void setRestaurantNameAr(String restaurantNameAr) {
        this.restaurantNameAr = restaurantNameAr;
    }

    public String getRestaurantNameEn() {
        return restaurantNameEn;
    }

    public void setRestaurantNameEn(String restaurantNameEn) {
        this.restaurantNameEn = restaurantNameEn;
    }

    public String getTaglineAr() {
        return taglineAr;
    }

    public void setTaglineAr(String taglineAr) {
        this.taglineAr = taglineAr;
    }

    public String getTaglineEn() {
        return taglineEn;
    }

    public void setTaglineEn(String taglineEn) {
        this.taglineEn = taglineEn;
    }

    public Boolean getIsOpen() {
        return isOpen;
    }

    public void setIsOpen(Boolean isOpen) {
        this.isOpen = isOpen;
    }

    public String getOpenHoursAr() {
        return openHoursAr;
    }

    public void setOpenHoursAr(String openHoursAr) {
        this.openHoursAr = openHoursAr;
    }

    public String getOpenHoursEn() {
        return openHoursEn;
    }

    public void setOpenHoursEn(String openHoursEn) {
        this.openHoursEn = openHoursEn;
    }

    public String getAddressAr() {
        return addressAr;
    }

    public void setAddressAr(String addressAr) {
        this.addressAr = addressAr;
    }

    public String getAddressEn() {
        return addressEn;
    }

    public void setAddressEn(String addressEn) {
        this.addressEn = addressEn;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWhatsapp() {
        return whatsapp;
    }

    public void setWhatsapp(String whatsapp) {
        this.whatsapp = whatsapp;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getGoogleMapsUrl() {
        return googleMapsUrl;
    }

    public void setGoogleMapsUrl(String googleMapsUrl) {
        this.googleMapsUrl = googleMapsUrl;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String logoUrl) {
        this.logoUrl = logoUrl;
    }

    public static final class Builder {

        private Long id;
        private String restaurantNameAr;
        private String restaurantNameEn;
        private String taglineAr;
        private String taglineEn;
        private Boolean isOpen;
        private String openHoursAr;
        private String openHoursEn;
        private String addressAr;
        private String addressEn;
        private String phone;
        private String whatsapp;
        private String instagram;
        private String googleMapsUrl;
        private String logoUrl;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder restaurantNameAr(String restaurantNameAr) {
            this.restaurantNameAr = restaurantNameAr;
            return this;
        }

        public Builder restaurantNameEn(String restaurantNameEn) {
            this.restaurantNameEn = restaurantNameEn;
            return this;
        }

        public Builder taglineAr(String taglineAr) {
            this.taglineAr = taglineAr;
            return this;
        }

        public Builder taglineEn(String taglineEn) {
            this.taglineEn = taglineEn;
            return this;
        }

        public Builder isOpen(Boolean isOpen) {
            this.isOpen = isOpen;
            return this;
        }

        public Builder openHoursAr(String openHoursAr) {
            this.openHoursAr = openHoursAr;
            return this;
        }

        public Builder openHoursEn(String openHoursEn) {
            this.openHoursEn = openHoursEn;
            return this;
        }

        public Builder addressAr(String addressAr) {
            this.addressAr = addressAr;
            return this;
        }

        public Builder addressEn(String addressEn) {
            this.addressEn = addressEn;
            return this;
        }

        public Builder phone(String phone) {
            this.phone = phone;
            return this;
        }

        public Builder whatsapp(String whatsapp) {
            this.whatsapp = whatsapp;
            return this;
        }

        public Builder instagram(String instagram) {
            this.instagram = instagram;
            return this;
        }

        public Builder googleMapsUrl(String googleMapsUrl) {
            this.googleMapsUrl = googleMapsUrl;
            return this;
        }

        public Builder logoUrl(String logoUrl) {
            this.logoUrl = logoUrl;
            return this;
        }

        public SettingsResponse build() {
            SettingsResponse response = new SettingsResponse();
            response.id = id;
            response.restaurantNameAr = restaurantNameAr;
            response.restaurantNameEn = restaurantNameEn;
            response.taglineAr = taglineAr;
            response.taglineEn = taglineEn;
            response.isOpen = isOpen;
            response.openHoursAr = openHoursAr;
            response.openHoursEn = openHoursEn;
            response.addressAr = addressAr;
            response.addressEn = addressEn;
            response.phone = phone;
            response.whatsapp = whatsapp;
            response.instagram = instagram;
            response.googleMapsUrl = googleMapsUrl;
            response.logoUrl = logoUrl;
            return response;
        }
    }
}
