package com.cakefuelled.strider.auth;

import com.cakefuelled.strider.auth.model.Credentials;
import com.cakefuelled.strider.auth.model.LoginSuccessResult;
import com.cakefuelled.strider.organisation.Organisation;
import com.cakefuelled.strider.organisation.OrganisationDAO;
import com.cakefuelled.strider.user.User;
import com.cakefuelled.strider.user.UserDAO;
import com.cakefuelled.strider.user.UserWithPassword;
import com.cakefuelled.strider.util.exception.UnauthenticatedException;
import io.dropwizard.auth.Auth;
import io.dropwizard.auth.AuthenticationException;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("auth")
@Produces(MediaType.APPLICATION_JSON)
public class AuthResource {

    private UserDAO dao;
    private AuthTokenDAO authTokenDAO;

    public AuthResource(UserDAO userDAO, AuthTokenDAO authTokenDAO) {
        this.dao = userDAO;
        this.authTokenDAO = authTokenDAO;
    }

    @POST
    @Path("/login")
    public LoginSuccessResult login(Credentials credentials) throws AuthenticationException {
        //TODO: Salt, Hash
        UserWithPassword userWithPasswordFromDatabase = dao.getUserWithPasswordByEmail(credentials.getEmail());
        //Compare password hashes
        if(credentials.getPassword().equals(userWithPasswordFromDatabase.getPassword())) {
            //TODO: Generate a token
            String token = "testToken";
            String email = userWithPasswordFromDatabase.getEmail();
            //Store the token in the database
            authTokenDAO.insertAuthToken(email, token);
            return new LoginSuccessResult(email, token);
        } else {
            throw new UnauthenticatedException("Incorrect username or password");
        }
    }

}
