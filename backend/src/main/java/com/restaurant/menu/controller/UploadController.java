package com.restaurant.menu.controller;

import com.restaurant.menu.dto.UploadResponse;
import com.restaurant.menu.service.UploadService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/admin/upload")
public class UploadController {

    private final UploadService uploadService;

    public UploadController(UploadService uploadService) {
        this.uploadService = uploadService;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UploadResponse upload(@RequestParam("file") MultipartFile file) {
        return uploadService.upload(file);
    }

    @DeleteMapping("/{filename}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String filename) {
        uploadService.delete(filename);
    }
}
