package com.cakefuelled.strider.auth;

import com.cakefuelled.strider.auth.model.Credentials;
import com.cakefuelled.strider.auth.model.LoginSuccessResult;
import com.cakefuelled.strider.organisation.OrganisationDAO;
import com.cakefuelled.strider.organisation.OrganisationResource;
import com.cakefuelled.strider.user.User;
import com.cakefuelled.strider.user.UserDAO;
import com.cakefuelled.strider.user.UserResource;
import com.cakefuelled.strider.user.UserWithPassword;
import com.cakefuelled.strider.util.TestUtil;
import io.dropwizard.auth.AuthValueFactoryProvider;
import io.dropwizard.testing.junit.ResourceTestRule;
import org.glassfish.jersey.server.filter.RolesAllowedDynamicFeature;
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
    public static final ResourceTestRule resources = TestUtil.getAuthenticatedResourceTester(authTokenDao)
            .addResource(new UserResource(userDao))
            .addResource(new AuthResource(userDao, authTokenDao))
            .addResource(new OrganisationResource(organisationDao))
            .build();

    private final UserWithPassword user = new UserWithPassword(1, "aimar@aimarfoundation.org", "secret");

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
                .target("/organisations")
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
                .target("/organisations")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .header("Authorization","Bearer testToken")
                .get();
        assertThat(authResponse.getStatus()).isEqualTo(200);
    }

    @Test
    public void cannotLoginWithIncorrectPassword() {

        //POST auth/login with email and incorrect password
        Response invalidLoginResponse = resources.getJerseyTest()
                .target("/auth/login")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .post(Entity.json(new Credentials("aimar@aimarfoundation.org", "wrongsecret")));
        //401 Back
        assertThat(invalidLoginResponse.getStatus()).isEqualTo(401);

    }
}
