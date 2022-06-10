/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package servlets;

import entity.Author;
import entity.Book;
import entity.History;
import entity.User;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import javax.servlet.http.Part;
import jsontools.AuthorJsonBuilder;
import jsontools.BookJsonBuilder;
import session.AuthorFacade;
import session.BookFacade;
import session.HistoryFacade;
import session.UserRolesFacade;

/**
 *
 * @author Melnikov
 */
@WebServlet(name = "UserServlet", urlPatterns = {
    "/buyBook",
  
})
@MultipartConfig
public class UserrServlet extends HttpServlet {
    
    @EJB private UserRolesFacade userRolesFacade;
    @EJB private BookFacade bookFacade;
    @EJB private HistoryFacade historyFacade;
    
//    private final String uploadDir = "D:\\UploadDir\\JPTV20BookShop";
//    private final String uploadDir = "/opt/UploadDir/JPTV20BookShop";
    
    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        request.setCharacterEncoding("UTF-8");
        JsonObjectBuilder job = Json.createObjectBuilder();
        HttpSession session = request.getSession(false);
        if(session == null){
            job.add("info", "Пожалуйста, авторизуйтесь!")
                .add("statur",false);
            try (PrintWriter out = response.getWriter()) {
                out.println(job.build().toString());
            }
            return;
        }
        User authUser = (User) session.getAttribute("authUser");
        if(authUser == null){
             job.add("info", "Пожалуйста, авторизуйтесь!")
                .add("statur",false);
            try (PrintWriter out = response.getWriter()) {
                out.println(job.build().toString());
            }
            return;
        }
        if(!userRolesFacade.isRole("USER", authUser)){
            job.add("info", "У вас нет прав для этих действий!")
                .add("statur",false);
            try (PrintWriter out = response.getWriter()) {
                out.println(job.build().toString());
            }
            return;
        }
        String path = request.getServletPath();
        switch (path){
            case "/buyBook":
                String id = request.getParameter("id");
                Book buyBook = bookFacade.find(Long.parseLong(id));
                History history = new History();
                history.setBook(buyBook);
                history.setReader(authUser.getReader());
                history.setGivenDate(new GregorianCalendar().getTime());
                historyFacade.create(history);
                job.add("info", "Вы купили книгу")
                   .add("status",true);
                try (PrintWriter out = response.getWriter()) {
                    out.println(job.build().toString());
                }
                break;
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    


}
