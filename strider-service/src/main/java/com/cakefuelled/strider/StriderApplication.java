package com.cakefuelled.strider;

import com.cakefuelled.strider.auth.AuthResource;
import com.cakefuelled.strider.auth.AuthTokenDAO;
import com.cakefuelled.strider.auth.TokenAuthFilter;
import com.cakefuelled.strider.auth.authenticator.TokenAuthenticator;
import com.cakefuelled.strider.auth.authorizer.UserAuthorizer;
import com.cakefuelled.strider.auth.model.Credentials;
import com.cakefuelled.strider.item.ItemResource;
import com.cakefuelled.strider.organisation.OrganisationDAO;
import com.cakefuelled.strider.organisation.OrganisationResource;
import com.cakefuelled.strider.user.User;
import com.cakefuelled.strider.user.UserDAO;
import com.cakefuelled.strider.user.UserResource;
import com.codahale.metrics.MetricRegistry;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthFilter;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.CachingAuthenticator;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.setup.Environment;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.skife.jdbi.v2.DBI;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StriderApplication extends Application<StriderConfiguration> {

    private final Logger LOG = LoggerFactory.getLogger(StriderApplication.class);

    public static void main(String[] args) throws Exception {
        new StriderApplication().run(args);
    }

    @Override
    public void run(StriderConfiguration configuration, Environment environment) throws Exception {

        final DBIFactory dbiFactory = new DBIFactory();
        final DBI jdbi = dbiFactory.build(environment, configuration.getDataSourceFactory(), "postgresql");

        //DAOs
        final UserDAO userDAO = jdbi.onDemand(UserDAO.class);
        final AuthTokenDAO authTokenDAO = jdbi.onDemand(AuthTokenDAO.class);
        final OrganisationDAO organisationDAO = jdbi.onDemand(OrganisationDAO.class);

        //Create tables if they don't exist
        userDAO.createUsersTable();
        authTokenDAO.createAuthTokensTable();
        try {
            userDAO.createTestUser();
        } catch (Exception e) {
            LOG.warn("Failed to create test user, may already exist", e);
        }


        //Authenticators
        environment.jersey().register(new AuthDynamicFeature(
                new TokenAuthFilter.Builder<User>()
                    .setAuthenticator(new TokenAuthenticator(authTokenDAO))
                    .setAuthorizer(new UserAuthorizer())
                    .setPrefix("Bearer")
                    .setRealm("Mordor")
                    .buildAuthFilter()
        ));

        environment.jersey().register(RolesAllowedDynamicFeature.class);
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(User.class));

        //Resources
        AuthResource authResource = new AuthResource(userDAO, authTokenDAO);
        environment.jersey().register(authResource);

        OrganisationResource organisationResource = new OrganisationResource();
        environment.jersey().register(organisationResource);

        UserResource userResource = new UserResource(userDAO, organisationDAO);
        environment.jersey().register(userResource);

        ItemResource itemResource = new ItemResource();
        environment.jersey().register(itemResource);

    }

}
