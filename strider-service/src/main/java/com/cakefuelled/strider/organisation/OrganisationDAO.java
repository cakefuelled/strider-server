package com.cakefuelled.strider.organisation;

import com.cakefuelled.strider.category.Category;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;

import java.util.List;

public interface OrganisationDAO {

    @SqlUpdate("CREATE TABLE Organisation (" +
            "id INTEGER PRIMARY KEY, " +
            "path VARCHAR(32) NOT NULL," +
            "name VARCHAR(32) NOT NULL," +
            "domain VARCHAR(32) NOT NULL) ")
    void createOrganisationTable();

    @SqlQuery("SELECT * FROM Organisation")
    List<Organisation> query();;

}
