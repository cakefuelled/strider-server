package com.cakefuelled.strider.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Length;

import java.security.Principal;

public class User implements Principal {

    int id;

    @Length(max=32)
    String email;

    @JsonIgnore //Hide this field from serialization returns
    @Length(min=6)
    String password;

    public User() {
        //Jackson deserialization
    }

    public User(int id, String email) {
        this.id = id;
        this.email = email;
    }

    public User(int id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public User(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public int getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    @Override
    @JsonIgnore
    public String getName() {
        return getEmail();
    }
}
