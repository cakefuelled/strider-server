package com.cakefuelled.strider.auth;

import com.cakefuelled.strider.auth.authenticator.TokenAuthenticator;
import com.cakefuelled.strider.auth.authorizer.UserAuthorizer;
import com.cakefuelled.strider.auth.model.Credentials;
import com.cakefuelled.strider.auth.model.LoginSuccessResult;
import com.cakefuelled.strider.organisation.OrganisationDAO;
import com.cakefuelled.strider.user.User;
import com.cakefuelled.strider.user.UserDAO;
import com.cakefuelled.strider.user.UserResource;
import io.dropwizard.auth.AuthDynamicFeature;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.testing.junit.ResourceTestRule;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
import org.glassfish.jersey.test.grizzly.GrizzlyWebTestContainerFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.when;

public class AuthTest {

    private static final UserDAO userDao = mock(UserDAO.class);
    private static final AuthTokenDAO authTokenDao = mock(AuthTokenDAO.class);
    private static final OrganisationDAO organisationDao = mock(OrganisationDAO.class);

    @ClassRule
    public static final ResourceTestRule resources = ResourceTestRule.builder()
        .setTestContainerFactory(new GrizzlyWebTestContainerFactory())
            .addProvider(new AuthDynamicFeature(new TokenAuthFilter.Builder<User>()
                    .setAuthenticator(new TokenAuthenticator(authTokenDao))
                    .setAuthorizer(new UserAuthorizer())
                    .setPrefix("Bearer")
                    .setRealm("Mordor")
                    .buildAuthFilter()))
            .addProvider(RolesAllowedDynamicFeature.class)
            .addProvider(new AuthValueFactoryProvider.Binder<>(User.class))
            .addResource(new UserResource(userDao, organisationDao))
            .addResource(new AuthResource(userDao, authTokenDao))
            .build();

    private final User user = new User(1, "aimar@aimarfoundation.org", "secret");
    private final LoginSuccessResult loginSuccessResult = new LoginSuccessResult("aimar@aimarfoundation.org", "testToken");

    @Before
    public void setup() {
        when(userDao.getUserWithPasswordByEmail(eq("aimar@aimarfoundation.org"))).thenReturn(user);
        when(authTokenDao.getUserByAuthToken("testToken")).thenReturn(user);
    }

    @After
    public void tearDown() {
        reset(userDao);
        reset(authTokenDao);
        reset(organisationDao);
    }

    @Test
    public void canLoginWithCorrectPassword() {
        //Load a resource
        Response unauthResponse = resources.getJerseyTest()
                .target("/users/me/organisations")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .get();
        //Get 401
        assertThat(unauthResponse.getStatus()).isEqualTo(401);

        //POST auth/login with email and password
        Response loginResponse = resources.getJerseyTest()
                .target("/auth/login")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .post(Entity.json(new Credentials("aimar@aimarfoundation.org", "secret")));
        //200 Back
        assertThat(loginResponse.getStatus()).isEqualTo(200);
        //Check the token
        /*assertThat(((LoginSuccessResult) loginResponse.getEntity())).isEqualTo(loginSuccessResult);*/
        //Resource works when token passed
        Response authResponse = resources.getJerseyTest()
                .target("/users/me/organisations")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .header("Authorization","Bearer testToken")
                .get();
        assertThat(authResponse.getStatus()).isEqualTo(200);
    }

    //TODO: Cannot login with incorrect password
}
