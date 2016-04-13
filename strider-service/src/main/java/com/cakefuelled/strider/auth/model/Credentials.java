package com.cakefuelled.strider.auth.model;

import org.hibernate.validator.constraints.Email;

public class Credentials {

    @Email
    private String email;

    //TODO: Password validation
    private String password;

    public Credentials() {
        //Jackson Deserialization
    }

    public Credentials(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

}
