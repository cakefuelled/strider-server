package com.cakefuelled.strider.category;

import com.cakefuelled.strider.item.Item;
import com.cakefuelled.strider.user.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.List;

@Path("categories")
@Produces(MediaType.APPLICATION_JSON)
public class CategoryResource {

    @RolesAllowed("USER")
    @GET
    public List<Item> getCategories(@Auth User user) {
        return new ArrayList<>();
    }

}
