package com.cakefuelled.strider.auth;

import com.google.common.base.Optional;
import io.dropwizard.auth.AuthFilter;
import io.dropwizard.auth.AuthenticationException;
import io.dropwizard.auth.Authenticator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.annotation.Priority;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.Priorities;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.SecurityContext;
import java.io.IOException;
import java.security.Principal;

@Priority(Priorities.AUTHENTICATION)
public class TokenAuthFilter<P extends Principal> extends AuthFilter<String, P> {
    private static final Logger LOGGER = LoggerFactory.getLogger(TokenAuthFilter.class);

    @Override
    public void filter(ContainerRequestContext containerRequestContext) throws IOException {
        //Extract the authorization header (Authorization: Bearer <Token>)
        final String authorizationHeader = containerRequestContext.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        try {
            //Now we have Bearer <Token>, use indexOf, regex for every request would be slow
            final int spaceLocation = authorizationHeader.indexOf(' ');

            if(spaceLocation > 0) {
                final String method = authorizationHeader.substring(0, spaceLocation);
                if (prefix.equalsIgnoreCase(method)) {
                    String token = authorizationHeader.substring(spaceLocation + 1);
                    //TODO: User input, validate
                    try {
                        final Optional<P> principal = authenticator.authenticate(token);
                        if (principal.isPresent()) {
                            containerRequestContext.setSecurityContext(new SecurityContext() {
                                @Override
                                public Principal getUserPrincipal() {
                                    return principal.get();
                                }

                                @Override
                                public boolean isUserInRole(String role) {
                                    return authorizer.authorize(principal.get(), role);
                                }

                                @Override
                                public boolean isSecure() {
                                    return containerRequestContext.getSecurityContext().isSecure();
                                }

                                @Override
                                public String getAuthenticationScheme() {
                                    //Not really form auth, but let's leave this here for now
                                    return SecurityContext.FORM_AUTH;
                                }
                            });
                            return;
                        }
                    } catch (AuthenticationException e) {
                        LOGGER.warn("Error authenticating token", e);
                        throw new InternalServerErrorException();
                    }
                }
            }
        } catch (Exception e) {
            LOGGER.warn("Error decoding credentials", e);
        }

        throw new WebApplicationException(unauthorizedHandler.buildResponse(prefix, realm));
    }



    /**
     * Builder for {@link TokenAuthFilter}.
     * <p>An {@link Authenticator} must be provided during the building process.</p>
     *
     * @param <P> the principal
     */
    public static class Builder<P extends Principal> extends
            AuthFilterBuilder<String, P, TokenAuthFilter<P>> {

        @Override
        protected TokenAuthFilter<P> newInstance() {
            return new TokenAuthFilter<>();
        }
    }
}
