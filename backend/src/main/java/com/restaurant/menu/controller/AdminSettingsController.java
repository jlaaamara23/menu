package com.restaurant.menu.controller;

import com.restaurant.menu.dto.SettingsRequest;
import com.restaurant.menu.dto.SettingsResponse;
import com.restaurant.menu.service.SettingsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/settings")
public class AdminSettingsController {

    private final SettingsService settingsService;

    public AdminSettingsController(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    @GetMapping
    public SettingsResponse get() {
        return settingsService.get();
    }

    @PutMapping
    public SettingsResponse update(@RequestBody SettingsRequest request) {
        return settingsService.update(request);
    }
}
