package com.restaurant.menu.repository;

import com.restaurant.menu.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findByIsVisibleTrueOrderBySortOrderAsc();
    List<Category> findAllByOrderBySortOrderAsc();
}
