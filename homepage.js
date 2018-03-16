var autocomplete;
//init Autocomplete and fillInAddress are both used for the google autocomplete. keep them together.
//THE SEARCH BAR YOU USE IN HTML HAS TO HAVE AN ID OF "autocomplete"
// <input id="autocomplete" placeholder="Enter a city" type="text"></input>
function initAutocomplete() {
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
    /** @type {!HTMLInputElement} */ (document.getElementById("autocomplete")),
    { types: [] }
  );

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();
  console.log("Autocomplete information: ");
  console.log(place);
  var city = place.formatted_address;
  console.log("User entered: " + city);
  sessionStorage.setItem("userInput", city);
  //State and City used for zillow
  var zillowCity = place.address_components[0].long_name;
  sessionStorage.setItem("zillowCity", zillowCity);
  var zillowState = place.address_components[2].short_name;
  sessionStorage.setItem("zillowState", zillowState);

  window.location.href = "cards.html";
}
