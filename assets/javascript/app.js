    $(document).ready(function() {
        
      // Initial array of animals
      var animals = ["Lion", "Dog", "Bee", "Skunk"];

  //====================================================================
  //===========================FUNCTION DECLARATIONS====================
  //====================================================================


      // Function for dumping the JSON content for each button into the div
      function displayAnimalInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
          
          for (var i = 0; i < response.data.length; i++) {
            console.log(response);
            //This section creates a section of HMTL to repeatably print gifs to the screen
            var animalDiv = $('<div>');
            var p = $('<p>');
            p.text("Rating: " + response.data[i].rating);
            var animalImage = $('<img>');
            animalImage.addClass("gif");
            animalImage.attr('data-animate',response.data[i].images.fixed_height.url);
            animalImage.attr('data-still',response.data[i].images.fixed_height_still.url);
            animalImage.attr('data-state',"still");
            animalImage.attr("src", response.data[i].images.fixed_height_still.url);  //This line ensures the gifs prints when a button is clicked
            $(animalDiv).append(p);
            $(animalDiv).append(animalImage);
            $('#gif-view').prepend(animalDiv);
          }
          $('#gif-view').prepend("<br><hr>");
          renderButtons();
        });
      }

      // Function for displaying animal data
      function renderButtons() {

        // Deleting the buttons prior to adding new animals
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          var a = $("<button>");
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

  //====================================================================
  //======This section handles putting the gifs onscreen================
  //====================================================================

      // This function handles events where one button is clicked
      $("#add-gif").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal = $("#gif-input").val().trim();
        // Adding the animal from the textbox to our array
        animals.push(animal);
        console.log(animals)
        // Calling renderButtons which handles the processing of our animals array
        renderButtons();
      });

      // Function for displaying the animal info
      // Using $(document).on instead of $(".animal").on to add event listenersto dynamically generated elements
      $(document).on("click", ".animal", displayAnimalInfo);


  //====================================================================
  //==================This section handles the gif clicking=============
  //====================================================================

      $(document).on("click", ".gif", function() {
        console.log("you clicked a gif!");
        //This is the logic from dynamic element
        var state = $(this).attr("data-state");

        if(state === "still"){
          var animate =  $(this).attr("data-animate");
          $(this).attr("src", animate);
          $(this).attr("data-state", 'animate');
        }

        if(state === "animate"){
          var still =  $(this).attr("data-still");
          $(this).attr("src", still);
          $(this).attr("data-state", 'still');
        }
        
    });

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

    	});