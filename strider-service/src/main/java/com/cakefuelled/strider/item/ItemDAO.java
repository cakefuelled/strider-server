package com.cakefuelled.strider.item;

import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;

import java.util.List;

public interface ItemDAO {

    @SqlUpdate("CREATE TABLE Item (" +
            "id INTEGER PRIMARY KEY) ")
    void createItemTable();

    @SqlQuery("SELECT * FROM Item")
    List<Item> query();

}
