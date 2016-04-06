package com.cakefuelled.strider;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.google.common.cache.CacheBuilderSpec;
import io.dropwizard.Configuration;
import io.dropwizard.db.DataSourceFactory;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class StriderConfiguration extends Configuration {

    @Valid
    @NotNull
    @JsonProperty("database")
    DataSourceFactory dataSourceFactory = new DataSourceFactory();

    @Valid
    @NotNull
    @JsonProperty
    CacheBuilderSpec authenticationCachePolicy;

    public DataSourceFactory getDataSourceFactory() {
        return dataSourceFactory;
    }

    public void setDataSourceFactory(DataSourceFactory dataSourceFactory) {
        this.dataSourceFactory = dataSourceFactory;
    }

    public CacheBuilderSpec getAuthenticationCachePolicy() {
        return authenticationCachePolicy;
    }
}
