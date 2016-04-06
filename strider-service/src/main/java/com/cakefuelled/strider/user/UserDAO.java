package com.cakefuelled.strider.user;

import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;

import java.util.List;

public interface UserDAO {

    @SqlUpdate("CREATE TABLE User (" +
            "id INTEGER PRIMARY KEY," +
            "username VARCHAR(32))")
    void createUserTable();

    @SqlQuery("SELECT * FROM User")
    List<User> query();

}
