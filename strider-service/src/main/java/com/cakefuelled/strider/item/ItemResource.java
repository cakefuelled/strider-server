package com.cakefuelled.strider.item;

import com.cakefuelled.strider.user.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("items")
@Produces(MediaType.APPLICATION_JSON)
public class ItemResource {

    @RolesAllowed("USER")
    @GET
    public List<Item> getItems(@Auth User user) {
        return new ArrayList<>();
    }

}
