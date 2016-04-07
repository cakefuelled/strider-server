package com.cakefuelled.strider.user;

import com.cakefuelled.strider.organisation.Organisation;
import com.cakefuelled.strider.organisation.OrganisationDAO;
import io.dropwizard.auth.Auth;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;

@Path("users")
@Produces(MediaType.APPLICATION_JSON)
public class UserResource {

    private UserDAO dao;
    private OrganisationDAO organisationDAO;

    public UserResource(UserDAO userDAO, OrganisationDAO organisationDAO) {
        this.dao = userDAO;
        this.organisationDAO = organisationDAO;
    }

    @GET
    public List<User> getUsers() {
        ArrayList<User> users = new ArrayList<>();

        User testUser = new User(1, "test");
        users.add(testUser);

        return users;
    }

    @GET
    @Path("/me/organisations")
    public List<Organisation> getUserOrganisations(@Auth User user) {
        return organisationDAO.getOrganisationsByUser(user.getId());
    }

}
