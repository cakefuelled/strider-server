package com.cakefuelled.strider.user;

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

    public UserResource(UserDAO userDAO){

    }

    @GET
    public List<User> getUsers() {
        ArrayList<User> users = new ArrayList<>();

        User testUser = new User(1, "test");
        users.add(testUser);

        return users;
    }

}
