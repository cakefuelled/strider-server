package com.cakefuelled.strider.util;

import com.cakefuelled.strider.auth.AuthTokenDAO;
import com.cakefuelled.strider.auth.TokenAuthFilter;
import com.cakefuelled.strider.auth.authenticator.TokenAuthenticator;
import com.cakefuelled.strider.auth.authorizer.UserAuthorizer;
import com.cakefuelled.strider.user.User;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.testing.junit.ResourceTestRule;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.glassfish.jersey.test.grizzly.GrizzlyWebTestContainerFactory;

public class TestUtil {

    public static ResourceTestRule.Builder getAuthenticatedResourceTester(AuthTokenDAO authTokenDAO) {
        return ResourceTestRule.builder()
            .setTestContainerFactory(new GrizzlyWebTestContainerFactory())
            .addProvider(new AuthDynamicFeature(new TokenAuthFilter.Builder<User>()
                .setAuthenticator(new TokenAuthenticator(authTokenDAO))
                .setAuthorizer(new UserAuthorizer())
                .setPrefix("Bearer")
                .setRealm("Mordor")
                .buildAuthFilter()))
            .addProvider(RolesAllowedDynamicFeature.class)
            .addProvider(new AuthValueFactoryProvider.Binder<>(User.class));
    }

}
