package com.restaurant.menu.service;

import com.restaurant.menu.dto.CategoryRequest;
import com.restaurant.menu.dto.CategoryResponse;
import com.restaurant.menu.entity.Category;
import com.restaurant.menu.exception.BadRequestException;
import com.restaurant.menu.exception.ResourceNotFoundException;
import com.restaurant.menu.mapper.DtoMapper;
import com.restaurant.menu.repository.CategoryRepository;
import com.restaurant.menu.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public CategoryService(CategoryRepository categoryRepository, ProductRepository productRepository) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> findAll() {
        return categoryRepository.findAllByOrderBySortOrderAsc().stream()
                .map(DtoMapper::toCategoryResponse)
                .toList();
    }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        int nextOrder = categoryRepository.findAll().stream()
                .map(Category::getSortOrder)
                .max(Integer::compareTo)
                .orElse(0) + 1;

        Category category = new Category();
        category.setNameAr(request.getNameAr());
        category.setNameEn(request.getNameEn());
        category.setImage(request.getImage());
        category.setIsVisible(request.getIsVisible() != null ? request.getIsVisible() : true);
        category.setSortOrder(request.getSortOrder() != null ? request.getSortOrder() : nextOrder);
        return DtoMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = getCategory(id);
        category.setNameAr(request.getNameAr());
        category.setNameEn(request.getNameEn());
        category.setImage(request.getImage());
        if (request.getIsVisible() != null) {
            category.setIsVisible(request.getIsVisible());
        }
        if (request.getSortOrder() != null) {
            category.setSortOrder(request.getSortOrder());
        }
        return DtoMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Transactional
    public void delete(Long id) {
        Category category = getCategory(id);
        long productCount = productRepository.countByCategoryId(id);
        if (productCount > 0) {
            throw new BadRequestException("Cannot delete category with existing products");
        }
        categoryRepository.delete(category);
    }

    @Transactional
    public CategoryResponse updateVisibility(Long id, Boolean isVisible) {
        Category category = getCategory(id);
        category.setIsVisible(isVisible != null ? isVisible : !Boolean.TRUE.equals(category.getIsVisible()));
        return DtoMapper.toCategoryResponse(categoryRepository.save(category));
    }

    @Transactional
    public List<CategoryResponse> reorder(List<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            throw new BadRequestException("Category ids are required");
        }
        if (ids.size() != new HashSet<>(ids).size()) {
            throw new BadRequestException("Duplicate category ids in reorder request");
        }

        Map<Long, Category> categories = categoryRepository.findAll().stream()
                .collect(Collectors.toMap(Category::getId, Function.identity()));

        for (int i = 0; i < ids.size(); i++) {
            Long id = ids.get(i);
            Category category = categories.get(id);
            if (category == null) {
                throw new ResourceNotFoundException("Category not found: " + id);
            }
            category.setSortOrder(i + 1);
        }

        categoryRepository.saveAll(categories.values());
        return findAll();
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }
}
