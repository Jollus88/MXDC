$(function(){
	
	const endpoint = 'https://s3-ap-southeast-2.amazonaws.com/studiobravo/FED+Project/events.json';
	var output = '';

	// Retrieve AJAX for events and populate HTML
	// Potential issue - if the format of the placeholders ever changes, this will also need to be updated
	$.ajax({
		type: "GET",
		dataType: 'json',
		url: endpoint,
		success: function(result){
			
			for(var i in result){
				output += '<a href="#" class="event col-1 col-md-2 col-lg-3">';
				output += '<div class="event-image"><div class="image" style="background-image:url( ' + result[i].imgUrlDesktop + ')"></div></div>';
				output += '<div class="event-text"><div class="event-title"><h3>' + result[i].title + '</h3></div><div class="event-description">' + result[i].description + '</div></div>';
				output += '</a>';
			}

			$('.events-container').html(output);
		},
		error: function(result, status){
			console.log('Error retrieving events JSON ' + status);
		}
	});
})