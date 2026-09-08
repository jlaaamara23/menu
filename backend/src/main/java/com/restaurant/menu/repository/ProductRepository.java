package com.restaurant.menu.repository;

import com.restaurant.menu.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByCategoryIdAndIsVisibleTrueOrderByNameEnAsc(Long categoryId);

    Optional<Product> findByIdAndIsVisibleTrue(Long id);

    long countByIsVisibleTrue();

    long countByIsVisibleFalse();

    List<Product> findTop5ByOrderByCreatedAtDesc();

    List<Product> findTop5ByOrderByUpdatedAtDesc();

    @Query("""
            SELECT p FROM Product p
            JOIN p.category c
            WHERE p.isVisible = true
              AND (
                   LOWER(p.nameAr) LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(p.nameEn) LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(COALESCE(p.descriptionAr, '')) LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(COALESCE(p.descriptionEn, '')) LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(c.nameAr) LIKE LOWER(CONCAT('%', :q, '%'))
                OR LOWER(c.nameEn) LIKE LOWER(CONCAT('%', :q, '%'))
              )
            ORDER BY p.nameEn ASC
            """)
    List<Product> searchVisible(@Param("q") String q);

    @Query("""
            SELECT p FROM Product p
            WHERE (:categoryId IS NULL OR p.category.id = :categoryId)
              AND (:visible IS NULL OR p.isVisible = :visible)
              AND (:available IS NULL OR p.isAvailable = :available)
              AND (
                   :search IS NULL OR :search = ''
                OR LOWER(p.nameAr) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(p.nameEn) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(COALESCE(p.descriptionAr, '')) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(COALESCE(p.descriptionEn, '')) LIKE LOWER(CONCAT('%', :search, '%'))
              )
            """)
    Page<Product> findAdminFiltered(
            @Param("search") String search,
            @Param("categoryId") Long categoryId,
            @Param("visible") Boolean visible,
            @Param("available") Boolean available,
            Pageable pageable
    );

    long countByCategoryId(Long categoryId);
}
