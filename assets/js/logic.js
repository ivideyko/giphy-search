$(document).ready(function(){
  var searches = [];

  $(document).on("click", ".btn", function() {
    var searchTerm = $(this).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=30";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var imageDiv = $("<div>");
        // Make a paragraph tag with jQuery and store it in a variable named p.
        var p = $("<p>").text(results[i].rating);
        // Set the inner text of the paragraph to the rating of the image in results[i].
        // Make an image tag with jQuery and store it in a variable named image.
        var image = $("<img>");
        // Set the image's src to results[i]'s fixed_height.url.
        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-state", "still");
        image.attr("class", "gif");
        // Append the p variable to the imageDiv variable.
        imageDiv.append(p);
        // Append the image variable to the imageDiv variable.
        imageDiv.append(image);
        // Prepend the imageDiv variable to the element with an id of display-gifs.
        $("#display-gifs").prepend(imageDiv);
      }
    });
  });

  $("#add-search").on("click", function(event){
    event.preventDefault();

    var currentSearch = $("#search-input").val();

    var a = $("<a>");
    a.attr("class", "btn btn-default");
    a.attr("href", "#");
    a.attr("role", "button");
    a.attr("data-search", currentSearch);
    a.text(currentSearch);

    searches.push(currentSearch); 
    $("#search-buttons").append(a);
    console.log(searches);
  });

  // Handle animate/still feature
  $(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    var animateSrc = $(this).attr("data-animate");
    var stillSrc = $(this).attr("data-still");
    
    if (state == "still") {
      $(this).attr("src", animateSrc);
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", stillSrc);
      $(this).attr("data-state", "still");
    }
  });
});