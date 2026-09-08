package com.restaurant.menu.dto;

public class LoginResponse {

    private String token;
    private String name;
    private String email;

    public LoginResponse() {
    }

    public static Builder builder() {
        return new Builder();
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
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

        private String token;
        private String name;
        private String email;

        public Builder token(String token) {
            this.token = token;
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

        public LoginResponse build() {
            LoginResponse response = new LoginResponse();
            response.token = token;
            response.name = name;
            response.email = email;
            return response;
        }
    }
}
