package com.cakefuelled.strider.user;

import org.hibernate.validator.constraints.Length;

import java.security.Principal;

public class User implements Principal {

    int id;

    @Length(max=32)
    String username;

    public User() {
        //Jackson deserialization
    }

    public User(int id, String username) {
        this.id = id;
        this.username = username;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    @Override
    public String getName() {
        return getUsername();
    }
}
