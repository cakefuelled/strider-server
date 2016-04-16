package com.cakefuelled.strider.auth.authenticator;

import com.cakefuelled.strider.auth.AuthTokenDAO;
import com.cakefuelled.strider.user.User;
import com.google.common.base.Optional;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;

public class TokenAuthenticator implements Authenticator<String, User> {

    private AuthTokenDAO authTokenDAO;

    public TokenAuthenticator(AuthTokenDAO authTokenDAO) {
        this.authTokenDAO = authTokenDAO;
    }

    @Override
    public Optional<User> authenticate(String token) throws AuthenticationException {
        User user = authTokenDAO.getUserByAuthToken(token);
        if(user != null) {
            return Optional.of(user);
        }
        return Optional.absent();
    }
}
