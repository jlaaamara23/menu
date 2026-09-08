package com.restaurant.menu.controller;

import com.restaurant.menu.dto.CategoryRequest;
import com.restaurant.menu.dto.CategoryResponse;
import com.restaurant.menu.dto.ReorderRequest;
import com.restaurant.menu.dto.VisibilityRequest;
import com.restaurant.menu.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/categories")
public class AdminCategoryController {

    private final CategoryService categoryService;

    public AdminCategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<CategoryResponse> list() {
        return categoryService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse create(@Valid @RequestBody CategoryRequest request) {
        return categoryService.create(request);
    }

    @PutMapping("/{id}")
    public CategoryResponse update(@PathVariable Long id, @Valid @RequestBody CategoryRequest request) {
        return categoryService.update(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }

    @PatchMapping("/{id}/visibility")
    public CategoryResponse visibility(@PathVariable Long id, @RequestBody(required = false) VisibilityRequest request) {
        Boolean value = request != null ? request.getIsVisible() : null;
        return categoryService.updateVisibility(id, value);
    }

    @PutMapping("/reorder")
    public List<CategoryResponse> reorder(@Valid @RequestBody ReorderRequest request) {
        return categoryService.reorder(request.getIds());
    }
}
