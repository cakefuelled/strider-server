package com.cakefuelled.strider.category;

import com.cakefuelled.strider.item.Item;
import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;

import java.util.List;

public interface CategoryDAO {

    @SqlUpdate("CREATE TABLE Category (" +
            "id INTEGER PRIMARY KEY, " +
            "name VARCHAR(32) NOT NULL) ")
    void createCategoryTable();

    @SqlQuery("SELECT * FROM Category")
    List<Category> query();;

}
