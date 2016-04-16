package com.cakefuelled.strider.auth.authorizer;

import com.cakefuelled.strider.user.User;
import io.dropwizard.auth.Authorizer;

public class UserAuthorizer implements Authorizer<User> {

    @Override
    public boolean authorize(User user, String role) {
        return user.equals("user") && role.equals("USER");
    }
}
