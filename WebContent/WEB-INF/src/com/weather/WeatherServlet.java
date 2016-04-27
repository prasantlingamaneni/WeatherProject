package com.weather;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


public class WeatherServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       

    public WeatherServlet() {
        super();
    }

    
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("hi");
		request.setCharacterEncoding("utf8");
        response.setCharacterEncoding("utf8");
        response.setContentType("application/json"); 
        PrintWriter out = response.getWriter(); 
		String locn=request.getParameter("location");
		WeatherClient wc= new WeatherClient();
		String val=wc.getWeatherData(locn);
		out.print(val);
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("utf8");
        response.setCharacterEncoding("utf8");
        response.setContentType("application/json"); 
        PrintWriter out = response.getWriter(); 
		String locn=request.getParameter("location");
		WeatherClient wc= new WeatherClient();
		String val=wc.getWeatherData(locn);
		System.out.println(val);
		out.print(val);
	}

}
