package com.restaurant.menu.service;

import com.restaurant.menu.dto.DashboardResponse;
import com.restaurant.menu.dto.PageResponse;
import com.restaurant.menu.dto.ProductRequest;
import com.restaurant.menu.dto.ProductResponse;
import com.restaurant.menu.entity.Category;
import com.restaurant.menu.entity.Product;
import com.restaurant.menu.exception.ResourceNotFoundException;
import com.restaurant.menu.mapper.DtoMapper;
import com.restaurant.menu.repository.CategoryRepository;
import com.restaurant.menu.repository.ProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {
        return DashboardResponse.builder()
                .totalProducts(productRepository.count())
                .visibleProducts(productRepository.countByIsVisibleTrue())
                .hiddenProducts(productRepository.countByIsVisibleFalse())
                .totalCategories(categoryRepository.count())
                .recentCreated(productRepository.findTop5ByOrderByCreatedAtDesc().stream()
                        .map(DtoMapper::toProductResponse)
                        .toList())
                .recentUpdated(productRepository.findTop5ByOrderByUpdatedAtDesc().stream()
                        .map(DtoMapper::toProductResponse)
                        .toList())
                .build();
    }

    @Transactional(readOnly = true)
    public PageResponse<ProductResponse> findAll(
            int page,
            int size,
            String search,
            Long categoryId,
            Boolean visible,
            Boolean available
    ) {
        Page<Product> result = productRepository.findAdminFiltered(
                search,
                categoryId,
                visible,
                available,
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "updatedAt"))
        );

        return PageResponse.<ProductResponse>builder()
                .content(result.getContent().stream().map(DtoMapper::toProductResponse).toList())
                .page(result.getNumber())
                .size(result.getSize())
                .totalElements(result.getTotalElements())
                .totalPages(result.getTotalPages())
                .build();
    }

    @Transactional(readOnly = true)
    public ProductResponse findById(Long id) {
        return DtoMapper.toProductResponse(getProduct(id));
    }

    @Transactional
    public ProductResponse create(ProductRequest request) {
        Category category = getCategory(request.getCategoryId());
        Product product = new Product();
        product.setCategory(category);
        product.setNameAr(request.getNameAr());
        product.setNameEn(request.getNameEn());
        product.setDescriptionAr(request.getDescriptionAr());
        product.setDescriptionEn(request.getDescriptionEn());
        product.setPrice(request.getPrice());
        product.setImage(request.getImage());
        product.setIsVisible(request.getIsVisible() != null ? request.getIsVisible() : true);
        product.setIsAvailable(request.getIsAvailable() != null ? request.getIsAvailable() : true);
        product.setBadge(blankToNull(request.getBadge()));
        product.setIngredientsAr(request.getIngredientsAr());
        product.setIngredientsEn(request.getIngredientsEn());
        product.setAllergensAr(request.getAllergensAr());
        product.setAllergensEn(request.getAllergensEn());
        return DtoMapper.toProductResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = getProduct(id);
        Category category = getCategory(request.getCategoryId());
        product.setCategory(category);
        product.setNameAr(request.getNameAr());
        product.setNameEn(request.getNameEn());
        product.setDescriptionAr(request.getDescriptionAr());
        product.setDescriptionEn(request.getDescriptionEn());
        product.setPrice(request.getPrice());
        product.setImage(request.getImage());
        if (request.getIsVisible() != null) {
            product.setIsVisible(request.getIsVisible());
        }
        if (request.getIsAvailable() != null) {
            product.setIsAvailable(request.getIsAvailable());
        }
        product.setBadge(blankToNull(request.getBadge()));
        product.setIngredientsAr(request.getIngredientsAr());
        product.setIngredientsEn(request.getIngredientsEn());
        product.setAllergensAr(request.getAllergensAr());
        product.setAllergensEn(request.getAllergensEn());
        return DtoMapper.toProductResponse(productRepository.save(product));
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found");
        }
        productRepository.deleteById(id);
    }

    @Transactional
    public ProductResponse updateVisibility(Long id, Boolean isVisible) {
        Product product = getProduct(id);
        product.setIsVisible(isVisible != null ? isVisible : !Boolean.TRUE.equals(product.getIsVisible()));
        return DtoMapper.toProductResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse updateAvailability(Long id, Boolean isAvailable) {
        Product product = getProduct(id);
        product.setIsAvailable(isAvailable != null ? isAvailable : !Boolean.TRUE.equals(product.getIsAvailable()));
        return DtoMapper.toProductResponse(productRepository.save(product));
    }

    private Product getProduct(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

    private Category getCategory(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
    }

    private String blankToNull(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }
}
