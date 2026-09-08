package com.restaurant.menu.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "restaurant_settings")
public class RestaurantSettings {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String restaurantNameAr;
    private String restaurantNameEn;
    private String taglineAr;
    private String taglineEn;
    private Boolean isOpen = true;
    private String openHoursAr;
    private String openHoursEn;
    private String addressAr;
    private String addressEn;
    private String phone;
    private String whatsapp;
    private String instagram;
    private String googleMapsUrl;
    private String logoUrl;

    public RestaurantSettings() {
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
}
