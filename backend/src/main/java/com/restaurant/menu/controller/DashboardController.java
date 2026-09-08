package com.restaurant.menu.controller;

import com.restaurant.menu.dto.DashboardResponse;
import com.restaurant.menu.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {

    private final ProductService productService;

    public DashboardController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public DashboardResponse dashboard() {
        return productService.getDashboard();
    }
}
