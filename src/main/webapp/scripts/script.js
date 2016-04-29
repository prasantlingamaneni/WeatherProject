$(document).ready(function() { 
    $.ajax({ 
        type: "GET", 
        url: "props/citylist.xml", 
        dataType: "xml", 
        success: function (xml) { 
            var select = $('#mycity'); 
            $(xml).find('city').each(function () { 
                var name = $(this).find('name').text(); 
                var value = $(this).find('value').text(); 
                var option = $("<option>" + name + "</option>"); 
                option.attr("value", value); 
                select.append(option); 
            }); 
            select.children(":first").text("please make a selection").attr("selected", true); 
        } 
    }); 
        
    $('#mycity').change(function() { 
	var val = $(this).val();
		if(val=='') {
			$('#display-weather').html("");
			return;
		}
		
		$.ajax({ 
	        type: 'Post', 
	        url: 'WeatherReport',
	        data : {'location' : val }, 
	        success: function (response) { 
	        	var tableData= getTableDataToDisplay(response);
	        	$('#display-weather').html(tableData);
	        }, 
	        error: function(error) {
	        	var tableData= "<h3>Unable to get data. Please try after some time<h3>";
	        	$('#display-weather').html(tableData);  
	        }
	    }); 
	});
    
    function getTableDataToDisplay(response) {
    	if(response != null) {
    		if(response.cod  != null && response.cod != '404') {
				var columns=['City','Updated Time','Weather','Temperature','Wind'];
				var tableData = "<table align='center'><tr><td>Weather Report</td></tr></table>";
				tableData+= "<table id='tb-display' align='center'>";
				for (var i = 0; i < columns.length; i++){
					if(columns[i]=='City') {
						tableData+="<tr><td>"+columns[i]+"</td><td>"+response.name+"</td></tr>";
					} else if(columns[i]=='Updated Time') {
						var dateObj=response.dt;
			            var time=timeConverter(dateObj);
						tableData+="<tr><td>"+columns[i]+"</td><td>"+time+"</td></tr>";
					} else if(columns[i]=='Weather') {
						var weaObj=response.weather;
						tableData+="<tr><td>"+columns[i]+"</td><td>"+weaObj[0].description+"</td></tr>";
					} else if(columns[i]=='Temperature') {
						var tempObj=response.main;
						tableData+="<tr><td>"+columns[i]+"</td><td>"+tempObj.temp+"&#176C"+"</td></tr>";
					} else if(columns[i]=='Wind') {
						var windObj=response.wind;
			        	var windms = windObj.speed;	
			        	var windkms = Math.ceil(windms * 3.6);
						tableData+="<tr><td>"+columns[i]+"</td><td>"+windkms+"km/h"+"</td></tr>";
					}
				}
				tableData+="</table>";
    		} else {
    			var tableData= "<h3>Seelected city data not found<h3>";
    		}
    	} else {
    		var tableData= "<h3>Unable to get data. Please try after some time<h3>";
    	}
    	return tableData;
    }
    
    function timeConverter(unixtimestamp){
    	  var a = new Date(unixtimestamp * 1000);
    	  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    	  var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    	  var day = weekday[a.getDay()];
    	  var year = a.getFullYear();
    	  var month = months[a.getMonth()];
    	  var date = a.getDate();
    	  var hour = a.getHours();    	  
    	  var min = a.getMinutes();
    	  var sec = a.getSeconds();

    	  if (hour<12)
    	  { 
    		  hour = ((hour < 10) ? "0" + hour : hour);
    	      mid = "AM";
    	  }
    	  else if (hour >= 12)
    	  {
    		  hour = (hour - 12);
    		  if(hour < 10){
    			  hour = "0" + hour;
	  	      }else if(hour == 12){
	  	        hour = "00";
	  	      }
    	      mid='PM';
    	  }
    	  var time = day + ' ' + hour +':'+min+ ' ' + mid ;
    	  return time;
    }
        
 }); 