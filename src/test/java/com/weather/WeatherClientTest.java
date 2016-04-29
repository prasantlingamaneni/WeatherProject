package com.weather;

import org.junit.Test;
import static org.junit.Assert.*;

public class WeatherClientTest {

    @Test
    public void testNotNull() {
    	WeatherClient myUnit = new WeatherClient();
        String result1 = myUnit.getWeatherData("sydney");
        assertNotNull(result1);
        String result2 = myUnit.getWeatherData("melbourne");
        assertNotNull(result2);
        String result3 = myUnit.getWeatherData("wollongong");
        assertNotNull(result3);
    }
}
