package com.weather;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;


public class WeatherServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	WeatherClient objWeathClnt = null;
       

	public void init() throws ServletException {
		ApplicationContext ctx = WebApplicationContextUtils.getWebApplicationContext(getServletContext());
		objWeathClnt = ((WeatherClient)ctx.getBean("WeatherBean"));
	}
    public WeatherServlet() {
        super();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		String locn = request.getParameter("location");
		String val = objWeathClnt.getWeatherData(locn);
		out.print(val);
	}

}
