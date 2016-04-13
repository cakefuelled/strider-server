package com.cakefuelled.strider.auth.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class LoginSuccessResult {

    @JsonProperty
    private String email;

    @JsonProperty
    private String token;

    public LoginSuccessResult(String email, String token) {
        this.email = email;
        this.token = token;
    }
}
