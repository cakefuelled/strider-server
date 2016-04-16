package com.cakefuelled.strider.auth;

import com.cakefuelled.strider.user.User;
import org.skife.jdbi.v2.sqlobject.Bind;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;

import java.util.List;

public interface AuthTokenDAO {

    @SqlUpdate("CREATE TABLE IF NOT EXISTS authTokens (" +
            "email VARCHAR(256) UNIQUE REFERENCES users(email)," +
            "token VARCHAR(128) NOT NULL)")
    void createAuthTokensTable();

    @SqlUpdate("INSERT INTO authTokens (email, token) VALUES (':email', ':token')")
    void insertAuthToken(@Bind("email") String email, @Bind("token") String token);

    @SqlQuery("SELECT users.id, users.email FROM authTokens " +
            "INNER JOIN users ON authTokens.email = users.email " +
            "WHERE authTokens.token = :token")
    User getUserByAuthToken(@Bind("token") String token);
}
