package com.weather;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class WeatherClient {
	
	    private static String BASE_URL = "http://api.openweathermap.org/data/2.5/weather?q=";
	    private static String APP_KEY= "896919e0393d5d206d1f5e775c7f4b3a";

	    public static String getWeatherData(String location) {
	    	HttpURLConnection con = null ;
	        InputStream is = null;
	        
	        try {
	            con = (HttpURLConnection) ( new URL(BASE_URL + location+"&APPID="+APP_KEY)).openConnection();
	            con.setRequestMethod("GET");
	            con.setDoInput(true);
	            con.setDoOutput(true);
	            con.connect();
	 
	            // Let's read the response
	            StringBuffer buffer = new StringBuffer();
	            is = con.getInputStream();
	            BufferedReader br = new BufferedReader(new InputStreamReader(is));
	            String line = null;
	            while (  (line = br.readLine()) != null )
	                buffer.append(line + "\r\n");
	            is.close();
	            con.disconnect();
	            return buffer.toString();
	        }
	        catch(Throwable t) {
	            t.printStackTrace();
	        }
	        finally {
	            try { is.close(); } catch(Throwable t) {}
	            try { con.disconnect(); } catch(Throwable t) {}
	        }
	        return null;
	    }
	    
	    public static void main(String args[]) {
	    	String res = getWeatherData("sydney");
	    	System.out.println(res);
	    }
}

