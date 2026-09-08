package com.restaurant.menu.controller;

import com.restaurant.menu.dto.*;
import com.restaurant.menu.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/products")
public class AdminProductController {

    private final ProductService productService;

    public AdminProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public PageResponse<ProductResponse> list(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Boolean visible,
            @RequestParam(required = false) Boolean available
    ) {
        return productService.findAll(page, size, search, categoryId, visible, available);
    }

    @GetMapping("/{id}")
    public ProductResponse get(@PathVariable Long id) {
        return productService.findById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductResponse create(@Valid @RequestBody ProductRequest request) {
        return productService.create(request);
    }

    @PutMapping("/{id}")
    public ProductResponse update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return productService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

    @PatchMapping("/{id}/visibility")
    public ProductResponse visibility(@PathVariable Long id, @RequestBody(required = false) VisibilityRequest request) {
        Boolean value = request != null ? request.getIsVisible() : null;
        return productService.updateVisibility(id, value);
    }

    @PatchMapping("/{id}/availability")
    public ProductResponse availability(@PathVariable Long id, @RequestBody(required = false) AvailabilityRequest request) {
        Boolean value = request != null ? request.getIsAvailable() : null;
        return productService.updateAvailability(id, value);
    }
}
