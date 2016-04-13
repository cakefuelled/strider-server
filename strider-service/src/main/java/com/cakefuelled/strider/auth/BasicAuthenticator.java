package com.cakefuelled.strider.auth;

import com.cakefuelled.strider.auth.model.Credentials;
import com.cakefuelled.strider.user.User;
import com.google.common.base.Optional;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;

public class BasicAuthenticator implements Authenticator<Credentials, User> {

    @Override
    public Optional<User> authenticate(Credentials credentials) throws AuthenticationException {
        if("secret".equals(credentials.getPassword())) {
            return Optional.of(new User(1, credentials.getEmail()));
        }
        return Optional.absent();
    }
}
