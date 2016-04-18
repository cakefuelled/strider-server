package com.cakefuelled.strider.organisation;

import com.cakefuelled.strider.auth.AuthTokenDAO;
import com.cakefuelled.strider.user.User;
import com.cakefuelled.strider.user.UserWithPassword;
import com.cakefuelled.strider.util.TestUtil;
import com.google.common.collect.Lists;
import io.dropwizard.testing.junit.ResourceTestRule;
import org.junit.After;
import org.junit.Before;
import org.junit.ClassRule;
import org.junit.Test;

import javax.ws.rs.core.GenericType;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

public class OrganisationTest {

    private static final OrganisationDAO organisationDao = mock(OrganisationDAO.class);
    private static final AuthTokenDAO authTokenDao = mock(AuthTokenDAO.class);

    @ClassRule
    public static final ResourceTestRule resources = TestUtil.getAuthenticatedResourceTester(authTokenDao)
            .addResource(new OrganisationResource(organisationDao))
            .build();


    private final User user = new User(1, "aimar@aimarfoundation.org");

    Organisation org1 = new Organisation(1, "aimar", "Aimar Foundation", "aimarfoundation.org");
    Organisation org2 = new Organisation(2, "evilcorp", "Evil Corp", "evilco.rp");

    @Before
    public void setup() {
        when(authTokenDao.getUserByAuthToken("testToken")).thenReturn(user);
        when(organisationDao.getOrganisationsByUserId(1)).thenReturn(Arrays.asList(org1));
        when(organisationDao.getOrganisationsByUserId(2)).thenReturn(Arrays.asList(org2));
    }

    @After
    public void tearDown() {
        reset(authTokenDao);
        reset(organisationDao);
    }

    @Test
    public void canGetAUsersOrganisations() {
        //GET /organisations
        ArrayList<Organisation> returnedOrgs = resources.getJerseyTest()
                .target("/organisations")
                .request(MediaType.APPLICATION_JSON_TYPE)
                .header("Authorization","Bearer testToken")
                .get(new GenericType<ArrayList<Organisation>>(){});
        //Check return of organisations
        assertThat(returnedOrgs).hasSize(1);
        assertThat(returnedOrgs.get(0)).isEqualToComparingFieldByField(org1);
    }
}
