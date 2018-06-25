var instruments = ["Bass Guitar", "Guitar", "Drums", "Vocals"];

function drawButtons() {
  for (var i = 0; i < instruments.length; i++) {
    var button = $('<button>' + instruments[i] + '</button>').addClass("instrument").attr('data-name', instruments[i]);
    $('#buttons').append(button);
  }

}

function displayInstrumentInfo() {
  var type = $(this).attr("data-name");
  console.log(type);
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=musical instrument " +
    type + "&api_key=dc6zaTOxFJmzC&limit=9";

    $("#images").empty();

  $.ajax({
    url: queryURL,
    method: "GET"
  })
    .then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div class='item'>");

        var rating = (results[i].rating).toUpperCase();

        var p = $("<p>").text("Rating: " + rating);

        var instrumentImage = $("<img>");
        instrumentImage.attr("src", results[i].images.original_still.url);
        instrumentImage.attr("data-still", results[i].images.original_still.url);
        instrumentImage.attr("data-animate", results[i].images.original.url);
        instrumentImage.attr("data-state", "still");
        instrumentImage.addClass("theImage");

        gifDiv.prepend(p);
        gifDiv.prepend(instrumentImage);

        $("#images").prepend(gifDiv);
        
      }
    });
}

drawButtons();


$("#addButton").on("click", function () {
  event.preventDefault();
  var newInstrument = $("#item-input").val();
  if (newInstrument != "") {
    console.log(newInstrument);
    var newButton = $('<button>' + newInstrument + '</button>').addClass("instrument").attr('data-name', newInstrument);
    $('#buttons').append(newButton);
    instruments.push(newInstrument);
  }
  $('#addButton-form')[0].reset();
});

$(document).on("click", ".instrument", displayInstrumentInfo);

$(document).on("click", ".theImage", function () {
  var state = $(this).attr('data-state');
  if (state == 'still') {
    $(this).attr('src', $(this).attr('data-animate'));
    $(this).attr('data-state', 'animate');
  }
  else {
    $(this).attr('src', $(this).attr('data-still'));
    $(this).attr('data-state', 'still');
  }
});