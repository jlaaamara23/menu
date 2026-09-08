package com.restaurant.menu.dto;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public class ReorderRequest {

    @NotEmpty
    private List<Long> ids;

    public ReorderRequest() {
    }

    public List<Long> getIds() {
        return ids;
    }

    public void setIds(List<Long> ids) {
        this.ids = ids;
    }
}
