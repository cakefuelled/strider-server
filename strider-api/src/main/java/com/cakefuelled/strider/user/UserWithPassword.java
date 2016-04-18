package com.cakefuelled.strider.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.validator.constraints.Length;

public class UserWithPassword extends User {

    @JsonIgnore //Hide this field from serialization returns
    @Length(min=6)
    String password;

    public UserWithPassword(int id, String email, String password) {
        super(id, email);
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

}
