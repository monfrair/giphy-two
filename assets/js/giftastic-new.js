// create the array of HBO tv shows 
var shows = ["Eastbound and Down", "Curb Your Enthusiasm", "The Sopranos", "Silicon Valley", "Westworld", "Hard knocks", "Ballers", "Boardwalk Empire", "Game of Thrones"];

// creates buttons for each of the tv shows
function makeButtons(){ 
	// empties the shows prior to adding new shows so there are no duplicate buttons
	$('#buttonsView').empty();
	// loops through the shows array
	for (var i = 0; i < shows.length; i++){
		// dynamically create buttons for each show in the array
		var a = $('<button>') 
		a.addClass('show'); // add a class attribute
		a.attr('data-name', shows[i]); // add a data-attribute
		a.text(shows[i]); // add text to the buttons
		$('#buttonsView').append(a); // append the button to buttonsView div
	}
}

// handles addShow button event
$("#addShow").on("click", function(){
    // prevent form from trying to submit/refresh the page
    event.preventDefault();
   // $('#buttonsView').empty();  check on addind this here and if it stops empty buttons from being made.
//    try to add ability to verify data was entered into form so blank buttons are not created
    
	// grabs the users input and 
	var show = $("#show-input").val().trim();
       
	// push user input into the shows array
	shows.push(show);
    
        
	// the makeButtons function is called, which makes buttons for all shows in the array
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false; 
})

// function to display gifs
function displayGifs(){
	var show = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + show + "&limit=9&api_key=a10cadc8a77c427295239557c4ba280e";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var showGif = $('<img>');
					showGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the Gif rating on hover
					showGif.attr('title', "Rating: " + results[i].rating);
					showGif.attr('data-still', results[i].images.fixed_height_still.url);
					showGif.attr('data-state', 'still');
					showGif.addClass('gif');
					showGif.attr('data-animate', results[i].images.fixed_height.url);
				
				gifDiv.append(showGif)
			

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs from class
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying show gifs
$(document).on("click", ".show", displayGifs);

// initially calls the makeButtons function
makeButtons();














