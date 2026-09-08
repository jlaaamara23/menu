package com.restaurant.menu.service;

import com.restaurant.menu.dto.UploadResponse;
import com.restaurant.menu.exception.BadRequestException;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;
import java.util.UUID;

@Service
public class UploadService {

    private static final Set<String> ALLOWED_TYPES = Set.of(
            "image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"
    );

    @Value("${app.upload.dir}")
    private String uploadDir;

    public UploadResponse upload(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new BadRequestException("File is required");
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_TYPES.contains(contentType.toLowerCase())) {
            throw new BadRequestException("Only image files are allowed (jpeg, png, webp, gif)");
        }

        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            String extension = resolveExtension(file.getOriginalFilename(), contentType);
            String filename = UUID.randomUUID() + extension;
            Path target = uploadPath.resolve(filename);

            Thumbnails.of(file.getInputStream())
                    .size(1200, 1200)
                    .keepAspectRatio(true)
                    .outputQuality(0.85)
                    .toFile(target.toFile());

            return UploadResponse.builder()
                    .url("/uploads/" + filename)
                    .build();
        } catch (IOException ex) {
            throw new BadRequestException("Failed to upload image: " + ex.getMessage());
        }
    }

    public void delete(String filename) {
        if (filename == null || filename.isBlank() || filename.contains("..") || filename.contains("/") || filename.contains("\\")) {
            throw new BadRequestException("Invalid filename");
        }
        try {
            Path path = Paths.get(uploadDir).toAbsolutePath().normalize().resolve(filename);
            Files.deleteIfExists(path);
        } catch (IOException ex) {
            throw new BadRequestException("Failed to delete image: " + ex.getMessage());
        }
    }

    private String resolveExtension(String originalFilename, String contentType) {
        if (originalFilename != null && originalFilename.contains(".")) {
            String ext = originalFilename.substring(originalFilename.lastIndexOf('.')).toLowerCase();
            if (ext.matches("\\.(jpe?g|png|webp|gif)")) {
                return ext.equals(".jpg") ? ".jpeg" : ext;
            }
        }
        return switch (contentType.toLowerCase()) {
            case "image/png" -> ".png";
            case "image/webp" -> ".webp";
            case "image/gif" -> ".gif";
            default -> ".jpeg";
        };
    }
}
