/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package jsontools;

import entity.Book;
import java.util.List;
import javax.json.Json;
import javax.json.JsonArray;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;

/**
 *
 * @author Melnikov
 */
public class BookJsonBuilder {
    public JsonArray getBooksJsonArray(List<Book> listBooks){
        JsonArrayBuilder jab = Json.createArrayBuilder();
        for(int i=0;i<listBooks.size();i++){
            jab.add(getBookJsonObject(listBooks.get(i)));
        }
        return jab.build();
    }
    public JsonObject getBookJsonObject(Book book){
        JsonObjectBuilder job = Json.createObjectBuilder();
        AuthorJsonBuilder ajb = new AuthorJsonBuilder();
        job.add("id", book.getId());
        job.add("bookName", book.getBookName());
        job.add("publishedYear", book.getPublishedYear());
        job.add("price", book.getPrice());
        job.add("cover", book.getCover());
        job.add("author", ajb.getAuthorsJsonArray(book.getAuthor()));
        return job.build();
    }
}
