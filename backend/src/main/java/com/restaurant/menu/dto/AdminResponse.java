package com.restaurant.menu.dto;

public class AdminResponse {

    private Long id;
    private String name;
    private String email;

    public AdminResponse() {
    }

    public static Builder builder() {
        return new Builder();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public static final class Builder {

        private Long id;
        private String name;
        private String email;

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public AdminResponse build() {
            AdminResponse response = new AdminResponse();
            response.id = id;
            response.name = name;
            response.email = email;
            return response;
        }
    }
}
