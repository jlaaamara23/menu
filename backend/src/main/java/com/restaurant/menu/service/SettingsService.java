package com.restaurant.menu.service;

import com.restaurant.menu.dto.SettingsRequest;
import com.restaurant.menu.dto.SettingsResponse;
import com.restaurant.menu.entity.RestaurantSettings;
import com.restaurant.menu.exception.ResourceNotFoundException;
import com.restaurant.menu.mapper.DtoMapper;
import com.restaurant.menu.repository.RestaurantSettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SettingsService {

    private final RestaurantSettingsRepository settingsRepository;

    public SettingsService(RestaurantSettingsRepository settingsRepository) {
        this.settingsRepository = settingsRepository;
    }

    @Transactional(readOnly = true)
    public SettingsResponse get() {
        return DtoMapper.toSettingsResponse(getOrThrow());
    }

    @Transactional
    public SettingsResponse update(SettingsRequest request) {
        RestaurantSettings settings = getOrThrow();
        if (request.getRestaurantNameAr() != null) {
            settings.setRestaurantNameAr(request.getRestaurantNameAr());
        }
        if (request.getRestaurantNameEn() != null) {
            settings.setRestaurantNameEn(request.getRestaurantNameEn());
        }
        if (request.getTaglineAr() != null) {
            settings.setTaglineAr(request.getTaglineAr());
        }
        if (request.getTaglineEn() != null) {
            settings.setTaglineEn(request.getTaglineEn());
        }
        if (request.getIsOpen() != null) {
            settings.setIsOpen(request.getIsOpen());
        }
        if (request.getOpenHoursAr() != null) {
            settings.setOpenHoursAr(request.getOpenHoursAr());
        }
        if (request.getOpenHoursEn() != null) {
            settings.setOpenHoursEn(request.getOpenHoursEn());
        }
        if (request.getAddressAr() != null) {
            settings.setAddressAr(request.getAddressAr());
        }
        if (request.getAddressEn() != null) {
            settings.setAddressEn(request.getAddressEn());
        }
        if (request.getPhone() != null) {
            settings.setPhone(request.getPhone());
        }
        if (request.getWhatsapp() != null) {
            settings.setWhatsapp(request.getWhatsapp());
        }
        if (request.getInstagram() != null) {
            settings.setInstagram(request.getInstagram());
        }
        if (request.getGoogleMapsUrl() != null) {
            settings.setGoogleMapsUrl(request.getGoogleMapsUrl());
        }
        if (request.getLogoUrl() != null) {
            settings.setLogoUrl(request.getLogoUrl());
        }
        return DtoMapper.toSettingsResponse(settingsRepository.save(settings));
    }

    private RestaurantSettings getOrThrow() {
        return settingsRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant settings not found"));
    }
}
