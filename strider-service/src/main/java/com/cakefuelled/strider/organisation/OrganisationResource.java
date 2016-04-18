package com.cakefuelled.strider.organisation;

import com.cakefuelled.strider.user.User;
import io.dropwizard.auth.Auth;

import javax.annotation.security.RolesAllowed;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("organisations")
@Produces(MediaType.APPLICATION_JSON)
public class OrganisationResource {

    private OrganisationDAO organisationDAO;

    public OrganisationResource(OrganisationDAO organisationDAO) {
        this.organisationDAO = organisationDAO;
    }

    @RolesAllowed("USER")
    @GET
    public List<Organisation> getOrganisations(@Auth User user) {
        return organisationDAO.getOrganisationsByUserId(user.getId());
    }

}
