package com.restaurant.menu.mapper;

import com.restaurant.menu.dto.CategoryResponse;
import com.restaurant.menu.dto.ProductResponse;
import com.restaurant.menu.dto.SettingsResponse;
import com.restaurant.menu.entity.Category;
import com.restaurant.menu.entity.Product;
import com.restaurant.menu.entity.RestaurantSettings;

import java.util.List;

public final class DtoMapper {

    private DtoMapper() {
    }

    public static ProductResponse toProductResponse(Product product) {
        Category category = product.getCategory();
        return ProductResponse.builder()
                .id(product.getId())
                .categoryId(category != null ? category.getId() : null)
                .categoryNameAr(category != null ? category.getNameAr() : null)
                .categoryNameEn(category != null ? category.getNameEn() : null)
                .nameAr(product.getNameAr())
                .nameEn(product.getNameEn())
                .descriptionAr(product.getDescriptionAr())
                .descriptionEn(product.getDescriptionEn())
                .price(product.getPrice())
                .image(product.getImage())
                .isVisible(product.getIsVisible())
                .isAvailable(product.getIsAvailable())
                .badge(product.getBadge())
                .ingredientsAr(product.getIngredientsAr())
                .ingredientsEn(product.getIngredientsEn())
                .allergensAr(product.getAllergensAr())
                .allergensEn(product.getAllergensEn())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    public static CategoryResponse toCategoryResponse(Category category, List<ProductResponse> products) {
        return CategoryResponse.builder()
                .id(category.getId())
                .nameAr(category.getNameAr())
                .nameEn(category.getNameEn())
                .image(category.getImage())
                .isVisible(category.getIsVisible())
                .sortOrder(category.getSortOrder())
                .createdAt(category.getCreatedAt())
                .updatedAt(category.getUpdatedAt())
                .products(products)
                .build();
    }

    public static CategoryResponse toCategoryResponse(Category category) {
        return toCategoryResponse(category, null);
    }

    public static SettingsResponse toSettingsResponse(RestaurantSettings settings) {
        return SettingsResponse.builder()
                .id(settings.getId())
                .restaurantNameAr(settings.getRestaurantNameAr())
                .restaurantNameEn(settings.getRestaurantNameEn())
                .taglineAr(settings.getTaglineAr())
                .taglineEn(settings.getTaglineEn())
                .isOpen(settings.getIsOpen())
                .openHoursAr(settings.getOpenHoursAr())
                .openHoursEn(settings.getOpenHoursEn())
                .addressAr(settings.getAddressAr())
                .addressEn(settings.getAddressEn())
                .phone(settings.getPhone())
                .whatsapp(settings.getWhatsapp())
                .instagram(settings.getInstagram())
                .googleMapsUrl(settings.getGoogleMapsUrl())
                .logoUrl(settings.getLogoUrl())
                .build();
    }
}
