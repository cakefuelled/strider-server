package com.cakefuelled.strider.auth;

import com.cakefuelled.strider.user.User;
import com.google.common.base.Optional;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import io.dropwizard.auth.basic.BasicCredentials;

public class BasicAuthenticator implements Authenticator<BasicCredentials, User> {

    @Override
    public Optional<User> authenticate(BasicCredentials basicCredentials) throws AuthenticationException {
        if("secret".equals(basicCredentials.getPassword())) {
            return Optional.of(new User(1, basicCredentials.getUsername()));
        }
        return Optional.absent();
    }
}
