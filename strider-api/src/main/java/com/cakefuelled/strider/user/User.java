package com.cakefuelled.strider.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Length;

import java.security.Principal;

public class User implements Principal {

    int id;

    @Length(max=32)
    String email;

    public User() {
        //Jackson deserialization
    }

    public User(int id, String email) {
        this.id = id;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    @Override
    @JsonIgnore
    public String getName() {
        return getEmail();
    }
}
