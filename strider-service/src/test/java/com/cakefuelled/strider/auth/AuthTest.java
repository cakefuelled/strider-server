package com.cakefuelled.strider.auth;

import com.cakefuelled.strider.auth.model.Credentials;
import com.cakefuelled.strider.organisation.OrganisationDAO;
import com.cakefuelled.strider.user.User;
import com.cakefuelled.strider.user.UserDAO;
import com.cakefuelled.strider.user.UserResource;
import io.dropwizard.testing.junit.ResourceTestRule;
import org.junit.After;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.reset;
import static org.mockito.Mockito.when;

public class AuthTest {

    private static final UserDAO dao = mock(UserDAO.class);
    private static final OrganisationDAO organisationDao = mock(OrganisationDAO.class);

    @ClassRule
    public static final ResourceTestRule resources = ResourceTestRule.builder()
            .addResource(new UserResource(dao, organisationDao))
            .build();

    private final User user = new User(1, "aimar@aimarfoundation.org", "secret");

    @Before
    public void setup() {
        when(dao.getUserWithPasswordByEmail(eq("aimar@aimarfoundation.org"))).thenReturn(user);
    }

    @After
    public void tearDown() {
        reset(dao);
    }

    @Test
    public void canLoginWithCorrectPassword() {
        //Load a resource
        //Get 401
        //POST users/login with email and password
        Response loginResponse = resources.client().target("/users/login")
                .request().post(Entity.json(new Credentials("aimar@aimarfoundation.org", "secret")));
        //200 Back
        assertThat(loginResponse.getStatus()).isEqualTo(200);
        //Check the token
        //Resource works now
    }

    //TODO: Cannot login with incorrect password
}
