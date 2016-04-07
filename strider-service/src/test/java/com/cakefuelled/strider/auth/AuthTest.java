package com.cakefuelled.strider.auth;

import com.cakefuelled.strider.user.User;
import com.cakefuelled.strider.user.UserDAO;
import com.cakefuelled.strider.user.UserResource;
import io.dropwizard.testing.junit.ResourceTestRule;
import org.junit.ClassRule;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class AuthTest {

//    @ClassRule
//    public static final ResourceTestRule resources = ResourceTestRule.builder()
//            .addResource(new UserResource(jdbi.onDemand(UserDAO.class)))
//            .build();

    @Test
    public void canLogin() {

    }

}
