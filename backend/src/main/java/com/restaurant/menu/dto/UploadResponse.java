package com.restaurant.menu.dto;

public class UploadResponse {

    private String url;

    public UploadResponse() {
    }

    public static Builder builder() {
        return new Builder();
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public static final class Builder {

        private String url;

        public Builder url(String url) {
            this.url = url;
            return this;
        }

        public UploadResponse build() {
            UploadResponse response = new UploadResponse();
            response.url = url;
            return response;
        }
    }
}
