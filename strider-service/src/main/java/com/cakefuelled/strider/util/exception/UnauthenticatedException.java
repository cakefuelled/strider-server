package com.cakefuelled.strider.util.exception;

import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

public class UnauthenticatedException extends WebApplicationException {

    public UnauthenticatedException() {
        super(Response.Status.UNAUTHORIZED); //This is a 401 actually
    }

    public UnauthenticatedException(String message) {
        super(message, Response.Status.UNAUTHORIZED); //Which is a 401
    }

}
