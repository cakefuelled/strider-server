package com.cakefuelled.strider.item;

import org.skife.jdbi.v2.sqlobject.SqlQuery;
import org.skife.jdbi.v2.sqlobject.SqlUpdate;

import java.util.List;

public interface ItemDAO {

    @SqlUpdate("CREATE TABLE IF NOT EXISTS items (" +
            "id INTEGER PRIMARY KEY) ")
    void createItemsTable();

    @SqlQuery("SELECT * FROM items")
    List<Item> query();

}
