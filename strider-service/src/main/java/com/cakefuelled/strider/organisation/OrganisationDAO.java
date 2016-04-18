package com.cakefuelled.strider.organisation;

import com.cakefuelled.strider.user.User;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;

import java.util.List;

public interface OrganisationDAO {

    @SqlUpdate("CREATE TABLE IF NOT EXISTS organisations (" +
            "id INTEGER PRIMARY KEY, " +
            "path VARCHAR(32) NOT NULL," +
            "name VARCHAR(32) NOT NULL," +
            "domain VARCHAR(32) NOT NULL) ")
    void createOrganisationsTable();

    @SqlUpdate("CREATE TABLE IF NOT EXISTS userOrganisations (" +
            "userId INTEGER REFERENCES users(id), " +
            "organisationId INTEGER REFERENCES organisations(id))")
    void createUserOrganisationsTable();

    @SqlQuery("SELECT * FROM organisations")
    List<Organisation> query();

    @SqlQuery("SELECT organisations.* FROM userOrganisations " +
            "INNER JOIN organisations " +
            "ON userOrganisations.id = organisations.organisationId " +
            "WHERE userOrganisations.userId = :userId")
    List<Organisation> getOrganisationsByUserId(@Bind("userId") int userId);
}
