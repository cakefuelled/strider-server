package com.cakefuelled.strider.user;

import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;

import java.util.List;

public interface UserDAO {

    @SqlUpdate("CREATE TABLE IF NOT EXISTS users (" +
            "id SERIAL PRIMARY KEY," +
            "email VARCHAR(256) UNIQUE NOT NULL," +
            "password VARCHAR(128) NOT NULL)")
    void createUsersTable();

    @SqlUpdate("INSERT INTO users (email, password) VALUES ('aimar@aimarfoundation.org', 'secret')")
    void createTestUser();

    @SqlQuery("SELECT id, email FROM users")
    List<User> query();

    @SqlQuery("SELECT id, email FROM users WHERE email = :email")
    User getUserByEmail(@Bind("email") String email);

    @SqlQuery("SELECT id, email, password FROM users WHERE email = :email")
    UserWithPassword getUserWithPasswordByEmail(@Bind("email") String email);
}
