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
			alert("Please Select a City");
			return;
		}
		
		$.ajax({ 
	        type: 'Post', 
	        url: 'WeatherReport',
	        data : {'location' : val }, 
	        success: function (response) { 
	            alert(response.name);
	        } 
	    }); 
	});
        
 }); 