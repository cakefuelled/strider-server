package com.cakefuelled.strider.user;

import com.cakefuelled.strider.auth.AuthTokenDAO;
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

    public UserResource(UserDAO userDAO) {
        this.dao = userDAO;
    }

    @GET
    public List<User> getUsers() {
        return new ArrayList<>();
    }

}
