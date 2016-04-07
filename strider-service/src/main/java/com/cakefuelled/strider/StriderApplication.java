package com.cakefuelled.strider;

import com.cakefuelled.strider.auth.BasicAuthenticator;
import com.cakefuelled.strider.auth.UserAuthorizer;
import com.cakefuelled.strider.item.ItemResource;
import com.cakefuelled.strider.organisation.OrganisationDAO;
import com.cakefuelled.strider.organisation.OrganisationResource;
import com.cakefuelled.strider.user.User;
import com.cakefuelled.strider.user.UserDAO;
import com.cakefuelled.strider.user.UserResource;
import io.dropwizard.Application;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.auth.CachingAuthenticator;
import io.dropwizard.auth.basic.BasicCredentialAuthFilter;
import io.dropwizard.auth.basic.BasicCredentials;
import io.dropwizard.jdbi.DBIFactory;
import io.dropwizard.setup.Environment;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.skife.jdbi.v2.DBI;

public class StriderApplication extends Application<StriderConfiguration> {

    public static void main(String[] args) throws Exception {
        new StriderApplication().run(args);
    }

    @Override
    public void run(StriderConfiguration configuration, Environment environment) throws Exception {

        final DBIFactory dbiFactory = new DBIFactory();
        final DBI jdbi = dbiFactory.build(environment, configuration.getDataSourceFactory(), "postgresql");

        //DAOs
        final UserDAO userDAO = jdbi.onDemand(UserDAO.class);
        final OrganisationDAO organisationDAO = jdbi.onDemand(OrganisationDAO.class);

        //Authenticators
        CachingAuthenticator<BasicCredentials, User> cachingAuthenticator =
                new CachingAuthenticator<>(environment.metrics(),
                        new BasicAuthenticator(), configuration.getAuthenticationCachePolicy());

        environment.jersey().register(new AuthDynamicFeature(
                new BasicCredentialAuthFilter.Builder<User>()
                        .setAuthenticator(cachingAuthenticator)
                        .setAuthorizer(new UserAuthorizer())
                        .setRealm("Test")
                        .buildAuthFilter()));
        environment.jersey().register(RolesAllowedDynamicFeature.class);
        environment.jersey().register(new AuthValueFactoryProvider.Binder<>(User.class));

        //Resources
        OrganisationResource organisationResource = new OrganisationResource();
        environment.jersey().register(organisationResource);

        UserResource userResource = new UserResource(userDAO, organisationDAO);
        environment.jersey().register(userResource);

        ItemResource itemResource = new ItemResource();
        environment.jersey().register(itemResource);

    }
}
