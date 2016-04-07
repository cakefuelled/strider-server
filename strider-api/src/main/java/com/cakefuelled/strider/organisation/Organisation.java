package com.cakefuelled.strider.organisation;

import com.cakefuelled.strider.category.Category;
import com.cakefuelled.strider.item.Item;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.ArrayList;

public class Organisation {

    @NotNull
    int id;

    @Size(min=2)
    String path;

    @Size(min=1)
    String name;

    @Size(min=1)
    String domain;

    @NotNull
    ArrayList<Item> items;

    @NotNull
    ArrayList<Category> categories;

    public Organisation() {
        //Jackson deserialization
    }

    public Organisation(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public ArrayList<Item> getItems() {
        return items;
    }

    public void setItems(ArrayList<Item> items) {
        this.items = items;
    }

    public ArrayList<Category> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<Category> categories) {
        this.categories = categories;
    }
}
