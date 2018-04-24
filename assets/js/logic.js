$(document).ready(function(){
  var searches = [];

  $("#search-buttons").on("click", ".btn", function() {
    $("#display-gifs").html("");
    var searchTerm = $(this).attr("data-search");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=12";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {

      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var image = $("<img>");
        image.attr("src", results[i].images.fixed_height_still.url);
        image.attr("data-animate", results[i].images.fixed_height.url);
        image.attr("data-still", results[i].images.fixed_height_still.url);
        image.attr("data-state", "still");
        image.attr("class", "gif");
        $("#display-gifs").append(image);
      }
    });
  });

  $("#add-search").on("click", function(event){
    event.preventDefault();

    if ($("#search-input").val() != ""){
      var currentSearch = $("#search-input").val().trim();

      var a = $("<a>");
      a.attr("class", "btn btn-primary");
      a.attr("href", "#");
      a.attr("role", "button");
      a.attr("data-search", currentSearch);
      a.text(currentSearch);

      searches.push(currentSearch); 
      $("#search-buttons").append(a);
      $("#search-input").val("");
    }
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