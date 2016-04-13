package com.cakefuelled.strider.user;

import com.cakefuelled.strider.auth.model.Credentials;
import com.cakefuelled.strider.auth.model.LoginSuccessResult;
import com.cakefuelled.strider.organisation.Organisation;
import com.cakefuelled.strider.organisation.OrganisationDAO;
import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
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
        return new ArrayList<>();
    }

    @POST
    @Path("/login")
    public LoginSuccessResult login(Credentials credentials) throws AuthenticationException {
        //TODO: Salt, Hash
        User userWithPasswordFromDatabase = dao.getUserWithPasswordByEmail(credentials.getEmail());
        //Compare password hashes
        if(credentials.getPassword().equals(userWithPasswordFromDatabase.getPassword())) {
            return new LoginSuccessResult(userWithPasswordFromDatabase.getEmail(), "moreSecret");
        }
        throw new AuthenticationException("Incorrect username or password");
    }

    @GET
    @Path("/me/organisations")
    public List<Organisation> getUserOrganisations(@Auth User user) {
        return organisationDAO.getOrganisationsByUser(user.getId());
    }

}
