package com.restaurant.menu.controller;

import com.restaurant.menu.dto.MenuResponse;
import com.restaurant.menu.dto.ProductResponse;
import com.restaurant.menu.service.MenuService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/menu")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @GetMapping
    public MenuResponse getMenu() {
        return menuService.getFullMenu();
    }

    @GetMapping("/products/{id}")
    public ProductResponse getProduct(@PathVariable Long id) {
        return menuService.getVisibleProduct(id);
    }

    @GetMapping("/search")
    public List<ProductResponse> search(@RequestParam(name = "q", required = false) String q) {
        return menuService.search(q);
    }
}
