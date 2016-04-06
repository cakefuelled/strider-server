package com.cakefuelled.strider.item;

import com.cakefuelled.strider.category.Category;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;

public class Item {

    @NotNull
    int id;

    @NotNull
    ArrayList<String> altIds;

    @NotNull
    ArrayList<Category> categories;

    public Item() {
        //Jackson deserialization
    }

    public Item(int id) {
        this.id = id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ArrayList<String> getAltIds() {
        return altIds;
    }

    public void setAltIds(ArrayList<String> altIds) {
        this.altIds = altIds;
    }

    public ArrayList<Category> getCategories() {
        return categories;
    }

    public void setCategories(ArrayList<Category> categories) {
        this.categories = categories;
    }
}
