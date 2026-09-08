package com.restaurant.menu.service;

import com.restaurant.menu.dto.CategoryResponse;
import com.restaurant.menu.dto.MenuResponse;
import com.restaurant.menu.dto.ProductResponse;
import com.restaurant.menu.dto.SettingsResponse;
import com.restaurant.menu.entity.Category;
import com.restaurant.menu.entity.Product;
import com.restaurant.menu.entity.RestaurantSettings;
import com.restaurant.menu.exception.ResourceNotFoundException;
import com.restaurant.menu.mapper.DtoMapper;
import com.restaurant.menu.repository.CategoryRepository;
import com.restaurant.menu.repository.ProductRepository;
import com.restaurant.menu.repository.RestaurantSettingsRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MenuService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final RestaurantSettingsRepository settingsRepository;

    public MenuService(
            CategoryRepository categoryRepository,
            ProductRepository productRepository,
            RestaurantSettingsRepository settingsRepository
    ) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
        this.settingsRepository = settingsRepository;
    }

    @Transactional(readOnly = true)
    public MenuResponse getFullMenu() {
        SettingsResponse settings = getSettings();
        List<Category> categories = categoryRepository.findByIsVisibleTrueOrderBySortOrderAsc();

        List<CategoryResponse> categoryResponses = categories.stream()
                .map(category -> {
                    List<ProductResponse> products = productRepository
                            .findByCategoryIdAndIsVisibleTrueOrderByNameEnAsc(category.getId())
                            .stream()
                            .map(DtoMapper::toProductResponse)
                            .toList();
                    return DtoMapper.toCategoryResponse(category, products);
                })
                .toList();

        return MenuResponse.builder()
                .settings(settings)
                .categories(categoryResponses)
                .build();
    }

    @Transactional(readOnly = true)
    public ProductResponse getVisibleProduct(Long id) {
        Product product = productRepository.findByIdAndIsVisibleTrue(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return DtoMapper.toProductResponse(product);
    }

    @Transactional(readOnly = true)
    public List<ProductResponse> search(String q) {
        if (q == null || q.isBlank()) {
            return List.of();
        }
        return productRepository.searchVisible(q.trim()).stream()
                .map(DtoMapper::toProductResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public SettingsResponse getSettings() {
        RestaurantSettings settings = settingsRepository.findAll().stream()
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant settings not found"));
        return DtoMapper.toSettingsResponse(settings);
    }
}
