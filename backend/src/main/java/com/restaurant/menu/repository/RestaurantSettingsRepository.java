package com.restaurant.menu.repository;

import com.restaurant.menu.entity.RestaurantSettings;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantSettingsRepository extends JpaRepository<RestaurantSettings, Long> {
}
